'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLinkProps {
  children: React.ReactNode;
  to: string;
  className?: string;
  active?: string;
}

export default function NavLink({
  children,
  to,
  className = '', // Default empty string if className is not provided
  active = 'active', // Default class name for active state
}: NavLinkProps) {
  const pathname = usePathname();

  const isActive =
    pathname === to ||
    (to === '/' && pathname === '/') ||
    (pathname.startsWith(to) && to !== '/');

  return (
    <Link href={to} className={`${className} ${isActive ? active : ''}`}>
      {children}
    </Link>
  );
}
