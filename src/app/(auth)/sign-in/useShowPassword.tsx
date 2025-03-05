import { useState } from "react";

export default function useShowPassword() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible((prev) => !prev);

  return { isVisible, toggleVisibility };
}
