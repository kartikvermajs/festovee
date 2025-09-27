"use client";
import { AlignLeft, ChevronDown } from "lucide-react";
import React, { useEffect, useState } from "react";
import { navItems } from "../../configs/constants";
import Link from "next/link";

const HeaderBottom = () => {
  const [show, setShow] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`w-full transition-all duration-200 bg-gray-300 ${
        isSticky ? "fixed top-0 left-0 z-[100] bg-white shadow-lg" : "relative"
      }`}
    >
      <div
        className={`w-[95%] md:w-[95%] lg:w-[80%] relative m-auto flex flex-col md:flex-row items-center justify-center md:justify-between z-10 py-2`}
      >
        {/* Categories Dropdown (md and up) */}
        <div
          className="hidden md:flex md:w-[260px] cursor-pointer items-center justify-between px-4 md:px-5 h-[45px] md:h-[50px] bg-[#3489ff]"
          onClick={() => setShow(!show)}
        >
          <div className="flex items-center gap-2">
            <AlignLeft color="white" size={20} />
            <span className="text-white text-sm md:text-base font-medium font-Poppins">
              All Categories
            </span>
          </div>
          <ChevronDown color="white" size={18} />
        </div>

        {/* Dropdown Menu */}
        {show && (
          <div
            className={`hidden md:block absolute left-0 ${
              isSticky ? "top-[70px]" : "top-[50px]"
            } w-[260px] md:h-[400px] bg-[#f5f5f5] shadow-md z-50`}
          >
            {/* Add your category items here */}
          </div>
        )}

        {/* Navigation Links */}
        <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 mt-3 md:mt-0 w-full md:w-auto">
          {navItems.map((i: any, index: number) => (
            <Link
              className="px-2 md:px-3 lg:px-5 font-medium text-sm md:text-base lg:text-lg hover:text-[#3489ff] transition-colors"
              href={i.href}
              key={index}
            >
              {i.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeaderBottom;
