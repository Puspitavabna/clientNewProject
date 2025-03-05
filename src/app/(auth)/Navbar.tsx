"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import NavLink from "./NavLink";
import logo from "/public/logo.svg";

function Navbar() {
  const active = "font-bold text-white hover:text-white cursor-pointer";
  const [id, setId] = useState<string | null>("");

  useEffect(() => {
    const id = localStorage.getItem("token");
    setId(id);
  }, []);

  return (
    <nav className="flex h-[14vh] items-center justify-between bg-[#CCCCFF] px-10 py-4">
      {/* bg-[#231B7D] */}
      <div>
        <Image fill src={logo} alt="Logo" />
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
        <li className="navbar">
          <Link
            href={id ? "/dashboard/profile" : "/sign-in"}
            className="rounded-md bg-[#151B54] px-3 py-2.5 font-semibold tracking-widest text-[#ffffff]"
          >
            {id ? "PROFILE" : "Login"}
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
