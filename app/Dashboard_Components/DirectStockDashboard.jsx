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
        <div className="w-full md:w-[70%] flex flex-wrap justify-between h-auto md:h-52">
          {items.map((item, index) => (
            <GridItem
              key={index}
              imageSrc={
                selectedIndex === index ? item?.imageSrc2 : item?.imageSrc1
              }
              text={item?.text}
              isSelected={selectedIndex === index}
              onClick={() => setSelectedIndex(index)}
            />
          ))}

          <div className="container mx-auto px-4 mt-4">
            <div className="justify-between w-full flex items-center h-10 mb-2">
              {/* First Content */}
              <div className="font-medium text-lg sm:text-xl md:text-2xl text-[#3F4765] font-sans">
                Recent Transactions
              </div>

              {/* Second Content */}
              <div className="flex gap-4">
                <select className="border bg-gray-100 text-gray-700 rounded-3xl px-2 py-1 text-xs sm:text-xs lg:text-xs  focus:outline-none focus:ring-2 focus:ring-fuchsia-700">
                  <option className="bg-white text-black">USD</option>
                  <option className="bg-white text-black">USD</option>
                  <option className="bg-white text-black">USD</option>
                </select>

                <select className="border bg-gray-100 text-gray-700 rounded-3xl px-2 py-1 text-xs sm:text-xs lg:text-xs  focus:outline-none focus:ring-2 focus:ring-fuchsia-700">
                  <option className="bg-white text-black">24 Hours</option>
                  <option className="bg-white text-black">24 Hours</option>
                  <option className="bg-white text-black">24 Hours</option>
                </select>

                <div className="border bg-gray-100 text-gray-700 rounded-3xl text-xs sm:text-sm lg:text-base px-4 py-2 focus:outline-none focus:ring-2 focus:ring-fuchsia-700 hover:bg-gray-200 flex justify-center items-center cursor-pointer">
                  See All
                </div>
              </div>
            </div>
            {/* Table Header */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 text-left p-3 bg-[#F5F5F5] rounded-lg">
              <div className="text-xs sm:text-xs md:text-xs font-normal leading-6 text-left text-[#848CA9] ">
                {/* Added padding-right */}
                CURRENCY NAME
              </div>
              <div className="text-xs sm:text-xs md:text-xs font-normal leading-6 text-left text-[#848CA9] ml-4">
                {/* Added padding-right */}
                PRICE
              </div>
              <div className="text-xs sm:text-xs md:text-xs font-normal leading-6 text-left text-[#848CA9]">
                CAGR/MONTH
              </div>
              <div className="hidden md:block text-xs sm:text-xs md:text-xs font-normal leading-6 text-left text-[#848CA9]">
                STATISTIC
              </div>
              <div className="hidden md:block text-xs sm:text-xs md:text-xs font-normal leading-6 text-left text-[#848CA9]">
                EXCHANGE
              </div>
            </div>

            {/* Table Body */}
            {tableData.map((row, index) => (
              <div
                key={index}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 bg-[#F5F5F5] text-left p-2 my-2 justify-center items-center rounded-lg mt-4"
              >
                <div className="flex items-center space-x-4">
                  <Image
                    src={row?.coin}
                    alt="Currency Image"
                    width={32}
                    height={32}
                    className="h-8 w-8"
                  />
                  <div className="font-poppins text-base sm:text-sm md:text-base font-medium leading-6 text-left text-[#3F4765]">
                    {row.currency}
                  </div>
                </div>
                <div className="font-poppins text-base sm:text-sm md:text-base font-medium leading-6 text-left text-[#3F4765] pl-4">
                  {/* Added padding to price column */}
                  {row.price}
                </div>
                <div className="font-poppins text-base sm:text-sm md:text-base font-medium leading-6 text-left text-[#3F4765]">
                  {row.cagr}
                </div>
                <div className="hidden md:flex items-center">
                  <Image
                    src={row.statistic}
                    alt="Statistic"
                    width={60}
                    height={20}
                    className="h-auto w-auto max-w-full"
                  />
                </div>
                <button className="hidden md:block text-[#35B26B] border border-[#35B26B] rounded-md px-3 py-1 hover:bg-[#e8f5eb] text-sm">
                  Transfer now
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Second div with 20% width on medium and larger screens */}
        <div className="w-full md:w-[27%] bg-[#f5F5F5F5] p-1 sm:p-2">
          <div className="flex items-center space-x-4 justify-between">
            <div className="font-sans text-lg sm:text-base md:text-lg font-medium leading-5 text-left text-[#3F4765]">
              My Balance
            </div>
            {/* <div className="flex items-center justify-center bg-white rounded-full h-8 w-8 sm:h-10 sm:w-10">
              <Image
                src={require("../assets/logo/IconPlus.png")}
                alt="Centered Image"
                width={20}
                height={20}
                className="h-5 w-5"
              />
            </div> */}
          </div>

          <div className="flex flex-col sm:flex-row justify-between space-x-0 sm:space-x-4 mt-3">
            {/* <!-- First Card --> */}
            <div className="relative bg-[#60BC63] rounded-lg p-1 sm:p-2 w-full sm:w-[48%] h-auto">
              {/* <!-- First Two Text Elements in Column --> */}
              <div className="flex flex-col space-y-2">
                <div className="text-white font-semibold text-base sm:text-sm md:text-base">
                  {`Today's Gain`}
                </div>
                <div className="text-white font-semibold text-base sm:text-sm md:text-base">
                  Gain
                </div>
              </div>

              {/* <!-- Dashed Border --> */}
              <div className="border-t border-dashed border-white my-4"></div>

              {/* <!-- Third Text and Image in Column --> */}
              <div className="flex flex-col space-y-2">
                <div className="text-white font-semibold text-base sm:text-sm md:text-base">
                  ₹80,435.712
                </div>
                <div className="w-6 h-6 sm:w-8 sm:h-8">
                  <Image
                    src={require("../assets/logo/Credit_Card_green.png")}
                    alt="Card Image"
                    width={24}
                    height={24}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* <!-- Absolute Image at Bottom Right --> */}
              <div className="absolute bottom-0 right-0 w-15 h-8 sm:w-10 sm:h-10">
                <Image
                  src={require("../assets/logo/Highlight_green.png")}
                  alt="Value Image"
                  width={100}
                  height={100}
                  objectFit="contain"
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* <!-- Second Card --> */}
            <div className="relative bg-[#FFBA33] rounded-lg p-1 sm:p-2 w-full sm:w-[48%] h-auto">
              {/* <!-- First Two Text Elements in Column --> */}
              <div className="flex flex-col space-y-2">
                <div className="text-white font-semibold text-base sm:text-sm md:text-base">
                  {`Today's`}
                </div>
                <div className="text-white font-semibold text-base sm:text-sm md:text-base">
                  Expenses
                </div>
              </div>

              {/* <!-- Dashed Border --> */}
              <div className="border-t border-dashed border-white my-4"></div>

              {/* <!-- Third Text and Image in Column --> */}
              <div className="flex flex-col space-y-2">
                <div className="text-white font-semibold text-base sm:text-sm md:text-base">
                  ₹1.84333767
                </div>
                <div className="w-6 h-6 sm:w-8 sm:h-8">
                  <Image
                    src={require("../assets/logo/Credit_Card_yellow.png")}
                    alt="Card Image"
                    width={24}
                    height={24}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* <!-- Absolute Image at Bottom Right --> */}
              <div className="absolute bottom-0 right-0 w-15 h-8 sm:w-10 sm:h-10">
                <Image
                  src={require("../assets/logo/Highlight_yellow.png")}
                  alt="Value Image"
                  width={100}
                  height={100}
                  objectFit="contain"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4 justify-between mt-2">
            <div className="font-sans text-lg sm:text-base md:text-lg font-medium leading-5 text-left text-[#3F4765]">
              Activities
            </div>
            <div className="font-sans text-sm sm:text-base md:text-sm font-medium leading-5 text-left text-[#969CCB]">
              {`Today  ▼`}
            </div>
          </div>

          <div className="flex justify-between items-start space-y-4 md:space-y-0 flex-row mt-2">
            {/* First Section: Image and Text in one row */}
            <div className="flex items-center space-x-4">
              <Image
                src={require("../assets/logo/Activity.png")}
                alt="Currency Image"
                width={46}
                height={46}
              />
              <div className="flex flex-col space-y-2">
                <p className="text-xs font-semibold text-[#3F4765] ">
                  Activities Name
                </p>
                <p className="text-sm font-normal text-[#3F4765]">Sell </p>
              </div>
            </div>

            {/* Second Section: Two text elements column-wise */}
            <div className="flex flex-col space-y-2">
              <p className="text-sm font-semibold text-[#F85842] text-end">
                ₹2,435.80
              </p>
              <p className="text-xs font-normal text-[#3F4765] text-end">
                Today | 16.40
              </p>
            </div>
          </div>

          <div className="flex justify-between items-start space-y-4 md:space-y-0 flex-row mt-4">
            {/* First Section: Image and Text in one row */}
            <div className="flex items-center space-x-4">
              <Image
                src={require("../assets/logo/Logo_B.png")}
                alt="Currency Image"
                width={46}
                height={46}
              />
              <div className="flex flex-col space-y-2">
                <p className="text-xs font-semibold text-[#3F4765] ">
                  Activities Name
                </p>
                <p className="text-sm font-normal text-[#3F4765]">Buy </p>
              </div>
            </div>

            {/* Second Section: Two text elements column-wise */}
            <div className="flex flex-col space-y-2">
              <p className="text-sm font-semibold text-[#24A959] text-end">
                ₹1,435.72
              </p>
              <p className="text-xs font-normal text-[#3F4765] text-end">
                Today | 16.40
              </p>
            </div>
          </div>
          <div className="flex justify-between items-start space-y-4 md:space-y-0 flex-row mt-4">
            {/* First Section: Image and Text in one row */}
            <div className="flex items-center space-x-4">
              <Image
                src={require("../assets/logo/Logo_A.png")}
                alt="Currency Image"
                width={46}
                height={46}
              />
              <div className="flex flex-col space-y-2">
                <p className="text-xs font-semibold text-[#3F4765] ">
                  Activities Name
                </p>
                <p className="text-sm font-normal text-[#3F4765]">Buy</p>
              </div>
            </div>

            {/* Second Section: Two text elements column-wise */}
            <div className="flex flex-col space-y-2">
              <p className="text-sm font-semibold text-[#24A959] text-end">
                ₹1,435.72
              </p>
              <p className="text-xs font-normal text-[#3F4765] text-end">
                Today | 16.40
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4 justify-between mt-6">
            <div className="font-sans text-lg sm:text-base md:text-lg font-medium leading-5 text-left text-[#3F4765]">
              News
            </div>
            <div className="font-sans text-sm sm:text-base md:text-sm font-medium leading-5 text-left text-[#969CCB]">
              See All
            </div>
          </div>
          {tableData?.map((item) => {
            return (
              <div
                key={item}
                className="flex justify-between items-start space-y-4 md:space-y-0 flex-row mt-4"
              >
                {/* First Section: Image and Text in one row */}
                <div className="flex items-center space-x-4 w-[70%]">
                  <div className="flex flex-col">
                    <p className="text-sm font-medium text-[#3F4765] ">
                      Bitcoin, Ethereum, Crypto News and Price Data
                    </p>
                    <p className="text-xs font-light text-[#A2A9C7]">
                      News Media 1h ago
                    </p>
                  </div>
                </div>

                {/* Second Section: Two text elements column-wise */}
                <div className="flex flex-col  h-10 w-10 bg-[#C4C4C4] border border-gray-300 rounded-md md:h-16 md:w-16"></div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
