"use client";

import { FieldConfig, useField } from "formik";
import Image from "next/image";
import { useState } from "react";

type Props = React.ClassAttributes<HTMLInputElement> &
  React.InputHTMLAttributes<HTMLInputElement> &
  FieldConfig<any> & {
    label: string;
    classname?: string;
    icon: string;
    placeholder: string;
  };

function TextInput({
  label,
  classname,
  type,
  icon,
  placeholder,
  ...props
}: Props) {
  const [field, meta] = useField(props);
  const [visibility, setVisibility] = useState(false);

  const togglePasswordVisibility = () => {
    setVisibility(!visibility);
  };

  return (
    <div>
      <div className="relative">
        <span className="absolute left-6 top-1/2 -translate-y-1/2">
          <Image alt="Icon" src={icon} width={25} height={25} fill />
        </span>
        <input
          id={props?.id ? props?.id : label}
          type={type === "password" && visibility ? "text" : type} //{type}
          className="peer h-10 w-full rounded-[40px] bg-[#2F2F2F1A] px-6 py-7 pl-[60px] text-gray-900 placeholder-transparent focus:border-rose-600 focus:outline-none"
          placeholder={placeholder}
          {...field}
          {...props}
        />
        <label
          htmlFor={label}
          className="absolute -top-2 left-[59px] text-sm text-gray-600 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-gray-600"
        >
          {label}
        </label>
      </div>

      {meta.touched && meta.error ? (
        <div className="mt-1 text-sm text-red-400">{meta.error}</div>
      ) : null}
    </div>
  );
}

export default TextInput;
