"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton({
  pendingText,
  text,
  className = "", 
}: {
  pendingText: string;
  text: string;
  className?: string; // The className is optional
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`w-2/3 rounded-md bg-[#151B54] px-10 py-2 h-[61px] text-md  text-white transition-all duration-150 hover:bg-[#151B54]/90 disabled:cursor-not-allowed ${className}`}
    >
      {pending ? pendingText : text}
    </button>
  );
}
