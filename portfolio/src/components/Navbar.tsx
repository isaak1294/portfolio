'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const navLinks = [
  { label: 'Blog', href: '/blog' },
  { label: 'Experience', href: '/experience' },
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="w-full bg-black border-b border-gray-800 px-6 py-6 flex items-center justify-between text-white font-semibold text-sm sm:text-base z-50">
      <Link href="/" className="text-lg sm:text-xl font-bold tracking-wide hover:text-gray-300 transition-colors duration-200">
        ISAAK WIEBE
      </Link>

      <div className="flex gap-0 divide-x divide-gray-700 border border-gray-700">
        {navLinks.map(({ label, href }) => {
          const isActive = pathname === href;
          return (
            <Link href={href} key={label}>
              <button
                className={clsx(
                  "px-4 py-2 transition-colors duration-200",
                  isActive ? "bg-gray-800 text-white" : "bg-black text-gray-300 hover:bg-gray-700 hover:text-white"
                )}
              >
                {label}
              </button>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
