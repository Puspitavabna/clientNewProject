'use client';
// Top navigation for the page, such as login, en, signup etc.
import Image from 'next/image';
import logo from '../../../../public/logo.svg';
import NavLink from '../header/NavLink';

import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
//import { SERVER_URL } from "@/src/app/constants/api";

// import SignIn from '../(auth)/sign-in/page';
import { env } from '../../../../config/env';

export default function TopNav() {
  const [data, setData] = useState<any>();
  const [errMsg, setErrMsg] = useState();
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false); // To handle client-side rendering

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const active =
    'font-bold text-white hover:text-#151B54 relative after:absolute after:-bottom-2 after:left-0 after:h-[3px] after:bg-[#151B54] after:w-full';

  useEffect(() => {
    setIsClient(true); // Set isClient to true after the component has mounted on the client

    const userid = Cookies.get('userId');
    const token = Cookies.get('token');
    fetch(`${env.NEXT_PUBLIC_API_URL}/api/v1/factory-app/user/profile/retrieve`, {
      method: 'POST',
      body: JSON.stringify({ userid: userid }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: `Bearer ${token}`,
      },
    }).then((res) =>
      res.json().then((data) => {
        if (data.status && data.status_code === 200) {
          setData(data.data);

          const profileImageUrlFromServer = data.data.profile_image;
          if (
            profileImageUrlFromServer &&
            profileImageUrlFromServer.trim() !== ''
          ) {
            const fullProfileImageUrl = profileImageUrlFromServer.includes(
              'http'
            )
              ? profileImageUrlFromServer
              : `${env.NEXT_PUBLIC_API_URL}/uploads/${profileImageUrlFromServer}`;
            setProfileImageUrl(fullProfileImageUrl);
          } else {
            setProfileImageUrl('/images/upload-avatar.png');
          }
        } else {
          setErrMsg(data.message);
        }
      })
    );
  }, []);

  useEffect(() => {
    const id = Cookies.get('token') ?? null;
    setId(id);
  }, []);

  // Ensure the component is rendered only after it's mounted on the client
  if (!isClient) return null; // Prevent SSR-related issues

  return (
    <nav className="flex bg-[#151B54] h-[14vh] items-center justify-between mx-10 pl-8">
      <div className="">
        <Image src={logo} alt="Logo" />
      </div>

      <ul className="flex items-center gap-x-5">
        <li>
          <NavLink to="/" className="navbar" active={active}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/template" className="navbar" active={active}>
            Template
          </NavLink>
        </li>
        <li>
          <NavLink to="/architecture" active={active} className="navbar">
            Architecture
          </NavLink>
        </li>
        <li>
          <NavLink to="/gallery" active={active} className="navbar">
            Gallery
          </NavLink>
        </li>
        <li>
          <NavLink to="/our-service" active={active} className="navbar">
            Our Service
          </NavLink>
        </li>
        <li>
          <NavLink to="/notice" active={active} className="navbar">
            Notice
          </NavLink>
        </li>
        <li>
          <NavLink to="/orders" active={active} className="navbar">
            Orders
          </NavLink>
        </li>
        <li>
          <NavLink to="/employee/all" active={active} className="navbar">
            Employer
          </NavLink>
        </li>
        <li>
          <NavLink to="/news" active={active} className="navbar">
            Blog
          </NavLink>
        </li>
        <li>
          {id ? (
            <div className="relative">
              <Image
                src={
                  profileImageUrl
                    ? profileImageUrl
                    : '/images/upload-avatar.png'
                }
                alt="User Profile"
                width={40}
                height={40}
                className="cursor-pointer rounded-full"
                onClick={() => {
                  // Use window.location.href for redirection
                  window.location.href = '/dashboard/profile';
                }}
              />
            </div>
          ) : (
            <button
              onClick={openModal}
              className="rounded-md bg-[#151B54] px-3 py-2.5 font-semibold tracking-widest text-[#FFFFFF]"
            >
              Sign In
            </button>
          )}
        </li>
      </ul>

      {/* {isModalOpen && <SignIn onClose={closeModal} />} */}
    </nav>
  );
}
