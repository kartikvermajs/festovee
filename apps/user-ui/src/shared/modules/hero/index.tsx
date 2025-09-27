"use client";
import { MoveRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import React from "react";

const Hero = () => {
  const router = useRouter();

  return (
    <div className="bg-gradient-to-r from-[#115061] to-[#0d3b4b] h-[85vh] flex flex-col justify-center">
      <div className="w-[80%] m-auto md:flex h-full items-center">
        {/* Left Content */}
        <div className="md:w-1/2 space-y-4">
          <p className="font-Poppins font-medium text-white text-lg tracking-wide uppercase">
            Welcome to Festovee!!
          </p>
          <h1 className="text-white text-5xl md:text-6xl font-bold font-Poppins leading-tight">
            1k+ factories, Exports to UK & Africa
          </h1>
          <p className="font-Poppins text-2xl md:text-3xl pt-2 text-white">
            Exclusive Offer{" "}
            <span className="text-yellow-400 font-bold">
              10% OFF this week.
            </span>
          </p>
          <button
            onClick={() => router.push("/products")}
            className="mt-6 flex items-center justify-center gap-2 bg-yellow-400 text-[#115061] font-semibold py-3 px-6 rounded-lg shadow-lg transition-all hover:bg-yellow-300 hover:translate-y-[-2px] hover:shadow-xl"
          >
            Shop Now <MoveRight size={18} />
          </button>
        </div>

        {/* Right Content */}
        <div className="md:w-1/2 flex justify-center mt-10 md:mt-0">
          <div className="relative w-[400px] h-[400px] md:w-[450px] md:h-[450px]">
            <Image
              src="https://res.cloudinary.com/dh9j3przi/image/upload/v1758362137/cat1_fmydzj.jpg"
              alt="banner"
              fill
              className="rounded-xl object-cover shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
