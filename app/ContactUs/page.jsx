// Dashboard.js
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Logo from "../components/common/logo";
import Link from "next/link";

export default function Features() {
  const [savedData, setSavedData] = useState(null); // Track localStorage data?

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
              Contact Us
            </h1>
          </div>

          {/* Right Image Icon */}
          {typeof savedData === "string" ? (
            <>
              {" "}
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
        <div className="min-h-screen p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-extrabold mb-8 text-center text-fuchsia-950">
              How Can We Help You?
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-slate-400 bg-opacity-20 p-6 rounded-lg backdrop-blur-lg hover:bg-opacity-30 transition duration-300">
                <h2 className="text-2xl font-bold mb-4 text-fuchsia-950">
                  Getting Started
                </h2>
                <p className="mb-4 text-fuchsia-950">
                  Welcome to our platform! Here are some quick steps to get you
                  up and running:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li className="text-fuchsia-950">Create an account</li>
                  <li className="text-fuchsia-950">Set up your profile</li>
                  <li className="text-fuchsia-950">Explore our features</li>
                  <li className="text-fuchsia-950">Connect with others</li>
                </ul>
              </div>

              <div className="bg-slate-400 bg-opacity-20 p-6 rounded-lg backdrop-blur-lg hover:bg-opacity-30 transition duration-300">
                <h2 className="text-2xl font-bold mb-4 text-fuchsia-950">
                  Recently added FAQs
                </h2>
                <ul className="space-y-4">
                  <li>
                    <h3 className="font-semibold text-fuchsia-950">
                      How do I reset my password?
                    </h3>
                    <p className="text-fuchsia-950">
                      Click on the "Forgot Password" link on the login page and
                      follow the instructions sent to your email.
                    </p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-fuchsia-950">
                      Is my data secure?
                    </h3>
                    <p className="text-fuchsia-950">
                      Yes, we use industry-standard encryption to protect your
                      information.
                    </p>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-12 text-center items-center">
              <h2 className="text-3xl font-bold mb-4 text-fuchsia-950">
                Still Need Help?
              </h2>
              <p className="mb-6 text-fuchsia-950">
                Our support team is always here for you.
              </p>

              <a
                href="mailto:support@starkridgepaper.com"
                className="inline-block bg-fuchsia-950 text-white px-8 py-3 rounded-full font-bold hover:bg-opacity-90 transition duration-300 text-center no-underline m-2"
              >
                Mail Support
              </a>
              <a
                href="tel:+919051460600"
                className="inline-block bg-fuchsia-950 text-white px-8 py-3 rounded-full font-bold hover:bg-opacity-90 transition duration-300 text-center no-underline"
              >
                Phone Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
