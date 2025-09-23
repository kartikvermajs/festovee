"use client";
import React from "react";
import Image from "next/image";
import googlefilled from "../../../assets/svgs/googlefilled.svg";

type GoogleButtonProps = {
  text?: string;
  onClick?: () => void;
  className?: string;
};

const GoogleButton: React.FC<GoogleButtonProps> = ({
  text = "Continue with Google",
  onClick,
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-center gap-3 border border-gray-400 rounded-2xl px-4 py-2 bg-gray-100 hover:bg-gray-50 transition font-medium text-gray-700 ${className}`}
    >
      <Image src={googlefilled} alt="Google Icon" width={20} height={20} />
      <span>{text}</span>
    </button>
  );
};

export default GoogleButton;
