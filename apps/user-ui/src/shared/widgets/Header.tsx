"use client";
import Link from "next/link";
import React from "react";
import { Search } from "lucide-react";
import profile from "../../assets/svgs/profile.svg";
import heartoutline from "../../assets/svgs/heartoutline.svg";
import cartoutline from "../../assets/svgs/cartoutline.svg";
import logo from "../../assets/svgs/favicon.ico";
import Image from "next/image";
import HeaderBottom from "./HeaderBottom";
import useUser from "../../hooks/useUser";

const Header = () => {
  const { user, isLoading } = useUser();
  return (
    <div className="w-full bg-white">
      {/* Top Header */}
      <div className="w-[95%] md:w-[90%] lg:w-[80%] py-3 md:py-5 m-auto flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-0">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href={"/"}>
            <div className="flex items-center justify-center gap-2">
              <Image
                src={logo}
                alt="logo"
                width={32}
                height={32}
                className="w-8 h-8 md:w-9 md:h-9"
              />
              <span className="text-2xl md:text-3xl font-bold text-gray-700">
                Festovee
              </span>
            </div>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="w-full md:w-[70%] lg:w-[50%] relative">
          <input
            type="text"
            placeholder="Search for Products..."
            className="w-full px-3 md:px-4 text-sm md:text-base font-Poppins font-medium border-[2px] md:border-[2.5px] border-[#3489ff] outline-none h-[45px] md:h-[55px] rounded-sm"
          />
          <div className="w-[45px] md:w-[60px] cursor-pointer flex items-center justify-center h-[45px] md:h-[55px] bg-[#3489ff] absolute top-0 right-0">
            <Search color="white" size={20} />
          </div>
        </div>

        {/* Profile + Wishlist + Cart */}
        <div className="flex items-center gap-6 md:gap-8">
          {/* Profile */}
          <div className="flex items-center gap-2">
            {!isLoading && user ? (
              <Link href={"/profile"} className="flex gap-2">
                <div>
                  <Image
                    src={profile}
                    alt="profile"
                    width={40}
                    height={40}
                    className="w-8 h-8 md:w-10 md:h-10"
                  />
                </div>
                <div className="text-center md:text-left">
                  <span className="block text-xs md:text-sm font-medium">
                    Hello,
                  </span>
                  <span className="text-sm md:text-base font-semibold">
                    {user?.name?.split(" ")[0]}
                  </span>
                </div>
              </Link>
            ) : (
              <>
                <Link href={"/login"}>
                  <Image
                    src={profile}
                    alt="profile"
                    width={40}
                    height={40}
                    className="w-8 h-8 md:w-10 md:h-10"
                  />
                </Link>
                <Link href={"/login"} className="text-center md:text-left">
                  <span className="block text-xs md:text-sm font-medium">
                    Hello,
                  </span>
                  <span className="text-sm md:text-base font-semibold">
                    {isLoading ? "..." : "Sign In"}
                  </span>
                </Link>
              </>
            )}
          </div>

          {/* Wishlist + Cart */}
          <div className="flex items-center gap-4 md:gap-5">
            <Link href={"/wishlist"} className="relative">
              <Image
                src={heartoutline}
                alt="heart"
                width={58}
                height={58}
                // className="w-7 h-7 md:w-8 md:h-8"
              />
              <div className="w-5 h-5 md:w-6 md:h-6 border-2 border-white bg-red-500 rounded-full flex items-center justify-center absolute -top-0 -right-1">
                <span className="text-white text-[10px] md:text-sm font-medium">
                  0
                </span>
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
              <div className="w-5 h-5 md:w-6 md:h-6 border-2 border-white bg-red-500 rounded-full flex items-center justify-center absolute -top-3 -right-6">
                <span className="text-white text-[10px] md:text-sm font-medium">
                  0
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-b border-b-slate-300" />

      {/* Bottom Header */}
      <HeaderBottom />
    </div>
  );
};

export default Header;
