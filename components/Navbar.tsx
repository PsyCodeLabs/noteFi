"use client";
import React, { useState } from "react";
import Image from "next/image";
import logo from "@/public/noteFi_logo.png";
import Link from "next/link";

export default function Navbar({ className }: { className?: string }) {
  const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown state

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  return (
    <header>
      <nav className="bg-gray-900 border-gray-700 px-4 lg:px-6 py-2.5 dark:bg-gray-900 border-b">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <div className="flex items-center">
            <Image className="h-10 w-10 mr-2" src={logo} alt="noteFi" />
            <span className="self-center text-xl font-semibold whitespace-nowrap text-white">noteFi</span>
          </div>
          <div className="flex items-center lg:order-2">
            <div className="px-4 lg:px-5 py-2 lg:py-2.5 mr-2">
              <w3m-button />
            </div>
            <button
              data-collapse-toggle="mobile-menu-2"
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-400 rounded-lg lg:hidden hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600"
              aria-controls="mobile-menu-2"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <Link href="/">
                <li className="block py-2 pr-4 pl-3 text-emerald-400 rounded bg-transparent lg:bg-transparent lg:text-emerald-400 lg:p-0 dark:text-white" aria-current="page" onClick={closeDropdown}>
                  Home
                </li>
              </Link>
              <li className="relative">
                <div
                  className={`flex items-center cursor-pointer block py-2 pr-4 pl-3 text-gray-400 border-b border-gray-700 hover:bg-gray-800 lg:hover:bg-transparent lg:border-0 lg:hover:text-emerald-400 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-800 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 ${dropdownOpen ? 'text-emerald-400' : ''}`}
                  onClick={toggleDropdown}
                >
                  Options
                  <svg
                    className={`w-4 h-4 ml-1 text-gray-400 transform transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
                {dropdownOpen && (
                  <div className="mt-8 absolute z-10 bg-gray-800 rounded-lg shadow w-44 dark:bg-gray-800">
                    <ul className="py-2 text-sm text-gray-200 dark:text-gray-200">
                      <Link href="/write">
                        <li className="block px-4 py-2 hover:bg-gray-700 dark:hover:bg-gray-700 dark:hover:text-white" onClick={closeDropdown}>
                          Write Option
                        </li>
                      </Link>
                      <Link href="/buy">
                        <li className="block px-4 py-2 hover:bg-gray-700 dark:hover:bg-gray-700 dark:hover:text-white" onClick={closeDropdown}>
                          Buy Option
                        </li>
                      </Link>
                    </ul>
                  </div>
                )}
              </li>
              <Link href="/positions">
                <li className="block py-2 pr-4 pl-3 text-gray-400 border-b border-gray-700 hover:bg-gray-800 lg:hover:bg-transparent lg:border-0 lg:hover:text-emerald-400 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-800 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700" onClick={closeDropdown}>
                  Positions
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
