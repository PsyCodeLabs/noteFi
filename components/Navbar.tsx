"use client"
import React, { useEffect, useState, useRef } from "react";
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const showNavbar = useHideOnScroll();
  const dropdownRef = useRef<HTMLLIElement | null>(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const closeMenu = () => {
    setIsMenuOpen(false);
    setDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: { target: any; }) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (event: { key: string; }) => {
    if (event.key === 'Escape') {
      closeMenu();
    }
  };

  return (
    <nav
      className={`fixed w-full z-20 top-0 bg-gray-900 border-b border-gray-600 transition-transform duration-300 ${showNavbar ? 'translate-y-0' : '-translate-y-full'}`}
      onKeyDown={handleKeyDown}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" onClick={closeMenu}>
          <div className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer">
            <Image src={logo} className="w-10 h-10" alt="noteFi Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white" style={{margin:"auto", paddingLeft:"3%"}}>oteFi</span>
          </div>
        </Link>
        <div className="flex items-center lg:order-2">
          <div className="hidden lg:block mr-4">
            <w3m-button label="Connect Wallet" />
          </div>
          <button
            className="inline-flex items-center p-1.5 hover:bg-gray-700 text-sm text-gray-400 rounded-lg lg:hidden"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation menu"
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
            </svg>
          </button>
        </div>
        <div
          className={`${isMenuOpen ? 'block' : 'hidden'} w-full lg:block lg:w-auto lg:order-1`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
            <Link href="/" onClick={closeMenu}>
              <li className="block py-2 pr-4 pl-3 text-white hover:bg-gray-700 lg:px-4 rounded-md hover:text-emerald-500">
                Home
              </li>
            </Link>
            <li className="relative" ref={dropdownRef}>
              <button
                className={`flex items-center w-full cursor-pointer py-2 pr-4 pl-3 text-white hover:bg-gray-700 lg:px-4 rounded-md hover:text-emerald-500 ${dropdownOpen ? 'text-white' : ''}`}
                onClick={toggleDropdown}
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
              >
                Options
                <svg
                  className={`w-4 h-4 ml-1 transform transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div
                className={`${dropdownOpen ? 'block' : 'hidden'} mt-2 lg:absolute lg:z-10 bg-gray-800 rounded-lg shadow w-full lg:w-44`}
              >
                <ul className="py-2 text-sm text-white">
                  <Link href="/write" onClick={closeMenu}>
                    <li className="block px-4 py-2 hover:bg-gray-700 hover:text-emerald-500">
                      Write Option
                    </li>
                  </Link>
                  <Link href="/buy" onClick={closeMenu}>
                    <li className="block px-4 py-2 hover:bg-gray-700 hover:text-emerald-500">
                      Buy Option
                    </li>
                  </Link>
                </ul>
              </div>
            </li>
            <Link href="/positions" onClick={closeMenu}>
              <li className="block py-2 pr-4 pl-3 text-white hover:bg-gray-700 lg:px-4 rounded-md hover:text-emerald-500">
                Positions
              </li>
            </Link>
            <li className="block lg:hidden">
              <w3m-button label="Connect Wallet" balance="hide" />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
