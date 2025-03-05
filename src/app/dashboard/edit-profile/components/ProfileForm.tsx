import { Form, Formik } from "formik";
import Cookies from "js-cookie";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextInput from "./TextInput";
//import { SERVER_URL } from "@/src/app/constants/api";

//import { useAPPContext } from "../../context/AppContextType";
import { env } from "@/config/env";

interface ProfileFormProps {
  userId: string;
  token: string;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ userId, token }) => {
  const cuserId = Cookies.get("userId");
  const ctoken = localStorage.getItem("access_token");

  //  const { currency } = useAPPContext();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    code: "",
    companyname: "",
    phone: "",
    currency: "",
  });
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  //alert(currency);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(
          `${env.NEXT_PUBLIC_API_URL}/api/user/profile/retrieve`,
          {
            method: "POST",
            body: JSON.stringify({ userid: cuserId }),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${ctoken}`,
            },
          },
        );

        const data = await response.json();

        if (data.status && data.status_code === 200) {
          setUserData({
            name: data.data.name,
            email: data.data.email || "",
            code: data.data.company_info?.phone_code,
            companyname: data.data.company_info?.company_name || "",
            phone: data.data.company_info?.phone,
            currency: data.data.currency || "",
          });

          const profileImageUrlFromServer = data.data.profile_image;
          if (
            profileImageUrlFromServer &&
            profileImageUrlFromServer.trim() !== ""
          ) {
            const fullProfileImageUrl = profileImageUrlFromServer.includes(
              "http",
            )
              ? profileImageUrlFromServer
              : `${env.NEXT_PUBLIC_API_URL}/uploads/${profileImageUrlFromServer}`;
            setProfileImageUrl(fullProfileImageUrl);
          } else {
            setProfileImageUrl("/images/new-upload-avatar.png");
          }
        } else {
          toast.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        toast.error("An error occurred while fetching user data.");
      }
    };

    if (cuserId && ctoken) {
      fetchUserProfile();
    }
  }, [cuserId, ctoken]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;

    if (file) {
      setProfileImage(file);
      const localImageUrl = URL.createObjectURL(file);
      setProfileImageUrl(localImageUrl);
      return () => URL.revokeObjectURL(localImageUrl);
    }
  };

  const openFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (values: any) => {
    setIsSubmitting(true);
    try {
      const userDetailsPayload = {
        name: values.name,
        phone: values.phone,
        code: values.code,
        email: values.email,
        currency: values.currency,
        companyname: values.companyname,
        userid: userId,
      };
      // alert(userDetailsPayload.name);
      // alert(userDetailsPayload.phone);
      // alert(userDetailsPayload.code);
      // alert(userDetailsPayload.email);
      // alert(userDetailsPayload.currency);
      // alert(userDetailsPayload.userid);

      if (profileImage) {
        const formData = new FormData();
        formData.append("profile_image", profileImage);
        formData.append("userid", userId);

        const imageResponse = await fetch(
          `${env.NEXT_PUBLIC_API_URL}/api/user/profile/update/profileImage`,
          {
            method: "POST",
            body: formData,
            headers: {
              Authorization: `Bearer ${ctoken}`,
            },
          },
        );

        const imageResult = await imageResponse.json();
        if (imageResult.status && imageResult.status_code === 200) {
          const updatedImageUrl = imageResult.profile_image;
          const fullProfileImageUrl = updatedImageUrl.includes("http")
            ? updatedImageUrl
            : `${env.NEXT_PUBLIC_API_URL}/uploads/${updatedImageUrl}`;
          setProfileImageUrl(fullProfileImageUrl);
          //  toast.success("Profile image updated successfully!");
        } else {
          toast.error("Failed to update profile image.");
          setIsSubmitting(false);
          return;
        }
      }

      const detailsResponse = await fetch(
        `${env.NEXT_PUBLIC_API_URL}/api/user/profile/update/details`,
        {
          method: "POST",
          body: JSON.stringify(userDetailsPayload),
          headers: {
            Authorization: `Bearer ${ctoken}`,
            "Content-Type": "application/json",
          },
        },
      );

      const detailsResult = await detailsResponse.json();
      console.log("testooooooooooo");
      console.log(detailsResult);

      if (detailsResult.status && detailsResult.status_code === 200) {
        toast.success("Profile details updated successfully!");
      } else {
        toast.error("Failed to update profile details.");
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
      initialValues={userData}
      enableReinitialize={true}
      // validationSchema={toFormikValidationSchema(EditPersonalInfoFormValidationSchema)}
      onSubmit={handleSubmit}
    >
      <Form>
        <div className="w-max-2 flex flex-col items-center justify-center bg-[#F2E6C9]">
          <div className="mb-2 flex w-full items-center gap-2 bg-[#F2E6C9] p-4 md:flex-row">
            {/* Profile & Update */}
            <div className="flex items-center justify-center">
              <ToastContainer position="top-center" autoClose={2000} />
              <Image
                src={
                  profileImageUrl
                    ? profileImageUrl
                    : "/images/new-upload-avatar.png"
                }
                alt="User Profile"
                width={150}
                height={150}
                // className="cursor-pointer object-cover"  // object-cover will keep the aspect ratio intact
                className={`cursor-pointer object-cover ${profileImageUrl &&
                    profileImageUrl !== "/images/new-upload-avatar.png"
                    ? "rounded-full"
                    : ""
                  }`} // Add rounded-full only if the image is not the default avatar
                onClick={openFileInput}
              />
            </div>

            <div className="flex items-center justify-end md:w-2/3">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef}
                style={{ display: "none" }}
              />
              {/* type="button" onClick={handleSubmit} */}
              <button className="text-blue-500 hover:underline focus:outline-none">
                Update
              </button>
            </div>
          </div>

          {/* data */}
          <div className="rounded-lg bg-white px-2 py-4">
            <TextInput
              id="pf1-uname"
              label="Name"
              name="name"
              type="text"
              placeholder="Full Name"
              className="flex w-full items-center rounded-lg border border-gray-300 bg-[#D9D9D91A] px-6 py-1"
              style={{ width: "100%" }}
            />
            <hr className="my-2 w-full border-t border-gray-300" />
            <div className="flex">
              <span className="ml-4 whitespace-nowrap text-sm font-semibold text-[#373535]">
                Phone No
              </span>

              <div className="ml-16 flex">
                <select
                  className="rounded-lg border border-gray-300 bg-[#D9D9D91A] px-0 py-1 text-sm font-semibold"
                  onChange={handleChange} // Replace with your handler
                  defaultValue=""
                  name="code"
                  value={userData.code}
                >
                  <option
                    value=""
                    disabled
                    className="font-semibold text-black"
                  >
                    Code
                  </option>
                  <option value="+20">+20</option>
                  <option value="+44">+44</option>
                  <option value="+33">+33</option>
                </select>

                <TextInput
                  id="pf1-cphone"
                  name="phone"
                  type="text"
                  placeholder="phone Number"
                  className="rounded-lg border border-gray-300 px-2 py-1 text-sm text-black"
                  style={{ width: "100%" }}
                />
              </div>
            </div>
            <hr className="my-2 w-full border-t border-gray-300" />
            <TextInput
              id="p1f-ucemail"
              label="Email"
              name="email"
              type="text"
              placeholder="Email Address"
              className="flex w-full items-center gap-10 rounded-lg border border-gray-300 bg-[#D9D9D91A] px-6 py-1 underline"
              style={{ width: "100%" }}
            />
            <hr className="my-2 w-full border-t border-gray-300" />
            <div className="flex items-center gap-16">
              {" "}
              {/* Added flex container */}
              <span className="ml-4 text-sm font-semibold text-[#373535]">
                Currency
              </span>
              <select
                className="ml-2 rounded-lg border border-gray-300 bg-[#D9D9D91A] px-6 py-1 text-sm font-semibold"
                onChange={handleChange} // Replace with your handler
                defaultValue=""
                value={userData.currency || ""}
                disabled={!!userData.currency}
                name="currency"
              >
                <option value="" disabled className="font-semibold text-black">
                  Selected
                </option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
            </div>

            <hr className="my-2 w-full border-t border-gray-300" />
            <TextInput
              id="pf1-ucname"
              label="Company Name"
              name="companyname"
              type="text"
              placeholder="Company Name"
              className="flex w-full items-center gap-10 rounded-lg border border-gray-300 bg-[#D9D9D91A] px-6 py-1"
              style={{ width: "100%" }}
            />
          </div>

          {/* Social Media Card */}
          {/* <div className="flex justify-center py-8">
                        <div className="w-full p-4 bg-white rounded-lg shadow-lg flex flex-col items-center justify-center">
                            <h2 className="text-2xl font-bold mb-4 text-gray-800">Social Links</h2>
                            <div className="flex flex-col space-x-2 justify-center gap-y-6">
                                <div className="flex flex-row text-start items-center gap-4">
                                    <select
                                        className="text-sm font-semibold py-1 px-0 border border-gray-300 rounded-lg bg-[#D9D9D91A]"
                                        onChange={handleChange} // Replace with your handler
                                        defaultValue=""
                                        name="social"
                                    >
                                        <option value="" disabled className="text-black font-semibold">
                                            select
                                        </option>
                                        <option value="Facebook">Facebook</option>
                                        <option value="X">X</option>
                                        <option value="Snapchat">Snapchat</option>
                                    </select>

                                    <input
                                        type="text"
                                        name="fullName"
                                        value=""
                                        placeholder="Paste Link"
                                        onChange={handleChange}
                                        className="mt-1  p-1 block w-full border border-gray-300 rounded-lg bg-[#D9D9D91A] h-8"
                                    />

                                    <button
                                        type="button"
                                        className="bg-[#FFB200] text-black py-2 px-4 font-bold rounded"
                                    >
                                        Add
                                    </button>
                                </div>
                                <div className="flex flex-row text-start items-center gap-2">
                                    <div className="relative">
                                        <Image
                                            src="/icons/delete.png"
                                            height={50}
                                            width={50}
                                            alt="user"
                                            className="absolute bottom-8 left-8 flex h-8 w-8 items-center justify-center rounded-full" />
                                        <FaFacebook size={48} />
                                    </div>

                                    <button
                                        type="button"
                                        className="bg-white border-2 ml-8 border-gray-400 text-black text-5xl py-0 px-2 font-medium rounded-full"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div> */}
        </div>
      </Form>
    </Formik>
  );
};

export default ProfileForm;
