// Dashboard.js
"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function DirectStockDashboard() {
  const tableData = [
    {
      currency: "Bitcoin / BTC",
      price: "₹50,000",
      cagr: "2%",
      statistic: require("../assets/logo/Graph.png"),
      exchange: "Binance",
      coin: require("../assets/logo/Bitcoin.png"),
    },
    {
      currency: "Ethereum / ETH",
      price: "₹4,000",
      cagr: "3%",
      statistic: require("../assets/logo/Graph1.png"),
      exchange: "Coinbase",
      coin: require("../assets/logo/Icon1.png"),
    },
    {
      currency: "Algorand / ALG",
      price: "₹1.50",
      cagr: "1.5%",
      statistic: require("../assets/logo/Graph2.png"),
      exchange: "Kraken",
      coin: require("../assets/logo/Icon2.png"),
    },
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const items = [
    {
      imageSrc1: require("../assets/logo/dashicons_portfolio.png"),
      text: "Portfolio Asset Allocation",
      imageSrc2: require("../assets/logo/dashicons_portfolio_White.png"),
    },
    {
      imageSrc1: require("../assets/logo/dashicons_portfolio.png"),
      text: "Portfolio Market Cap Distribution",
      imageSrc2: require("../assets/logo/dashicons_portfolio_White.png"),
    },
    {
      imageSrc1: require("../assets/logo/dashicons_portfolio.png"),
      text: "Category Distribution",
      imageSrc2: require("../assets/logo/dashicons_portfolio_White.png"),
    },
    {
      imageSrc1: require("../assets/logo/dashicons_portfolio.png"),
      text: "AMC Distribution",
      imageSrc2: require("../assets/logo/dashicons_portfolio_White.png"),
    },
  ];

  const GridItem = ({ imageSrc, text, isSelected, onClick }) => (
    <div
      className={`w-full sm:w-[48%] md:w-[23%] h-[160px] flex flex-col items-center justify-center cursor-pointer transition-colors duration-300 border rounded-xl px-3  ${
        isSelected ? "bg-[#5E2751]" : "bg-white"
      }`}
      onClick={onClick}
    >
      <Image src={imageSrc} alt={text} width={50} height={50} />
      <p
        className={` text-base font-medium mt-2 text-center ${
          isSelected ? "text-white" : "text-[#5E2751]"
        }`}
      >
        {text}
      </p>
    </div>
  );
  return (
    <>
      <div className="flex flex-col md:flex-row w-full justify-between px-4 sm:px-6 lg:px-28">
        {/* First div with 70% width on medium and larger screens */}
        
      </div>
    </>
  );
}
