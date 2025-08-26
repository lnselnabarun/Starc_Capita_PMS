// Dashboard.js

"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Logo from "../components/common/logo";
import Link from "next/link";
import DashboardMain from "../Dashboard_Components/DashboardMain";
import AnalysisMain from "../Dashboard_Components/AnalysisMain";
import CombinedMutualFund from "../Dashboard_Components/CombinedMutualFund";
import EquityMutualFund from "../Dashboard_Components/EquityMutualFund";
import HybridMutualFund from "../Dashboard_Components/HybridMutualFund";
import DirectStockDashboard from "../Dashboard_Components/DirectStockDashboard";
import IntrinsicCalculation from "../Dashboard_Components/IntrinsicCalculation"
import Compare_Mutual_Fund from "../Dashboard_Components/Compare_Mutual_Fund";
import DebtMutualFund from "../Dashboard_Components/DebtMutualFund";
import AMCGrid from "../Dashboard_Components/AMCGrid";
import { Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";


export default function Dashboard() {
  const route = useRouter();
  const menuItems = [
    "Home",
    "Mutual Funds",
    "Direct Stock",
    "Home Budgeting",
    "Taxes",
    "Tools",
    "Other",
  ];

  const menuItemForHome = ["Dashboard", "Analysis"];
  const menuItemForMutualFunds = [
    "Combined",
    "Equity",
    "Hybrid",
    "Debt",
    "Comparison",
    "AMC",
  ];
  const menuItemForDrectStock = ["Summary", "Intrinsic Calculation"];
  // Add state for upload popup
  const [showUploadOptions, setShowUploadOptions] = useState(false);

  // Initialize state from localStorage or default to 0
  const [activeIndex, setActiveIndex] = useState(() => {
    // This runs only on client-side during initial render
    if (typeof window === "undefined") return 0;

    const savedIndex = localStorage.getItem("dashboardActiveIndex");
    return savedIndex !== null ? parseInt(savedIndex, 10) : 0;
  });

  const [activeIndexSecond, setActiveIndexSecond] = useState(() => {
    // This runs only on client-side during initial render
    if (typeof window === "undefined") return 0;

    const savedIndex = localStorage.getItem("dashboardActiveIndexSecond");
    return savedIndex !== null ? parseInt(savedIndex, 10) : 0;
  });

  // Update localStorage whenever state changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("dashboardActiveIndex", activeIndex.toString());
    }
  }, [activeIndex]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "dashboardActiveIndexSecond",
        activeIndexSecond.toString()
      );
    }
  }, [activeIndexSecond]);

  const handleClick = (index) => {
    setActiveIndex(index);
    setActiveIndexSecond(0); // Reset secondary menu when primary menu changes
  };

  const handleClickSecond = (index) => {
    setActiveIndexSecond(index);
  };

  // Updated UploadButton component
  const UploadButton = () => {
    const handleUploadMutualFund = () => {
      route.push("/UploadPdf");
      setShowUploadOptions(false);
    };

    const handleUploadStockData = () => {
      // TODO: Add your stock data upload page route here
      route.push("/UploadStockData"); // Replace with your actual route
      setShowUploadOptions(false);
    };

    const toggleUploadOptions = () => {
      setShowUploadOptions(!showUploadOptions);
    };

    return (
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-12 lg:bottom-12 lg:right-24 z-50 flex flex-col items-center">
        {/* Upload Options Popup */}
        {showUploadOptions && (
          <div className="mb-4 bg-white rounded-lg shadow-lg border border-gray-200 p-4 min-w-48">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-semibold text-[#5E2751] px-3 py-2 ">
                Upload Options
              </h3>
              {/* <button
                onClick={() => setShowUploadOptions(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4 color=#3e9392" />
              </button> */}
            </div>

            <div className="space-y-2">
              <button
                onClick={handleUploadMutualFund}
                className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200 font-semibold"
              >
                Upload Mutual Fund CAMS Pdf
              </button>

              <button
                onClick={handleUploadStockData}
                className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200 font-semibold"
              >
                Upload Stock Pdf
              </button>
            </div>
          </div>
        )}

        {/* Main Upload Button */}
        <div
          onClick={toggleUploadOptions}
          className="flex flex-col items-center cursor-pointer"
        >
          <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-[#5E2751] hover:bg-[#4a1f40] text-white rounded-full shadow-lg transition-all duration-200 hover:shadow-xl">
            <Plus
              className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 transition-transform duration-200 ${
                showUploadOptions ? "rotate-45" : ""
              }`}
            />
          </div>
          <span className="text-xs sm:text-sm font-sans font-bold text-gray-700 mt-2 text-center">
            {showUploadOptions ? "Cancel" : "Upload PDF"}
          </span>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="bg-primary w-full overflow-hidden bg-white min-h-screen ">
        <header className="flex items-center justify-between px-4 md:px-12 lg:px-24 bg-white">
          {/* Left Image */}
          <div className="flex-shrink-0">
            <Logo />
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
              <span className="text-sm font-sans font-medium text-gray-700 ">
                My Profile
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

        {activeIndex === 2 ? (
          <div className="bg-[#F5F5F5] flex items-center justify-start px-4 overflow-x-auto whitespace-nowrap pl-8 md:pl-16 lg:pl-28">
            {menuItemForDrectStock?.map((item, index) => (
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

        {/* {activeIndex === 1 && activeIndexSecond === 5 ? (
          <span className="flex text-xl md:text-2xl lg:text-3xl font-sans font-medium text-gray-700 pl-8 md:pl-16 lg:pl-28 py-4 md:py-6">
            Asset Management Company (AMC)
          </span>
        ) : null} */}

        {activeIndex === 2 && activeIndexSecond === 0 ? (
          <span className="flex text-xl md:text-2xl lg:text-3xl font-sans font-medium text-gray-700 pl-8 md:pl-16 lg:pl-28 py-4 md:py-6 bg-gray-50">
            Stock Summary
          </span>
        ) : null}
        {/* {activeIndex === 2 && activeIndexSecond === 1 ? (
          <span className="flex text-xl md:text-2xl lg:text-3xl font-sans font-medium text-gray-700 pl-8 md:pl-16 lg:pl-28 py-4 md:py-6">
            Intrinsic Calculation
          </span>
        ) : null} */}

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
        {activeIndex === 1 && activeIndexSecond === 3 ? (
          <DebtMutualFund />
        ) : null}
        {activeIndex === 1 && activeIndexSecond === 4 ? (
          <Compare_Mutual_Fund />
        ) : null}
        {activeIndex === 1 && activeIndexSecond === 5 ? <AMCGrid /> : null}
        {activeIndex === 2 && activeIndexSecond === 0  ? <DirectStockDashboard /> : null}
        {activeIndex === 2 && activeIndexSecond === 1  ? <IntrinsicCalculation /> : null}
         
      </div>

      <div className="bg-primary w-full overflow-hidden bg-white min-h-screen ">
        <UploadButton />
      </div>
    </>
  );
}
