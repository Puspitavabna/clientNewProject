"use client";

import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { toFormikValidationSchema } from "zod-formik-adapter";
import {
  EditCompanyInfoFormValidationSchema,
  EditPersonalInfoFormValidationSchema,
  EditPresentAddressFormValidationSchema,
} from "./validate";
import TextInput from "./components/TextInput";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

function CopyEditProfile() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitting2, setIsSubmitting2] = useState(false);
  const [isSubmitting3, setIsSubmitting3] = useState(false);
  const [isSubmitting4, setIsSubmitting4] = useState(false);
  const [errMsg1, setErrMsg1] = useState("");
  const [errMsg2, setErrMsg2] = useState("");
  const [errMsg3, setErrMsg3] = useState("");
  const [errMsg4, setErrMsg4] = useState("");
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    let value;
    // Get the value from local storage if it exists
    value = Cookies.get("userId") || "";//localStorage.getItem("userid") || "";
    setUserId(value);

    const token = Cookies.get("token") || "";//localStorage.getItem("token") || "";
    setToken(token);
  }, []);

  return (
    <section className="rounded-xl bg-[#F2E6C9] px-6 py-5">
      <ToastContainer />
      <header className="mb-4 flex items-end justify-between">
        <div className="flex items-end gap-x-4">
          <div className="h-16 w-16 rounded-full border border-black" />
          <div>
            <h3 className="font-semibold">Mr. Jack</h3>
            <p className="text-sm">Username: Jack1542</p>
          </div>
        </div>
      </header>
      <main className="flex items-start gap-x-2">
        <section className="grid w-1/2 gap-y-2">
          <section className="rounded-lg bg-white py-4">
            <h2 className="mb-4 text-center text-lg font-semibold">
              Personal Information
            </h2>
            <Formik
              initialValues={{
                name: "",
                occupation: "",
                language: "",
                dob: "",
                email: "",
                phone: "",
                identification: "",
              }}
              validationSchema={toFormikValidationSchema(
                EditPersonalInfoFormValidationSchema,
              )}
              onSubmit={async (values) => {
                const { language, ...remaining } = values;
                const newValues = {
                  ...remaining,
                  userid: userId,
                  language: language.split(","),
                };

                setIsSubmitting(true);

                await fetch(
                  "https://tast-pwvf.onrender.com/user/update/details",
                  {
                    method: "POST",
                    body: JSON.stringify(newValues),
                    headers: {
                      "Content-type": "application/json; charset=UTF-8",
                      Authorization: `Bearer ${token}`,
                    },
                  },
                ).then((res) =>
                  res.json().then((data) => {
                    console.log(data);

                    if (data.status && data.status_code === 200) {
                      setErrMsg1("");
                      toast.success(
                        "Your personal details have been updated successfully",
                      );
                    } else {
                      setErrMsg1(data.message);
                    }

                    setIsSubmitting(false);
                  }),
                );
              }}
            >
              <Form>
                {errMsg1 && (
                  <p className="mb-2 text-center text-sm text-red-500">
                    {errMsg1}
                  </p>
                )}
                <div className="flex flex-col gap-y-2">
                  <TextInput
                    id="user-name"
                    label="Full Name"
                    name="name"
                    type="text"
                    placeholder=""
                  />
                  <TextInput
                    id="user-occ"
                    label="Occupation"
                    name="occupation"
                    type="text"
                    placeholder=""
                  />
                  <div>
                    <TextInput
                      id="user-lang"
                      label="Speaking Language"
                      name="language"
                      type="text"
                      placeholder=""
                    />
                    <p className="pr-4 text-right text-[10px] font-semibold">
                      Eg: English, German
                    </p>
                  </div>
                  <TextInput
                    id="user-dob"
                    label="Date of Birth"
                    name="dob"
                    type="date"
                    placeholder=""
                  />
                  <TextInput
                    id="user-cnic"
                    label="National Identification Number/Passport Number"
                    name="identification"
                    type="text"
                    placeholder=""
                  />
                  <TextInput
                    id="user-cell"
                    label="Phone No"
                    name="phone"
                    type="tel"
                    placeholder=""
                  />
                  <TextInput
                    id="user-email"
                    label="Email"
                    name="email"
                    type="text"
                    placeholder=""
                  />
                </div>

                <div className="mt-[2rem] flex justify-center">
                  <button
                    type="submit"
                    className="rounded-[30px] bg-[#0077B6] px-10 py-1 text-base font-medium text-white"
                  >
                    {isSubmitting ? "Sending Update..." : "Edit"}
                  </button>
                </div>
              </Form>
            </Formik>
          </section>
          <section className="rounded-lg bg-white py-4">
            <h2 className="mb-4 text-center text-lg font-semibold">
              Company Information
            </h2>
            <Formik
              initialValues={{
                company_name: "",
                phone: "",
                email: "",
                website_url: "",
              }}
              validationSchema={toFormikValidationSchema(
                EditCompanyInfoFormValidationSchema,
              )}
              onSubmit={async (values) => {
                const newValues = {
                  ...values,
                  userid: userId,
                };

                setIsSubmitting2(true);

                await fetch(
                  "https://tast-pwvf.onrender.com/user/update/company/info",
                  {
                    method: "POST",
                    body: JSON.stringify(newValues),
                    headers: {
                      "Content-type": "application/json; charset=UTF-8",
                      Authorization: `Bearer ${token}`,
                    },
                  },
                ).then((res) =>
                  res.json().then((data) => {
                    console.log(data);

                    if (data.status && data.status_code === 200) {
                      setErrMsg2("");
                      toast.success(
                        "Your company info have been successfully updated",
                      );
                    } else {
                      setErrMsg2(data.message);
                    }

                    setIsSubmitting2(false);
                  }),
                );
              }}
            >
              <Form>
                {errMsg2 && (
                  <p className="mb-2 text-center text-sm text-red-500">
                    {errMsg2}
                  </p>
                )}
                <div className="flex flex-col gap-y-2">
                  <TextInput
                    id="user-companys"
                    label="Company Name"
                    name="company_name"
                    type="text"
                    placeholder=""
                  />
                  <TextInput
                    id="user-c-cell"
                    label="Phone No."
                    name="phone"
                    type="text"
                    placeholder=""
                  />

                  <TextInput
                    id="com-email"
                    label="email"
                    name="email"
                    type="text"
                    placeholder=""
                  />

                  <TextInput
                    id="com-website"
                    label="Website Url"
                    name="website_url"
                    type="text"
                    placeholder=""
                  />
                </div>

                <div className="mt-[2rem] flex justify-center">
                  <button
                    type="submit"
                    className="rounded-[30px] bg-[#0077B6] px-10 py-1 text-base font-medium text-white"
                  >
                    {isSubmitting2 ? "Sending Update..." : "Edit"}
                  </button>
                </div>
              </Form>
            </Formik>
          </section>
        </section>

        <section className="grid w-1/2 gap-y-2">
          <section className="rounded-lg bg-white py-4">
            <h2 className="mb-4 text-center text-lg font-semibold">
              Present Address
            </h2>
            <Formik
              initialValues={{
                state: "",
                city: "",
                country: "",
                postalzone: "",
              }}
              validationSchema={toFormikValidationSchema(
                EditPresentAddressFormValidationSchema,
              )}
              onSubmit={async (values) => {
                const newValues = {
                  ...values,
                  userid: userId,
                };

                setIsSubmitting3(true);

                await fetch(
                  "https://tast-pwvf.onrender.com/user/update/present/address",
                  {
                    method: "POST",
                    body: JSON.stringify(newValues),
                    headers: {
                      "Content-type": "application/json; charset=UTF-8",
                      Authorization: `Bearer ${token}`,
                    },
                  },
                ).then((res) =>
                  res.json().then((data) => {
                    console.log(data);

                    if (data.status && data.status_code === 200) {
                      setErrMsg3("");
                      toast.success("Your present address have been updated");
                    } else {
                      setErrMsg3(data.message);
                    }

                    setIsSubmitting3(false);
                  }),
                );
              }}
            >
              <Form>
                {errMsg3 && (
                  <p className="mb-2 text-center text-sm text-red-500">
                    {errMsg3}
                  </p>
                )}
                <div className="flex flex-col gap-y-2">
                  <TextInput
                    id="country22"
                    label="Country"
                    name="country"
                    type="text"
                    placeholder=""
                  />
                  <TextInput
                    id="user-city22"
                    label="City"
                    name="city"
                    type="text"
                    placeholder=""
                  />

                  <TextInput
                    id="user-state22"
                    label="State/Province"
                    name="state"
                    type="text"
                    placeholder=""
                  />

                  <TextInput
                    id="user-postal-code22"
                    label="Postal Zone/ZIP Code"
                    name="postalzone"
                    type="text"
                    placeholder=""
                  />
                </div>

                <div className="mt-[2rem] flex justify-center">
                  <button
                    type="submit"
                    className="rounded-[30px] bg-[#0077B6] px-10 py-1 text-base font-medium text-white"
                  >
                    {isSubmitting3 ? "Sending Update..." : "Edit"}
                  </button>
                </div>
              </Form>
            </Formik>
          </section>
          <section className="rounded-lg bg-white py-4">
            <h2 className="mb-4 text-center text-lg font-semibold">
              Permanent Address
            </h2>
            <Formik
              initialValues={{
                state: "",
                city: "",
                country: "",
                postalzone: "",
              }}
              validationSchema={toFormikValidationSchema(
                EditPresentAddressFormValidationSchema,
              )}
              onSubmit={async (values) => {
                const newValues = {
                  ...values,
                  userid: userId,
                };

                setIsSubmitting4(true);

                await fetch(
                  "https://tast-pwvf.onrender.com/user/update/permanent/address",
                  {
                    method: "POST",
                    body: JSON.stringify(newValues),
                    headers: {
                      "Content-type": "application/json; charset=UTF-8",
                      Authorization: `Bearer ${token}`,
                    },
                  },
                ).then((res) =>
                  res.json().then((data) => {
                    console.log(data);

                    if (data.status && data.status_code === 200) {
                      setErrMsg4("");
                      toast.success("Your permanent address have been updated");
                    } else {
                      setErrMsg4(data.message);
                    }

                    setIsSubmitting4(false);
                  }),
                );
              }}
            >
              <Form>
                {errMsg4 && (
                  <p className="mb-2 text-center text-sm text-red-500">
                    {errMsg4}
                  </p>
                )}
                <div className="flex flex-col gap-y-2">
                  <TextInput
                    id="counttry33"
                    label="Country"
                    name="country"
                    type="text"
                    placeholder=""
                  />
                  <TextInput
                    id="city33"
                    label="City"
                    name="city"
                    type="text"
                    placeholder=""
                  />

                  <TextInput
                    id="user-state33"
                    label="State/Province"
                    name="state"
                    type="text"
                    placeholder=""
                  />

                  <TextInput
                  id="postal33"
                    label="Postal Zone/ZIP Code"
                    name="postalzone"
                    type="text"
                    placeholder=""
                  />
                </div>

                <div className="mt-[2rem] flex justify-center">
                  <button
                    type="submit"
                    className="rounded-[30px] bg-[#0077B6] px-10 py-1 text-base font-medium text-white"
                  >
                    {isSubmitting4 ? "Sending Update..." : "Edit"}
                  </button>
                </div>
              </Form>
            </Formik>
          </section>
        </section>
      </main>
    </section>
  );
}

export default CopyEditProfile;
