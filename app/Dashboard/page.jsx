// Dashboard.js
"use client";
import { useState } from "react";
import Image from "next/image";
import Logo from "../components/common/logo";

export default function Dashboard() {
  const menuItems = [
    "Home",
    "Mutual Funds",
    "Direct Stock",
    "PMS",
    "Home Budgeting",
    "Taxed",
    "Tools",
  ];

  const menuItemForHome = ["Dashboard", "Analysis"];

  const [activeIndex, setActiveIndex] = useState(0);
  const [activeIndexSecond, setActiveIndexSecond] = useState(0);

  const handleClick = (index) => {
    setActiveIndex(index);
  };
  const handleClickSecond = (index) => {
    setActiveIndexSecond(index);
  };

  console.log(
    activeIndexSecond,
    activeIndex,
    "activeIndexactiveIndexactiveIndex"
  );
  return (
    <>
      <div className="bg-primary w-full overflow-hidden bg-white min-h-screen ">
        <header className="flex items-center justify-between px-4 md:px-12 lg:px-24 bg-white">
          {/* Left Image */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Search Bar */}
          <div className="flex items-center w-[450px] bg-[#F5F5F5] px-3 rounded-full py-1">
            {/* Search Icon */}
            <div className="mx-2">
              <Image
                src={require("../assets/logo/search.png")} // Replace with your icon path
                alt="Search Icon"
                width={24} // Icon width
                height={24} // Icon height
              />
            </div>

            {/* Search Input */}
            <input
              type="text"
              placeholder="Search for Stocks, Mutual Funds..."
              className="w-full bg-transparent text-gray-600 p-2 focus:outline-none focus:bg-[#F5F5F5]" // Updated focus styles
            />
          </div>

          {/* Right Image Icon */}
          <div className="flex items-center justify-between rounded-lg">
            {/* Left Text */}
            <span className="text-sm font-sans font-normal text-gray-700">
              Welcome Username!
            </span>

            {/* Center Image */}
            <div className="mx-2">
              <Image
                src={require("../assets/logo/User_Icon.png")} // Replace with your icon path
                alt="Search Icon"
                width={24} // Icon width
                height={24} // Icon height
              />
            </div>

            {/* Right Text */}
            <span className="text-sm font-sans font-normal text-gray-700">
              My Account ▼
            </span>
          </div>
        </header>

        <div className="bg-black flex items-center justify-start px-4 overflow-x-auto whitespace-nowrap pl-8 md:pl-16 lg:pl-28">
          {menuItems.map((item, index) => (
            <span
              key={index}
              onClick={() => handleClick(index)}
              className={`cursor-pointer text-white text-lg lg:text-base px-7 py-2 font-semibold font-sans
            ${activeIndex == index ? "bg-[#5E2751]" : ""}`}
            >
              {item}
            </span>
          ))}
        </div>
        {activeIndex === 0 ? (
          <div className="bg-[#F5F5F5] flex items-center justify-start px-4 overflow-x-auto whitespace-nowrap pl-8 md:pl-16 lg:pl-28">
            {menuItemForHome?.map((item, index) => (
              <span
                key={index}
                onClick={() => handleClickSecond(index)}
                className={`cursor-pointer text-[#5E2751] text-lg lg:text-base px-7 py-2 font-semibold font-sans 
          ${
            activeIndexSecond === index
              ? "border-b-2 border-[#5E2751]"
              : "border-b-4 border-transparent"
          }`}
              >
                {item}
              </span>
            ))}
          </div>
        ) : null}

        <span className="flex text-xl md:text-2xl lg:text-3xl font-sans font-medium text-gray-700 pl-8 md:pl-16 lg:pl-28 py-4 md:py-6">
          Dashboard
        </span>

        <div className="flex flex-col md:flex-row w-full justify-between px-4 md:px-28 lg:px-28">
          {/* First div with 70% width on medium and larger screens */}
          <div className="w-full md:w-[70%] flex flex-wrap gap-4 bg-white">
            {/* Card 1 */}
            <div className="relative flex-1 min-w-[160px] max-w-[240px] bg-white border border-[#dedcdc] rounded-lg p-2 h-[100px] sm:h-[110px] md:h-[120px]">
              {/* Row 1 */}
              <div className="flex items-center mb-3">
                <Image
                  src={require("../assets/logo/Bitcoin.png")} // Replace with your icon path
                  alt="Search Icon"
                  width={20} // Icon width
                  height={20} // Icon height
                />
                <p className="text-xs sm:text-sm font-medium text-[#6E7499] ml-1">
                  Current Portfolio
                </p>
              </div>

              {/* Row 2 */}
              <div className="mb-3">
                <p className="text-sm sm:text-base md:text-lg font-semibold text-[#2B2B2B] ml-0 sm:ml-1">
                  $50,435.362
                </p>
              </div>

              {/* Row 3 */}
              <div>
                <p className="text-[10px] sm:text-xs md:text-sm font-medium text-[#24A959] ml-0 sm:ml-1">
                  ↑ 1.7%
                </p>
              </div>
              <Image
                src={require("../assets/logo/Graph.png")} // Replace with the correct image path
                alt="Description"
                className="absolute bottom-2 right-2 z-50"
                width={90} // Set the width you want
                height={60} // Set the height you want
                layout="intrinsic"
              />
              {/* <Image
                src={require("../assets/logo/Graph.png")} // Replace with your image path
                alt="Description"
                width={90}
                height={60}
                layout="intrinsic"
              /> */}
            </div>

            {/* Card 2 */}
            <div className="relative flex-1 min-w-[160px] max-w-[240px] bg-white border border-[#dedcdc] rounded-lg p-2 h-[100px] sm:h-[110px] md:h-[120px]">
              {/* Row 1 */}
              <div className="flex items-center mb-3">
                <Image
                  src={require("../assets/logo/Icon1.png")} // Replace with your icon path
                  alt="Search Icon"
                  width={20} // Icon width
                  height={20} // Icon height
                />
                <p className="text-xs sm:text-sm font-medium text-[#6E7499] ml-1">
                Current Cost
                </p>
              </div>

              {/* Row 2 */}
              <div className="mb-3">
                <p className="text-sm sm:text-base md:text-lg font-semibold text-[#2B2B2B] ml-0 sm:ml-1">
                  $50,435.362
                </p>
              </div>

              {/* Row 3 */}
              <div>
                <p className="text-[10px] sm:text-xs md:text-sm font-medium text-[#24A959] ml-0 sm:ml-1">
                  ↑ 1.7%
                </p>
              </div>
              <Image
                src={require("../assets/logo/Graph1.png")} // Replace with the correct image path
                alt="Description"
                className="absolute bottom-2 right-2 z-50"
                width={90} // Set the width you want
                height={60} // Set the height you want
                layout="intrinsic"
              />
              {/* <Image
                src={require("../assets/logo/Graph.png")} // Replace with your image path
                alt="Description"
                width={90}
                height={60}
                layout="intrinsic"
              /> */}
            </div>

            {/* Card 3 */}
            <div className="relative flex-1 min-w-[160px] max-w-[240px] bg-white border border-[#dedcdc] rounded-lg p-2 h-[100px] sm:h-[110px] md:h-[120px]">
              {/* Row 1 */}
              <div className="flex items-center mb-3">
                <Image
                  src={require("../assets/logo/Icon2.png")} // Replace with your icon path
                  alt="Search Icon"
                  width={20} // Icon width
                  height={20} // Icon height
                />
                <p className="text-xs sm:text-sm font-medium text-[#6E7499] ml-1">
                XIRR
                </p>
              </div>

              {/* Row 2 */}
              <div className="mb-3">
                <p className="text-sm sm:text-base md:text-lg font-semibold text-[#2B2B2B] ml-0 sm:ml-1">
                  $50,435.362
                </p>
              </div>

              {/* Row 3 */}
              <div>
                <p className="text-[10px] sm:text-xs md:text-sm font-medium text-[#24A959] ml-0 sm:ml-1">
                  ↑ 1.7%
                </p>
              </div>
              <Image
                src={require("../assets/logo/Graph2.png")} // Replace with the correct image path
                alt="Description"
                className="absolute bottom-2 right-2 z-50"
                width={90} // Set the width you want
                height={60} // Set the height you want
                layout="intrinsic"
              />
              {/* <Image
                src={require("../assets/logo/Graph.png")} // Replace with your image path
                alt="Description"
                width={90}
                height={60}
                layout="intrinsic"
              /> */}
            </div>
          </div>

          {/* Second div with 20% width on medium and larger screens */}
          <div className="w-full md:w-[20%] bg-green-300 p-4">
            
          </div>
        </div>
      </div>
    </>
  );
}
