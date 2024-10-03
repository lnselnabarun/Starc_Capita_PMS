// Dashboard.js
"use client";
import React, { useState } from "react";
import Image from "next/image";
import Logo from "../components/common/logo";
import Link from "next/link";
import DashboardMain from "../Dashboard_Components/DashboardMain";
import AnalysisMain from "../Dashboard_Components/AnalysisMain";
import CombinedMutualFund from "../Dashboard_Components/CombinedMutualFund";
import EquityMutualFund from "../Dashboard_Components/EquityMutualFund";
import HybridMutualFund from "../Dashboard_Components/HybridMutualFund";
import DirectStockDashboard from "../Dashboard_Components/DirectStockDashboard";

export default function Dashboard() {

  const menuItems = [
    "Home",
    "Mutual Funds",
    "Direct Stock",
    "Home Budgeting",
    "Taxed",
    "Tools",
    "Other",
  ];

  const menuItemForHome = ["Dashboard", "Analysis"];
  const menuItemForMutualFunds = [
    "Combined",
    "Equity",
    "Hybrid",
    "Debt",
    "AMC",
    "Comparison",
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [activeIndexSecond, setActiveIndexSecond] = useState(0);

  const handleClick = (index) => {
    setActiveIndex(index);
    setActiveIndexSecond(0);
  };
  const handleClickSecond = (index) => {
    setActiveIndexSecond(index);
  };
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
        </header>

        <div className="bg-black flex items-center justify-start px-4 overflow-x-auto whitespace-nowrap pl-8 md:pl-16 lg:pl-28">
          {menuItems.map((item, index) => (
            <span
              key={index}
              onClick={() => handleClick(index)}
              className={`cursor-pointer text-white text-lg lg:text-base px-7 py-2 font-semibold font-sans
            ${activeIndex == index ? "bg-[#5E2751]" : ""}`}
            >
              {`${item === "Other" ? "Other    ▼ " : item}`}
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
        {activeIndex === 1 ? (
          <div className="bg-[#F5F5F5] flex items-center justify-start px-4 overflow-x-auto whitespace-nowrap pl-8 md:pl-16 lg:pl-28">
            {menuItemForMutualFunds?.map((item, index) => (
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
        {activeIndex === 0 && activeIndexSecond === 0 ? (
          <span className="flex text-xl md:text-2xl lg:text-3xl font-sans font-medium text-gray-700 pl-8 md:pl-16 lg:pl-28 py-4 md:py-6">
            Dashboard
          </span>
        ) : null}
        {activeIndex === 0 && activeIndexSecond === 1 ? (
          <span className="flex text-xl md:text-2xl lg:text-3xl font-sans font-medium text-gray-700 pl-8 md:pl-16 lg:pl-28 py-4 md:py-6">
            Analysis
          </span>
        ) : null}
        {activeIndex === 1 && activeIndexSecond === 0 ? (
          <span className="flex text-xl md:text-2xl lg:text-3xl font-sans font-medium text-gray-700 pl-8 md:pl-16 lg:pl-28 py-4 md:py-6">
            Combined
          </span>
        ) : null}
        {activeIndex === 1 && activeIndexSecond === 1 ? (
          <span className="flex text-xl md:text-2xl lg:text-3xl font-sans font-medium text-gray-700 pl-8 md:pl-16 lg:pl-28 py-4 md:py-6">
            Equity
          </span>
        ) : null}
        {activeIndex === 1 && activeIndexSecond === 2 ? (
          <span className="flex text-xl md:text-2xl lg:text-3xl font-sans font-medium text-gray-700 pl-8 md:pl-16 lg:pl-28 py-4 md:py-6">
            Hybrid
          </span>
        ) : null}
        {activeIndex === 1 && activeIndexSecond === 3 ? (
          <span className="flex text-xl md:text-2xl lg:text-3xl font-sans font-medium text-gray-700 pl-8 md:pl-16 lg:pl-28 py-4 md:py-6">
            Debt
          </span>
        ) : null}

        {activeIndex === 1 && activeIndexSecond === 4 ? (
          <span className="flex text-xl md:text-2xl lg:text-3xl font-sans font-medium text-gray-700 pl-8 md:pl-16 lg:pl-28 py-4 md:py-6">
            AMC
          </span>
        ) : null}
        {activeIndex === 1 && activeIndexSecond === 5 ? (
          <span className="flex text-xl md:text-2xl lg:text-3xl font-sans font-medium text-gray-700 pl-8 md:pl-16 lg:pl-28 py-4 md:py-6">
            Comparison
          </span>
        ) : null}
        {activeIndex === 2 ? (
          <span className="flex text-xl md:text-2xl lg:text-3xl font-sans font-medium text-gray-700 pl-8 md:pl-16 lg:pl-28 py-4 md:py-6">
            Direct Stock
          </span>
        ) : null}

        {activeIndex === 0 && activeIndexSecond === 0 ? (
          <DashboardMain />
        ) : null}

        {activeIndex === 0 && activeIndexSecond === 1 ? <AnalysisMain /> : null}

        {activeIndex === 1 && activeIndexSecond === 0 ? (
          <CombinedMutualFund />
        ) : null}

        {activeIndex === 1 && activeIndexSecond === 1 ? (
          <EquityMutualFund />
        ) : null}

        {activeIndex === 1 && activeIndexSecond === 2 ? (
          <HybridMutualFund />
        ) : null}

        {activeIndex === 2 ? <DirectStockDashboard /> : null}
      </div>
    </>
  );
}
