"use client";
import { AlignLeft, ChevronDown } from "lucide-react";
import React, { useEffect, useState } from "react";
import { navItems } from "../../configs/constants";
import Link from "next/link";
import profile from "../../assets/svgs/profile.svg";
import heartoutline from "../../assets/svgs/heartoutline.svg";
import cartoutline from "../../assets/svgs/cartoutline.svg";
import Image from "next/image";

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
      className={`w-full transition-all duration-300 ${
        isSticky ? "fixed top-0 left-0 z-[100] bg-white shadow-lg" : "relative"
      }`}
    >
      <div
        className={`w-[95%] md:w-[90%] lg:w-[80%] relative m-auto flex flex-col lg:flex-row items-center justify-between ${
          isSticky ? "pt-3" : "py-0"
        }`}
      >
        {/* Categories Dropdown Button */}
        <div
          className={`w-full lg:w-[260px] ${
            isSticky && "lg:-mb-2"
          } cursor-pointer flex items-center justify-between px-4 md:px-5 h-[45px] md:h-[50px] bg-[#3489ff]`}
          onClick={() => setShow(!show)}
        >
          <div className="flex items-center gap-2">
            <AlignLeft color="white" size={20} />
            <span className="text-white text-sm md:text-base font-medium">
              All Categories
            </span>
          </div>
          <ChevronDown color="white" size={18} />
        </div>

        {/* Dropdown Menu */}
        {show && (
          <div
            className={`absolute left-0 ${
              isSticky ? "top-[70px]" : "top-[50px]"
            } w-full lg:w-[260px] h-[300px] md:h-[400px] bg-[#f5f5f5]`}
          ></div>
        )}

        {/* Navigation Links */}
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 lg:gap-0 mt-3 lg:mt-0">
          {navItems.map((i: NavItemTypes, index: number) => (
            <Link
              className="px-2 md:px-3 lg:px-5 font-medium text-sm md:text-base lg:text-lg hover:text-[#3489ff] transition-colors"
              href={i.href}
              key={index}
            >
              {i.title}
            </Link>
          ))}
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-auto mt-3 lg:mt-0">
          {isSticky && (
            <div className="w-full lg:w-[80%] py-3 md:py-5 m-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Profile */}
              <div className="flex items-center gap-2">
                <Link href={"/login"}>
                  <Image
                    src={profile}
                    alt="profile"
                    width={40}
                    height={40}
                    className="w-8 h-8 md:w-10 md:h-10"
                  />
                </Link>
                <Link href={"/login"} className="text-center sm:text-left">
                  <span className="block text-xs md:text-sm font-medium">
                    Hello,
                  </span>
                  <span className="text-sm md:text-base font-semibold">
                    Sign In
                  </span>
                </Link>
              </div>

              {/* Wishlist + Cart */}
              <div className="flex items-center gap-5">
                <Link href={"/wishlist"} className="relative">
                  <Image
                    src={heartoutline}
                    alt="heart"
                    width={28}
                    height={28}
                    className="w-6 h-6 md:w-8 md:h-8"
                  />
                  <div className="w-5 h-5 border-2 border-white bg-red-500 rounded-full flex items-center justify-center absolute -top-2 -right-2">
                    <span className="text-white text-xs font-medium">0</span>
                  </div>
                </Link>
                <Link href={"/cart"} className="relative">
                  <Image
                    src={cartoutline}
                    alt="cart"
                    width={28}
                    height={28}
                    className="w-6 h-6 md:w-8 md:h-8"
                  />
                  <div className="w-5 h-5 border-2 border-white bg-red-500 rounded-full flex items-center justify-center absolute -top-2 -right-2">
                    <span className="text-white text-xs font-medium">0</span>
                  </div>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderBottom;
