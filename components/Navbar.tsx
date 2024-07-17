"use client"
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/noteFi_logo.png"; // Ensure this path is correct

function useHideOnScroll() {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== "undefined") {
        setShow(window.scrollY < lastScrollY || window.scrollY < 100);
        setLastScrollY(window.scrollY);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return show;
}

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const showNavbar = useHideOnScroll();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };
  

  return (
    <nav className={`fixed w-full z-20 top-0 bg-gray-900 border-b border-gray-600 transition-transform duration-300 ${showNavbar ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <Image src={logo} className="w-10 h-10" alt="noteFi Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">noteFi</span>
        </div>
        <div className="flex items-center lg:order-2">
          <div className="">
            <w3m-button label="Connect Wallet" /> {/* Assuming w3m-button is a component you have */}
          </div>
          <button className="inline-flex items-center p-1.5 hover:bg-gray-700 text-sm text-gray-400 rounded-lg md:hidden"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              <span className="sr-only">Open main menu</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
              </svg>
            </button>
        </div>
        <div className="hidden items-center justify-end w-full lg:flex lg:w-auto lg:order-1" id="navbar-sticky">
          <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
            <Link href="/">
              <li className="block py-2 pr-4 pl-3 text-white hover:bg-gray-700 lg:px-4 rounded-md hover:text-emerald-500" onClick={closeDropdown}>
                Home
              </li>
            </Link>
            <li className="relative">
              <div
                className={`flex items-center cursor-pointer py-2 pr-4 pl-3 text-white hover:bg-gray-700 lg:px-4 rounded-md hover:text-emerald-500 ${dropdownOpen ? 'text-white' : ''}`}
                onClick={toggleDropdown}
              >
                Options
                <svg
                  className={`w-4 h-4 ml-1 transform transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
              {dropdownOpen && (
                <div className="mt-8 absolute z-10 bg-gray-800 rounded-lg shadow w-44">
                  <ul className="py-2 text-sm text-white">
                    <Link href="/write">
                      <li className="block px-4 py-2 hover:bg-gray-700 hover:text-emerald-500" onClick={closeDropdown}>
                        Write Option
                      </li>
                    </Link>
                    <Link href="/buy">
                      <li className="block px-4 py-2 hover:bg-gray-700 hover:text-emerald-500" onClick={closeDropdown}>
                        Buy Option
                      </li>
                    </Link>
                  </ul>
                </div>
              )}
            </li>
            <Link href="/positions">
              <li className="block py-2 pr-4 pl-3 text-white hover:bg-gray-700 lg:px-4 rounded-md hover:text-emerald-500" onClick={closeDropdown}>
                Positions
              </li>
            </Link>
          </ul>
        </div>
      </div>
      {isDropdownOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/">
              <div className="hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium text-emerald-500">Home</div>
            </Link>
            <Link href="/write">
              <div className="hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium text-emerald-500">Write Option</div>
            </Link>
            <Link href="/buy">
              <div className="hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium text-emerald-500">Buy an Option</div>
            </Link>
            <Link href="/positions">
              <div className="hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium text-emerald-500">Positions</div>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
