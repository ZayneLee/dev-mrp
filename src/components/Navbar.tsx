"use client";

import { useState, useRef } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showDropdown = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsDropdownOpen(true);
  };

  const hideDropdown = () => {
    timeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 100);
  };

  return (
    <nav className="bg-gray-800 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">
          <Link href="/" legacyBehavior>
            <a className="hover:text-gray-400 transition duration-300">
              CVC Components System
            </a>
          </Link>
        </div>
        <div className="space-x-4 flex items-center">
          <Link href="/" legacyBehavior>
            <a className="text-gray-300 hover:text-white transition duration-300">
              Dashboard
            </a>
          </Link>
          <Link href="/stock/list" legacyBehavior>
            <a className="text-gray-300 hover:text-white transition duration-300">
              Stock
            </a>
          </Link>
          <div
            className="relative"
            onMouseEnter={showDropdown}
            onMouseLeave={hideDropdown}
          >
            <button className="text-gray-300 hover:text-white transition duration-300 focus:outline-none">
              Quotes
            </button>
            {isDropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-20">
                <Link href="/stock/list" legacyBehavior>
                  <a className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                    Quote List
                  </a>
                </Link>
                <Link href="/stock/add" legacyBehavior>
                  <a className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                    Add Quote
                  </a>
                </Link>
              </div>
            )}
          </div>
          <Link href="/mrp" legacyBehavior>
            <a className="text-gray-300 hover:text-white transition duration-300">
              MRP
            </a>
          </Link>
          <Link href="/qa" legacyBehavior>
            <a className="text-gray-300 hover:text-white transition duration-300">
              QA
            </a>
          </Link>
          <Link href="/crm" legacyBehavior>
            <a className="text-gray-300 hover:text-white transition duration-300">
              CRM
            </a>
          </Link>
          <Link href="/setting" legacyBehavior>
            <a className="text-gray-300 hover:text-white transition duration-300">
              Setting
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
