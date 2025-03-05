import { Form, Formik } from "formik";
import Cookies from "js-cookie";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextInput from "./components/TextInput";
import { env } from "../../../../config/env";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useDispatch, useSelector } from "react-redux";
import { authenticateUser } from "../../store/slices/authSlice";
import dummyImage from "../../../../public/defaultImage.png"
import { FaFacebook } from "react-icons/fa";

// Define interfaces for type safety
interface FormValues {
  name: string;
  email: string;
  phone: string;
  companyname: string;
  currency: string;
}

interface SocialLink {
  platform: string;
  link: string;
}

interface User {
  username?: string;
  email?: string;
  phone?: string;
  companyname?: string;
  currency?: string;
  profileImageUrl?: string;
}

const ProfileForm = (data: any) => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.user);
  console.log("User", user);

  const [formData, setFormData] = useState({
    name: user?.username || "",
    email: user?.email || "",
    phone: user?.phone || "",
    companyname: user?.companyname || "",
    currency: user?.currency || "",
  });

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [socialLinks, setSocialLinks] = useState([{ platform: "", link: "" }]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [initialFormState, setInitialFormState] =
    useState<FormValues>(formData);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // Convert base64 to blob URL if profile image exists
    if (
      user?.profileImageUrl &&
      user.profileImageUrl.startsWith("data:image")
    ) {
      const imageUrl = convertBase64ToURL(user.profileImageUrl);
      setProfileImageUrl(imageUrl);
    } else if (user?.profileImageUrl) {
      setProfileImageUrl(
        `${env.NEXT_PUBLIC_API_URL}/uploads/${user.profileImageUrl}`,
      );
    }
  }, [user]);

  const openFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const convertBase64ToURL = (base64String: string) => {
    try {
      const byteString = atob(base64String.split(",")[1]);
      const mimeString = base64String.split(",")[0].split(":")[1].split(";")[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);

      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      const blob = new Blob([ab], { type: mimeString });
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error("Error converting base64 to URL:", error);
      return null;
    }
  };

  const getImageSrc = () => {
    if (profileImageUrl) {
      return profileImageUrl;
    }
    return dummyImage;
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handlePhoneNumberChange = (value: string | undefined) => {
    if (value) {
      setFormData((prevState: any) => ({
        ...prevState,
        phone: value,
        code: value,
      }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        toast.error("Image size must be less than 5MB");
        return;
      }
      setProfileImage(file);
      const imageUrl = URL.createObjectURL(file);
      setProfileImageUrl(imageUrl);
    }
  };

  const handleSocialLinkChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
    index: number,
    field: "platform" | "link",
  ) => {
    const updatedSocialLinks = [...socialLinks];
    updatedSocialLinks[index][field] = e.target.value;
    setSocialLinks(updatedSocialLinks);
  };

  const getChangedFields = (values: FormValues): Partial<FormValues> => {
    const changedFields: Partial<FormValues> = {};

    (Object.keys(values) as Array<keyof FormValues>).forEach((key) => {
      if (values[key] !== initialFormState[key]) {
        changedFields[key] = values[key];
      }
    });

    return changedFields;
  };

  const handleSubmit = async (values: FormValues) => {
    const token = localStorage.getItem("token") || Cookies.get("token");
    if (!token) {
      toast.error("Authorization token is missing. Please log in again.");
      return;
    }

    setIsSubmitting(true);

    try {
      const changedFields = getChangedFields(values);
      const formDataToSend = new FormData();

      // Only append changed fields
      Object.entries(changedFields).forEach(([key, value]) => {
        if (value !== undefined) {
          formDataToSend.append(key, value);
        }
      });
      console.log("Profile Image File", profileImage);
      // Append profile image if changed
      if (profileImage) {
        formDataToSend.append("image", profileImage);
      }

      // Append social links if changed
      if (socialLinks.some((link) => link.platform && link.link)) {
        formDataToSend.append("socialLinks", JSON.stringify(socialLinks));
      }
      console.log("User", formDataToSend);
      const response = await fetch(
        `${env.NEXT_PUBLIC_API_URL}/api/v1/factory-app/user/update`,
        {
          method: "PUT",
          body: formDataToSend,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();

      if (result.success) {
        // Update Redux store with new user data
        dispatch(authenticateUser(result.data));
        toast.success("Profile updated successfully.");
        // Update initial form state to reflect new values
        setInitialFormState(values);
      } else {
        toast.error(result.message || "Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("An error occurred while updating the profile.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={formData}
      enableReinitialize={true}
      onSubmit={handleSubmit}
    >
      <Form>
        <div className="flex flex-col items-center justify-center bg-[#ffffff] w-[600px]">
          <div className="mb-2 flex items-center gap-2 bg-[#ffffff] p-4 md:flex-row">
            {/* Profile & Update */}
            <div className="flex flex-col items-center justify-center">
              <ToastContainer position="top-center" autoClose={2000} />
              <Image
                src={getImageSrc()}
                alt="Profile"
                width={80}
                height={80}
                className="cursor-pointer w-[80px] h-[80px] rounded-full"
                onClick={openFileInput}
              />
            </div>

            <div className="flex flex-col items-center justify-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef}
                style={{ display: "none" }}
              />
              {/* type="button" onClick={handleSubmit} */}
              <button className="absolute right-16 top-20 text-black hover:underline focus:outline-none">
                Update
              </button>
            </div>
          </div>

          {/* data */}
          <div className="rounded-lg bg-white w-[500px]">
            <div className="flex w-full flex-col pb-2">
              <label
                htmlFor="name"
                className="mb-1 pl-4 text-sm font-semibold text-gray-700"
              >
               Full Name
              </label>
              <TextInput
                id="pf-uname"
                name="name"
                type="text"
                placeholder="Full Name"
                className="flex w-full items-center rounded-lg border border-gray-300 bg-[#E9F0FF] px-6 py-1"
                style={{ width: "100%" }}
                onChange={handleChange}
              />
            </div>
            <div className="flex w-full flex-col pb-2">
              <label className="ml-4 whitespace-nowrap text-sm font-semibold text-[#373535]">
                Phone No
              </label>
              <div className="ml-4 mr-4 flex items-center rounded-lg border border-gray-300 bg-[#E9F0FF] px-1 py-1">
                <PhoneInput
                  country="in"
                  value={formData.phone}
                  name="phone"
                  onChange={handlePhoneNumberChange}
                  placeholder=" mobile number"
                  inputStyle={{
                    width: "100%",
                    padding: "10px",
                    fontSize: "12px",
                    // paddingLeft: "45px",
                  }}
                  inputProps={{
                    name: "mobileNo",
                    required: true,
                    autoFocus: true,
                  }}
                />
              </div>
            </div>
            <div className="flex w-full flex-col pb-2">
              <label
                htmlFor="name"
                className="mb-1 pl-4 text-sm font-semibold text-gray-700"
              >
                Email
              </label>
              <TextInput
                id="pf-uemail"
                name="email"
                type="text"
                placeholder="Email Address"
                className="flex w-full items-center rounded-lg border border-gray-300 bg-[#E9F0FF] px-6 py-1"
                style={{ width: "100%" }}
                onChange={handleChange}
              />
            </div>
            <div className="flex w-full flex-col pb-2 pl-4 pr-4">
              <label
                htmlFor="currency"
                className="mb-1 pl-2 text-sm font-semibold text-gray-700"
              >
                Currency
              </label>
              <select
                id="currency"
                className="w-full min-w-[200px] rounded-lg border border-gray-300 bg-[#E9F0FF] px-2 py-2 text-sm font-semibold"
                onChange={handleChange} // Replace with your handler
                defaultValue=""
                value={formData.currency || ""}
                disabled={!!formData.currency}
                name="currency"
              >
                <option value="" disabled className="text-gray-400">
                  Selected
                </option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
            </div>
            <div className="flex w-full flex-col pb-2">
              <label
                htmlFor="name"
                className="mb-1 pl-4 text-sm font-semibold text-gray-700"
              >
                Company Name
              </label>

              <TextInput
                id="pf-ucname"
                name="companyname"
                type="text"
                placeholder="Company Name"
                className="flex w-full items-center rounded-lg border border-gray-300 bg-[#E9F0FF] px-6 py-1"
                style={{ width: "100%" }}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Social Media Card */}
          {/* <div className="flex flex-col justify-center gap-y-6 space-x-2 p-10">
            {socialLinks.map((social, index) => (
              <div
                className="flex flex-row items-center gap-4 text-start"
                key={index}
              >
                <select
                  className="rounded-lg w-[100px] border border-gray-300 bg-[#E9F0FF] px-2 py-2 text-sm font-semibold"
                  onChange={(e) => handleSocialLinkChange(e, index, "platform")}
                  value={social.platform}
                  name={`social-platform-${index}`}
                >
                  <option value="" disabled>
                    Select
                  </option>
                  <option value="Facebook">Facebook</option>
                  <option value="Twitter">Twitter</option>
                  <option value="Instagram">Instagram</option>
                  <option value="LinkedIn">LinkedIn</option>
                </select>

                <input
                  type="text"
                  placeholder="Paste Link"
                  value={social.link}
                  onChange={(e) => handleSocialLinkChange(e, index, "link")}
                  className="mt-1 block w-[250px] rounded-lg border border-gray-300 bg-[#E9F0FF] px-4 py-1"
                />

                <button
                  type="button"
                  className="rounded bg-[#151B54] px-4 py-1 font-bold text-white"
                  onClick={() =>
                    setSocialLinks([...socialLinks, { platform: "", link: "" }])
                  }
                >
                  Add
                </button>
              </div>
            ))}
          </div> */}

          <div
            className="m-4 flex justify-center py-2"
            style={{
              boxShadow: "0px 2.09px 33.47px 0px rgba(0, 0, 0, 0.05)",
              width: "400px",
            }}
          >
            <div className="flex flex-col items-center justify-center rounded-lg bg-white p-4 shadow-lg">
              <h2 className="mb-4 text-2xl font-bold text-gray-800">
                Social Links
              </h2>
              <div className="flex flex-col justify-center gap-y-6 space-x-2">
                <div className="flex flex-row items-center gap-4 text-start">
                  <select
                    className="rounded-lg border border-gray-300 bg-[#E9F0FF] px-2 py-2 text-sm font-semibold"
                    onChange={handleChange} // Replace with your handler
                    defaultValue=""
                    name="social"
                  >
                    <option
                      value=""
                      disabled
                      className="font-semibold text-black"
                    >
                      select
                    </option>
                    <option value="Facebook">Facebook</option>
                    <option value="X">X</option>
                    <option value="Snapchat">Snapchat</option>
                  </select>

                  <input
                    type="text"
                    name="fullName"
                    placeholder="Paste Link"
                    value=""
                    onChange={(e) => handleSocialLinkChange(e, 0, "link")}
                    className="mt-1 block w-[250px] rounded-lg border border-gray-300 bg-[#E9F0FF] px-4 py-1"
                  />

                  <button
                    type="button"
                    className="rounded bg-[#151B54] px-4 py-2 font-bold text-white"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-row items-center gap-2 text-start">
                  <div className="relative">
                    <Image
                      src="/icons/delete.png"
                      height={50}
                      width={50}
                      alt="user"
                      className="absolute bottom-8 left-8 flex h-8 w-8 items-center justify-center rounded-full"
                    />
                    {/* <FaFacebook size={48} /> */}
                  </div>

                  <button
                    type="button"
                    className="ml-8 rounded-full border-2 border-gray-400 bg-white px-2 py-0 text-5xl font-medium text-black"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </Formik>
  );
};

export default ProfileForm;
