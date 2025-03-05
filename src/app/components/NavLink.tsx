"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({
  children,
  to,
  className,
  active,
}: {
  children: React.ReactNode;
  to: string;
  className?: string;
  active?: string;
}) {
  const pathname = usePathname();

  const isActive =
    pathname === to ||
    (to === "/" && pathname === "/") ||
    (pathname.startsWith(to) && to !== "/");

  return (
    <Link href={to} className={`${className} ${isActive ? active : ""}`}>
      {children}
    </Link>
  );
}
