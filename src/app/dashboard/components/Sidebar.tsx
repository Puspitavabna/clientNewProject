"use client";
import { FaUserAlt } from "react-icons/fa";
import { IoLogOut, IoSettings } from "react-icons/io5";
import { RiReceiptFill } from "react-icons/ri";
import NavLink from "../../components/NavLink";
import { logout } from "../../lib/logout";
//import { SERVER_URL } from "@/src/app/constants/api";
import Cookies from "js-cookie";
import Image from "next/image";
import { useEffect, useState } from "react";
import { env } from "../../../../config/env";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { logoutUser } from "../../store/slices/authSlice";

function Sidebar() {
  const [data, setData] = useState<any>();
  const [errMsg, setErrMsg] = useState();
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  console.log(data);

  const user = useSelector((state:any)=>(state.auth.user))
   const dispatch = useDispatch()
   const router = useRouter()
  const active = "bg-[#151B54] text-white font-bold";

  return (
    <aside className="w-70 flex-shrink-0 bg-[#F8F6F0]">
      <div className="my-10 mr-2 mt-5 flex items-center justify-center gap-x-4">
        {/*  Changing the  class name with new one. andd img tag 
        <div className="h-20 w-20 rounded-full border" />
         */}
        <div className="flex items-center gap-x-2 mb-4 justify-center" />
        <Image
          src={profileImageUrl ? profileImageUrl : "/images/upload-avatar.png"}
          alt="User Profile"
          width={70}
          height={70}
          className="rounded-full cursor-pointer"
        />
</div>
        <div className="flex items-center gap-x-2 mb-4 justify-center">
          <h3 className="font-bold text-sm">{user && user.name}</h3>
          <span className="text-xs">ID :{`${user && (user.userUID ?? "")}`}</span>
          {/* <IoTriangle /> */}
        </div>

      <ul className="flex flex-col gap-y-2 px-4">
        <li>
          <NavLink to="/dashboard/profile" active={active} className="sidebar">
            <FaUserAlt className="text" />
            Profile
          </NavLink>

          {/* <NavLink to="/dashboard" active={active} className="sidebar">
            <FaUserAlt className="text" />
            Profile
          </NavLink> */}
        </li>
        <li>
          <NavLink to="/dashboard/orders" active={active} className="sidebar">
            <RiReceiptFill />
            Orders
          </NavLink>
        </li>
        {/* <li>
          <NavLink to="/dashboard/accounting" active={active} className="sidebar">
            <RiReceiptFill />
            Accounting
          </NavLink>
        </li> */}
        {/* <li>
          <NavLink to="/dashboard/transaction" active={active} className="sidebar">
            <RiReceiptFill />
            Transaction
          </NavLink>
        </li> */}

        <li>
          <NavLink to="/dashboard/Payment" active={active} className="sidebar">
            <RiReceiptFill />
            Payment
          </NavLink>
        </li>

        <li>
          <NavLink to="/dashboard/settings" active={active} className="sidebar">
            <IoSettings />
            Settings
          </NavLink>
        </li>
        <li>
          <button
            onClick={()=>{
              router.push('/')
            dispatch(logoutUser())
            }}
            className="mt-10 flex items-center gap-x-2 px-6 text-lg font-medium transition-all duration-75"
          >
            <IoLogOut className="rotate-180 transform" /> Logout
          </button>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
