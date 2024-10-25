// Dashboard.js
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Logo from "../components/common/logo";
import Link from "next/link";

export default function Features() {
  const [savedData, setSavedData] = useState(null); // Track localStorage data
  useEffect(() => {
    // Check if localStorage is available (client-side only)
    if (typeof window !== "undefined") {
      const data = localStorage.getItem("myData");
      setSavedData(data);
    }
  }, []);
  return (
    <>
      <div className="bg-primary w-full overflow-hidden bg-white min-h-screen ">
        <header className="flex items-center justify-between px-4 md:px-12 lg:px-24 bg-white">
          {/* Left Image */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          <div className="flex items-center px-2 sm:px-3 py-1 sm:py-2">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-fuchsia-950 p-1 sm:p-2">
              About Us
            </h1>
          </div>

          {/* Right Image Icon */}
          {typeof savedData === "string" ? (
            <>
              <Link href="/Profile" passHref>
                <div className="flex items-center justify-between rounded-lg hover:bg-gray-100 p-2 cursor-pointer transition-colors duration-200">
                  <div className="mx-2">
                    <Image
                      src={require("../assets/logo/User_Icon.png")} // Replace with your icon path
                      alt="User Icon"
                      width={24} // Icon width
                      height={24} // Icon height
                    />
                  </div>

                  {/* Right Text */}
                  <span className="text-sm font-sans font-normal text-gray-700">
                    Nabarun
                  </span>
                </div>
              </Link>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between rounded-lg hover:bg-gray-100 p-2 cursor-pointer transition-colors duration-200"></div>
            </>
          )}
        </header>
      </div>
    </>
  );
}
