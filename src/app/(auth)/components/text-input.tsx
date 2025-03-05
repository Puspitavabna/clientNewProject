"use client";

import { ComponentProps } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";
import { CgPassword } from "react-icons/cg";


import useShowPassword from "../sign-in/useShowPassword";

type TextInputProps = ComponentProps<"input"> & {
  label: string;
  icon?: string;
  name: string;
  errors?: Record<string, string[]>;
};

export default function TextInput({
  id,
  name,
  icon,
  label,
  errors,
  placeholder,
  ...props
}: TextInputProps) {
  const { isVisible, toggleVisibility } = useShowPassword();

  const hasError = errors && errors[name]?.length > 0;
  const errorMessage = hasError ? errors[name][0] : "";

  return (
    <article>
      <div className="relative w-full">

        {props.type === "password" && (
          <button
            type="button"
            className="absolute right-6 top-1/2 -translate-y-1/2"
            onClick={() => toggleVisibility()}
          >
            {isVisible ? (
              <IoEyeOffOutline className="h-6 w-6" />
            ) : (
              <IoEyeOutline className="h-6 w-6" />
            )}
          </button>
        )}

        <div className="absolute left-4 top-1/2 -translate-y-1/2">
        {
          props?.type == "password" ?
          <CgPassword className="h-6 w-6 text-gray-500" />
           :
           <MdOutlineMailOutline className="h-6 w-6 text-gray-500"/>
        }
        </div>

        <input
          {...props}
          type={props.type === "password" && isVisible ? "text" : props.type}
          id={id}
          name={name}
          placeholder={placeholder ? placeholder : ""}
          className={`peer w-full h-[56px] rounded-md border-2 border-[#151B54] bg-white px-12 py-2 text-sm text-gray-800 placeholder-transparent transition-all duration-150 focus:border-[#151B54] focus:ring-0 outline-none`}
        />
        <label
          htmlFor={name}
          className={`pointer-events-none absolute -top-3 left-[40px] bg-white px-[1px] font-semibold text-xl text-[#151B54] leading-none transition-all duration-300 peer-placeholder-shown:left-20 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:bg-transparent peer-placeholder-shown:px-0 peer-placeholder-shown:py-0 peer-focus:-top-0 peer-focus:left-[60px] peer-focus:bg-white peer-focus:px-2 peer-focus:text-[#0077B6]`}
        >
          {label}
        </label>
      </div>
      {hasError && <p className="mt-1 text-sm text-red-600">{errorMessage}</p>}
    </article>
  );
}
