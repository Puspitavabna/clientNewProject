"use client";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import ProfileForm from "./ProfileForm";

function EditProfile() {
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
    value = Cookies.get("userId") || ""; //localStorage.getItem("userid") || "";
    setUserId(value);

    const token = Cookies.get("token") || ""; //localStorage.getItem("token") || "";
    setToken(token);
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#ffffff]">
      <ProfileForm userId={userId} token={token} />
    </div>
  );
}
export default EditProfile;
