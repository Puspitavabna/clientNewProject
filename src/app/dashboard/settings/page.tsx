"use client";

import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CgDanger } from "react-icons/cg";
import { CiLock } from "react-icons/ci";
import { env } from "../../../../config/env";
import { changePasswordSchema, deleteAccountSchema } from "./validate";

function Settings() {
  const [selectedOption, setSelectedOption] = useState("Change Password");

  return (
    <section className="relative flex min-h-screen w-full items-center justify-start overflow-auto">
      <select
        className="absolute right-0 top-0 rounded-md px-1 py-2 font-semibold text-black transition-all duration-150"
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        <option value="Delete Account">Delete Account</option>
        <option value="Change Password">Change Password</option>
        <option value="Account Security">Account Security</option>
      </select>

      {selectedOption === "Delete Account" && <DeleteAccount />}
      {selectedOption === "Change Password" && <ChangePassword />}
      {selectedOption === "Account Security" && <AccountSecurity />}
    </section>
  );
  // const [isDelete, setDelete] = useState(false);

  // return (
  //   <section className="flex items-center justify-start h-full w-full relative">
  //     <button
  //       className={`absolute right-0 top-0 py-2 px-4 rounded-md transition-all duration-150 font-semibold ${isDelete
  //         ? "bg-[#EE404C] hover:bg-[#EE404C]/80 text-white"
  //         : "bg-[#2FC9D2] hover:bg-[#2FC9D2]/80"
  //         }`}
  //       onClick={() => setDelete(!isDelete)}
  //     >
  //       {isDelete ? "Account Delete" : "Change Password"}
  //     </button>

  //     {isDelete ? <ChangePassword /> : <DeleteAccount />}
  //   </section>
  // );
}

export default Settings;

function DeleteAccount() {
  //Step 1
  const [password, setPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  //Step 2
  const [isModalOpenNoOutstanding, setIsModalOpenNoOutstanding] =
    useState(false); // For no outstanding payment modal
  const [isModalDeleteAccount, setIsModalDeleteAccount] = useState(false);
  const [moneyleft, setMoneyLeft] = useState(false);

  const [errors, setErrors] = useState({
    password: "",
    message: "",
  });

  const handlecheckPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    // Step 1: Client-Side Validation
    const validateFields = deleteAccountSchema.safeParse({
      password: password,
    });

    if (!validateFields.success) {
      // Set client-side validation errors, providing defaults for missing fields
      const validationErrors = validateFields.error.flatten().fieldErrors;

      setErrors({
        password: validationErrors.password?.[0] || "",
        message: "",
      });
      return;
    }

    try {
      const userid = Cookies.get("userId");
      const token = Cookies.get("token");

      const response = await axios.post(
        `${env.NEXT_PUBLIC_API_URL}/api/user/auth/checkPassword`,
        {
          userid,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Replace with your actual token or header value
            "Content-Type": "application/json", // Optional: Default for JSON data
          },
        },
      );
      setPassword("");
      setIsModalOpen(true); // Open the modal
    } catch (error: any) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        message:
          error.response?.data?.message ||
          "Failed to change password. Please try again.",
      }));
    }
  };

  const handleOutstandingpayment = async () => {
    try {
      const userid = Cookies.get("userId");
      const token = Cookies.get("token");

      const response = await axios.post(
        `${env.NEXT_PUBLIC_API_URL}/api/user/checkOutstandingpayment`,
        {
          userid,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Replace with your actual token or header value
            "Content-Type": "application/json", // Optional: Default for JSON data
          },
        },
      );
      console.log(response);
      const outstandingAmount = response.data.data || 0;

      if (outstandingAmount > 0) {
        // Open the modal for outstanding payment
        setIsModalOpenNoOutstanding(true);
        setMoneyLeft(outstandingAmount);
      } else {
        // Open a different modal for no outstanding payment
        setIsModalDeleteAccount(true);
      }
    } catch (error: any) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        message:
          error.response?.data?.message ||
          "Failed to change password. Please try again.",
      }));
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const userid = Cookies.get("userId");
      const token = Cookies.get("token");

      const response = await axios.post(
        `${env.NEXT_PUBLIC_API_URL}/api/user/deleteAaccount`,
        {
          userid,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Replace with your actual token or header value
            "Content-Type": "application/json", // Optional: Default for JSON data
          },
        },
      );

      //console.log(response);
    } catch (error: any) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        message:
          error.response?.data?.message ||
          "Failed to change password. Please try again.",
      }));
    }
  };

  return (
    <article className="ml-80 rounded-lg border border-[#C3C3C3] bg-[#ffffff] p-8 text-[#6B6B6B]">
      <div className="mb-4 flex items-center gap-x-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl">
          <CgDanger className="text-red-500" />
        </div>
        <div className="text-xs">
          <h3 className="text-base font-semibold text-black">
            Delete Account?
          </h3>
          <p className="text-[#6B6B6B]">
            You are going to delete the “Demo Project”
          </p>
        </div>
      </div>

      <p className="max-w-[400px] text-sm">
        Your account will be remove all of your information from our database.
        This can’t be undone.
      </p>
      {errors.message && (
        <div className="mt-2 text-red-500">{errors.message}</div>
      )}
      <form className="mt-10" onSubmit={handlecheckPassword}>
        <div className="mb-1 flex items-center gap-x-2 rounded-md border border-[#D9D9D9] bg-white p-2">
          <div className="p-1">
            <CiLock className="text-xl" />
          </div>
          <div className="h-8 border-l border-[#D9D9D9]" />
          <input
            type="password"
            className="focus:outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <p className="text-sm">Enter your password to confirm</p>
        {errors.password && (
          <span className="text-red-500">{errors.password}</span>
        )}{" "}
        {/* Display email error */}
        <div className="mt-6 flex gap-x-4">
          <button className="rounded-md bg-[#ECEEFF] px-6 py-3 text-sm font-semibold text-[#6B6B6B]">
            Cancel
          </button>
          <button className="rounded-md bg-[#151B54] px-6 py-3 text-sm font-semibold text-white">
            Confirm Delete
          </button>
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="flex flex-col items-center rounded bg-white p-6 text-center shadow-lg">
              <Image src="/icons/warn.png" height={50} width={50} alt="" />
              <h2 className="mt-2">Delete Account?</h2>
              <p className="mt-2">
                Are you sure about permanently <br /> deleting your account?
              </p>

              <div className="mt-4 flex gap-x-2">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="mt-4 bg-[#ECEEFF] px-8 py-2 text-black"
                >
                  No, Keep It.
                </button>

                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    handleOutstandingpayment();
                  }}
                  className="mt-4 bg-[#151B54] px-8 py-2 text-white"
                >
                  Yes, Delete!
                </button>
              </div>
            </div>
          </div>
        )}
        {isModalOpenNoOutstanding && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="flex flex-col items-center rounded bg-white p-6 text-center shadow-lg">
              <Image src="/icons/warn.png" height={50} width={50} alt="" />
              <h2 className="mt-2">Delete Account?</h2>
              <p className="mt-2">
                You have {moneyleft} USD left to pay and <br /> try again
              </p>

              <div className="mt-4 flex gap-x-2">
                <button
                  onClick={() => setIsModalOpenNoOutstanding(false)}
                  className="mt-4 bg-[#ECEEFF] px-8 py-2 text-black"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )}
        {isModalDeleteAccount && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="flex flex-col items-center rounded bg-white p-6 text-center shadow-lg">
              <Image src="/icons/warn.png" height={50} width={50} alt="" />
              <h2 className="mt-2">Account deletion successful?</h2>
              <p className="mt-2">
                The account will be completely <br /> deleted within 30 days.
              </p>

              <div className="mt-4 flex gap-x-2">
                <button
                  // onClick={() => setIsModalDeleteAccount(false)}
                  onClick={() => {
                    setIsModalDeleteAccount(false); // Close the modal
                    handleDeleteAccount(); // Call the function to delete the account
                  }}
                  className="mt-4 bg-[#ECEEFF] px-8 py-2 text-black"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}
      </form>
    </article>
  );
}

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");

  // Function to evaluate password strength
  const evaluatePasswordStrength = (newPassword: any) => {
    if (newPassword.length === 0) {
      return ""; // No strength if no input
    }
    if (newPassword.length < 8) {
      return "Weak";
    }
    const strongRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})",
    );
    if (strongRegex.test(newPassword)) {
      return "Strong";
    }
    return "Medium";
  };

  // Handle password change
  const handlePasswordChange = (e: any) => {
    const password = e.target.value;
    setNewPassword(password);
    setPasswordStrength(evaluatePasswordStrength(password));
  };

  const [errors, setErrors] = useState({
    currentpassword: "",
    newpassword: "",
    cnewpassword: "",
    message: "",
  });
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    // Step 1: Client-Side Validation
    const validateFields = changePasswordSchema.safeParse({
      password: currentPassword,
      newpassword: newPassword,
      cnewpassword: confirmPassword,
    });

    if (!validateFields.success) {
      // Set client-side validation errors, providing defaults for missing fields
      const validationErrors = validateFields.error.flatten().fieldErrors;

      setErrors({
        currentpassword: validationErrors.password?.[0] || "",
        newpassword: validationErrors.newpassword?.[0] || "",
        cnewpassword: validationErrors.cnewpassword?.[0] || "",
        message: "",
      });
      return;
    }

    try {
      const userid = Cookies.get("userId");
      const token = Cookies.get("token");

      const response = await axios.post(
        `${env.NEXT_PUBLIC_API_URL}/api/user/auth/changePassword`,
        {
          userid,
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Replace with your actual token or header value
            "Content-Type": "application/json", // Optional: Default for JSON data
          },
        },
      );
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setIsModalOpen(true); // Open the modal
    } catch (error: any) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        message:
          error.response?.data?.message ||
          "Failed to change password. Please try again.",
      }));
    }
  };

  return (
    <div className="flex-wrap gap-8">
      {/* Change password section */}
      <article className="ml-80 rounded-lg border border-[#C3C3C3] bg-[#ffffff] p-8 text-[#6B6B6B]">
        <div className="mb-4 flex items-center gap-x-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D9D9D9] bg-white text-xl">
            <CiLock className="text-xl" />
          </div>
          <div className="text-xs">
            <h3 className="text-base font-semibold text-black">
              Change Password
            </h3>
            <p className="text-[#6B6B6B]">
              Update passwords for enhance account security
            </p>
          </div>
        </div>
        {errors.message && (
          <div className="mt-2 text-red-500">{errors.message}</div>
        )}

        <form className="mt-10 grid gap-y-4" onSubmit={handleChangePassword}>
          <div className="mb-1 flex items-center gap-x-2 rounded-md border border-[#D9D9D9] bg-white p-2">
            <div className="p-1">
              <CiLock className="text-xl" />
            </div>
            <div className="h-8 border-l border-[#D9D9D9]" />
            <input
              type="password"
              name="currentpassword"
              className="text-lg focus:outline-none"
              placeholder="Current Password"
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          {errors.currentpassword && (
            <span className="text-red-500">{errors.currentpassword}</span>
          )}{" "}
          {/* Display email error */}
          <div>
            <div className="mb-1 flex items-center gap-x-2 rounded-md border border-[#D9D9D9] bg-white p-2">
              <div className="p-1">
                <CiLock className="text-xl" />
              </div>
              <div className="h-8 border-l border-[#D9D9D9]" />
              <input
                type="password"
                name="newpassword"
                className="text-lg focus:outline-none"
                placeholder="New Password"
                onChange={handlePasswordChange}
              />
            </div>
            {errors.newpassword && (
              <span className="text-red-500">{errors.newpassword}</span>
            )}{" "}
            {/* Display email error */}
            <div className="mb-1 mt-2 gap-x-2">
              <div className="mb-1 mt-2 gap-x-2">
                {newPassword && (
                  <>
                    <div className="mt-1 text-sm">
                      {/* <span>Password Strength</span> */}
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-200">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          passwordStrength === "Weak"
                            ? "bg-red-500"
                            : passwordStrength === "Medium"
                              ? "bg-blue-600"
                              : "bg-green-500"
                        }`}
                        style={{
                          width:
                            passwordStrength === "Weak"
                              ? "33%"
                              : passwordStrength === "Medium"
                                ? "66%"
                                : "100%",
                        }}
                      ></div>
                    </div>
                  </>
                )}
              </div>

              {/* {newPassword && (
                <div
                  className={`text-sm mt-1 ${passwordStrength === 'Weak'
                    ? 'text-red-500'
                    : passwordStrength === 'Medium'
                      ? 'text-blue-600'
                      : 'text-black'
                    }`}
                >
                  Password Strength: {passwordStrength}
                </div>
              )} */}
            </div>
            <p className="text-right text-xs"> {passwordStrength}</p>
          </div>
          <div className="mb-1 flex items-center gap-x-2 rounded-md border border-[#D9D9D9] bg-white p-2">
            <div className="p-1">
              <CiLock className="text-xl" />
            </div>
            <div className="h-8 border-l border-[#D9D9D9]" />
            <input
              type="password"
              name="cnewpassword"
              className="text-lg focus:outline-none"
              placeholder="Confirm New Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {errors.cnewpassword && (
            <span className="text-red-500">{errors.cnewpassword}</span>
          )}{" "}
          {/* Display email error */}
          <div>
            <button className="w-full rounded-md bg-[#151B54] px-6 py-3 text-sm font-semibold text-white">
              Change My Password
            </button>
            {/* Modal Component */}
          </div>
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="flex flex-col items-center rounded bg-white p-6 text-center shadow-lg">
                <Image
                  src="/icons/success.png"
                  height={120}
                  width={120}
                  alt=""
                />
                <h2 className="mt-2">Success!</h2>
                <p className="mt-2">Your Password has been changed</p>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="mt-4 bg-[#FF7227] px-8 py-2 text-white"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </form>
      </article>
    </div>
  );
}

function AccountSecurity() {
  const [isonModalOpen, setIsOnModalOpen] = useState(false);
  const [isoffModalOpen, setIsOffModalOpen] = useState(false);

  const [is2fa, set2FA] = useState(false);
  const [errors, setErrors] = useState({
    password: "",
    message: "",
  });

  //Get dafault value for 2fa

  useEffect(() => {
    const userid = Cookies.get("userId");
    const token = Cookies.get("token");
    fetch(`${env.NEXT_PUBLIC_API_URL}/api/user/profile/retrieve`, {
      method: "POST",
      body: JSON.stringify({ userid: userid }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) =>
      res.json().then((data) => {
        if (data.status && data.status_code === 200) {
          set2FA(data?.data?.auth.auth_enable_2fa); // Update the state to reflect the change
        } else {
          setErrors(data.message);
        }
      }),
    );
  });

  /////////////

  const handle2fa = async (enable2fa: boolean) => {
    try {
      const userid = Cookies.get("userId");
      const token = Cookies.get("token");

      const response = await axios.post(
        `${env.NEXT_PUBLIC_API_URL}/api/user/auth/check2fa`,
        {
          userid,
          enable2fa, // Pass the 2FA status to the backend
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Replace with your actual token or header value
            "Content-Type": "application/json", // Optional: Default for JSON data
          },
        },
      );

      const isenable2fa = response?.data?.data?.auth.auth_enable_2fa;
      //alert(isenable2fa);  // Extract the data from the response

      set2FA(isenable2fa); // Update the state to reflect the change
      setIsOnModalOpen(false);
      setIsOffModalOpen(false);
    } catch (error: any) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        message:
          error.response?.data?.message ||
          "Failed to change 2FA. Please try again.",
      }));
    }
  };

  return (
    <article className="ml-80 rounded-lg border border-[#C3C3C3] bg-[#ffffff] p-8 text-[#6B6B6B]">
      <div className="mb-4 flex flex-col items-center justify-center">
        <div className="flex items-center justify-center rounded-full text-xl">
          <Image
            src="/icons/2FA.png" // Replace with the actual image path
            alt=""
            width={120}
            height={120}
            className=""
          />
        </div>
        {errors.message && (
          <div className="mt-2 text-red-500">{errors.message}</div>
        )}
        <div>
          <p className="text-xl font-bold text-black">
            Two factor Authentication
          </p>
        </div>
      </div>
      <form className="mt-10">
        <div className="mb-1 flex items-center justify-between gap-x-2 rounded-md p-2">
          <p>Enable 2FA</p>
          <div className="flex gap-x-2">
            <button
              type="button"
              onClick={() => setIsOffModalOpen(true)}
              className={`rounded-md px-3 py-1 text-sm font-semibold ${
                !is2fa ? "bg-[#231F20] text-white" : "bg-white text-[#6B6B6B]"
              }`}
            >
              OFF
            </button>
            <button
              type="button"
              onClick={() => setIsOnModalOpen(true)}
              className={`rounded-md px-3 py-1 text-sm font-semibold ${
                is2fa ? "bg-[#231F20] text-white" : "bg-white text-[#6B6B6B]"
              }`}
            >
              ON
            </button>
          </div>
        </div>

        {isoffModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="rounded bg-white p-6 shadow-lg">
              <h2 className="mt-2 text-[#FFB200]">
                Turn off 2-step <br /> Verification
              </h2>
              <p className="mt-2">
                Turning off 2-step verification will remove the <br /> extra
                security on your account
              </p>

              <div className="ml-4 mt-4 flex items-center justify-end gap-x-2">
                <button
                  onClick={() => setIsOffModalOpen(false)}
                  className="mt-4 px-6 py-2 text-[#2929E2]"
                  type="button"
                >
                  Cancel
                </button>

                <button
                  onClick={() => handle2fa(false)}
                  className="mt-4 px-6 py-2 text-black"
                  type="button"
                >
                  Turn off
                </button>
              </div>
            </div>
          </div>
        )}

        {isonModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="rounded bg-white p-6 shadow-lg">
              <h2 className="mt-2 text-[#FFB200]">
                Turn on 2-step <br /> Verification
              </h2>
              <p className="mt-2">
                Turning on 2-step verification will add the <br /> extra
                security on your account
              </p>

              <div className="mt-4 flex items-center justify-end gap-x-2">
                <button
                  onClick={() => setIsOnModalOpen(false)}
                  className="mt-4 px-6 py-2 text-[#2929E2]"
                  type="button"
                >
                  Cancel
                </button>

                <button
                  onClick={() => handle2fa(true)}
                  className="mt-4 px-6 py-2 text-black"
                  type="button"
                >
                  Turn on
                </button>
              </div>
            </div>
          </div>
        )}
      </form>
    </article>
  );
}
