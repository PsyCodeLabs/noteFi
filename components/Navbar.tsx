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
          <div className="px-4">
            <w3m-button label="Connect Wallet" /> {/* Assuming w3m-button is a component you have */}
          </div>
          <button
            data-collapse-toggle="navbar-hamburger"
            type="button"
            className="inline-flex items-center p-2 text-gray-400 rounded-lg lg:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
            aria-controls="navbar-hamburger"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        <div className="hidden items-center justify-end w-full lg:flex lg:w-auto lg:order-1" id="navbar-sticky">
          <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
            <Link href="/">
              <li className="block py-2 pr-4 pl-3 text-white hover:bg-gray-700 lg:hover:bg-transparent lg:p-0" onClick={closeDropdown}>
                Home
              </li>
            </Link>
            <li className="relative">
              <div
                className={`flex items-center cursor-pointer py-2 pr-4 pl-3 text-white hover:bg-gray-700 lg:hover:bg-transparent lg:p-0 ${dropdownOpen ? 'text-white' : ''}`}
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
                      <li className="block px-4 py-2 hover:bg-gray-700" onClick={closeDropdown}>
                        Write Option
                      </li>
                    </Link>
                    <Link href="/buy">
                      <li className="block px-4 py-2 hover:bg-gray-700" onClick={closeDropdown}>
                        Buy Option
                      </li>
                    </Link>
                  </ul>
                </div>
              )}
            </li>
            <Link href="/positions">
              <li className="block py-2 pr-4 pl-3 text-white hover:bg-gray-700 lg:hover:bg-transparent lg:p-0" onClick={closeDropdown}>
                Positions
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </nav>
  );
}
