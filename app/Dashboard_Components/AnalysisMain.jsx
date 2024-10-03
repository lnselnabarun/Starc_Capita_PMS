// Dashboard.js
"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Chart } from "react-google-charts";

export default function AnalysisMain() {
  
  const google_charts_data = [
    ["Task", "Hours per Day"],
    ["Equity", 13],
    ["Debt", 5],
    ["Others", 2],
  ];
  const google_charts_data1 = [
    ["Task", "Hours per Day"],
    ["Large Cap", 15],
    ["Mid Cap", 5],
    ["Small Cap", 3],
    ["Others", 1.5],
  ];
  const options = {
    title: "",
    is3D: true,
    slices: {
      0: { color: "#969CCB" }, // Red for Work
      1: { color: "#EA4335" }, // Blue for Eat
      2: { color: "#FF8933" }, // Yellow for Commute
    },
  };
  const options1 = {
    title: "",
    is3D: true,
    slices: {
      0: { color: "#969CCB" }, // Red for Work
      1: { color: "#EA4335" }, // Blue for Eat
      2: { color: "#FF8933" }, // Yellow for Commute
      3: { color: "#60BC63" }, // Yellow for Commute
    },
  };
  
  const data = [
    {
      name: "JAN",
      uv: 4000,
      pv: 2400,
      tv: 3200,
      wv: 1500,
      xv: 2800,
      yv: 3300,
      zv: 4100,
    },
    {
      name: "FEB",
      uv: 3000,
      pv: 1398,
      tv: 2100,
      wv: 2300,
      xv: 2100,
      yv: 2500,
      zv: 3700,
    },
    {
      name: "MAR",
      uv: 2000,
      pv: 9800,
      tv: 2900,
      wv: 2400,
      xv: 3200,
      yv: 4000,
      zv: 4500,
    },
    {
      name: "APR",
      uv: 2780,
      pv: 3908,
      tv: 3500,
      wv: 2600,
      xv: 3000,
      yv: 2900,
      zv: 3800,
    },
    {
      name: "MAY",
      uv: 7090,
      pv: 4800,
      tv: 4700,
      wv: 3100,
      xv: 4100,
      yv: 5000,
      zv: 5300,
    },
    {
      name: "JUN",
      uv: 2390,
      pv: 3800,
      tv: 3600,
      wv: 2200,
      xv: 2700,
      yv: 3400,
      zv: 4100,
    },
    {
      name: "JUL",
      uv: 3490,
      pv: 4300,
      tv: 3900,
      wv: 2500,
      xv: 3000,
      yv: 3700,
      zv: 4200,
    },
  ];
  const [activeButton, setActiveButton] = useState("capture");
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
  
  return (
    <>
      <div className="flex flex-col md:flex-row w-full justify-between px-4 sm:px-6 lg:px-28">
            {/* First div with 70% width on medium and larger screens */}
            <div className="w-full md:w-[70%] flex flex-wrap gap-4 justify-between">
              <div className="w-full md:w-[100%] flex flex-wrap gap-4 justify-between">
                {/* Card 1 */}
                <div className="relative flex-1 w-1/2 bg-white border border-[#D9D9D9] rounded-xl p-4 z-10">
                  {/* Header Section */}
                  <div className="flex justify-between items-center p-4">
                    <h1 className="text-base font-medium text-[#3F4765]">
                      Portfolio Asset Allocation
                    </h1>
                    <Image
                      src={require("../assets/logo/Icon_Arrow_Right.png")}
                      alt="icon"
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                  </div>

                  <div className="border-b  border-[#D9D9D9] h-1"></div>

                  {/* Image Section */}
                  <div className="pt-4">
                    <Chart
                      chartType="PieChart"
                      data={google_charts_data}
                      options={options}
                      width={"100%"}
                      height={"200px"}
                    />
                  </div>
                </div>

                {/* Card 2 */}
                <div className="relative flex-1 w-1/2 bg-white border border-[#D9D9D9] rounded-xl p-4 z-10">
                  {/* Header Section */}
                  <div className="flex justify-between items-center p-4">
                    <h1 className="text-base font-medium text-[#3F4765]">
                      Portfolio Asset Allocation
                    </h1>
                    <Image
                      src={require("../assets/logo/Icon_Arrow_Right.png")}
                      alt="icon"
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                  </div>

                  <div className="border-b  border-[#D9D9D9] h-1"></div>

                  {/* Image Section */}
                  <div className="pt-4">
                    <Chart
                      chartType="PieChart"
                      data={google_charts_data1}
                      options={options1}
                      width={"100%"}
                      height={"200px"}
                    />
                  </div>
                </div>

                {/* {chart section} */}
                <div className="w-full flex flex-wrap gap-4 h-auto p-4 rounded-lg border-[1.5px] border-[#D9D9D9] ">
                  {/* First Content: Bold Text */}
                  <div className="justify-between w-full flex flex-wrap gap-4 h-auto">
                    <div className="flex flex-col items-start space-y-2">
                      <div className="font-medium text-lg sm:text-xl md:text-2xl text-[#3F4765] font-sans">
                        Portfolio Risk Ratios
                      </div>
                    </div>

                    {/* Second Content: Four Pressable Divs */}
                    <div className="flex space-x-4">
                      {/* Capture Ratio Button */}
                      <button
                        onClick={() => setActiveButton("capture")}
                        className={` text-[#9FA8C7] px-4 rounded-2xl border text-sm ${
                          activeButton === "capture"
                            ? "bg-[#ECEFF9] border-[#E5EBEF]"
                            : " border-[#E5EBEF]"
                        }`}
                      >
                        Capture Ratio
                      </button>

                      {/* Risk Ratio Button */}
                      <button
                        onClick={() => setActiveButton("risk")}
                        className={` text-[#9FA8C7] px-4 rounded-2xl border text-sm ${
                          activeButton === "risk"
                            ? "bg-[#ECEFF9] border-[#E5EBEF]"
                            : " border-[#E5EBEF]"
                        }`}
                      >
                        Risk Ratio
                      </button>
                    </div>
                  </div>
                  <div className="w-full h-48 sm:h-64 md:h-80 lg:h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={data}
                        margin={{
                          top: 5,
                          right: 10,
                          left: 5,
                          bottom: 10,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />

                        <Line
                          type="monotone"
                          dataKey="tv"
                          stroke="#FF5733"
                          activeDot={{ r: 8 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="wv"
                          stroke="#33FF57"
                          activeDot={{ r: 8 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="xv"
                          stroke="#3357FF"
                          activeDot={{ r: 8 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="yv"
                          stroke="#FF33C1"
                          activeDot={{ r: 8 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="zv"
                          stroke="#FFC733"
                          activeDot={{ r: 8 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-[100%] flex flex-wrap gap-4 justify-between mb-5">
                {/* Card 1 */}
                <div className="relative flex-1 w-1/2 bg-white border border-[#D9D9D9] rounded-xl p-4 z-10">
                  {/* Header Section */}
                  <div className="flex justify-between items-center p-4">
                    <h1 className="text-base font-medium text-[#3F4765]">
                      Portfolio Asset Allocation
                    </h1>
                    <Image
                      src={require("../assets/logo/Icon_Arrow_Right.png")}
                      alt="icon"
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                  </div>

                  <div className="border-b  border-[#D9D9D9] h-1"></div>

                  {/* Image Section */}
                  <div className="pt-4">
                    <Chart
                      chartType="PieChart"
                      data={google_charts_data}
                      options={options}
                      width={"100%"}
                      height={"200px"}
                    />
                  </div>
                </div>

                {/* Card 2 */}
                <div className="relative flex-1 w-1/2 bg-white border border-[#D9D9D9] rounded-xl p-4 z-10">
                  {/* Header Section */}
                  <div className="flex justify-between items-center p-4">
                    <h1 className="text-base font-medium text-[#3F4765]">
                      Portfolio Asset Allocation
                    </h1>
                    <Image
                      src={require("../assets/logo/Icon_Arrow_Right.png")}
                      alt="icon"
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                  </div>

                  <div className="border-b  border-[#D9D9D9] h-1"></div>

                  {/* Image Section */}
                  <div className="pt-4">
                    <Chart
                      chartType="PieChart"
                      data={google_charts_data1}
                      options={options1}
                      width={"100%"}
                      height={"200px"}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Second div with 20% width on medium and larger screens */}
            <div className="w-full md:w-[27%] bg-[#f5F5F5F5] p-1 sm:p-2">
              <div className="flex items-center space-x-4 justify-between">
                <div className="font-sans text-lg sm:text-base md:text-lg font-medium leading-5 text-left text-[#3F4765]">
                  My Balance
                </div>
                <div className="flex items-center justify-center bg-white rounded-full h-8 w-8 sm:h-10 sm:w-10">
                  <Image
                    src={require("../assets/logo/IconPlus.png")}
                    alt="Centered Image"
                    width={20}
                    height={20}
                    className="h-5 w-5"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between space-x-0 sm:space-x-4 mt-3">
                {/* <!-- First Card --> */}
                <div className="relative bg-[#60BC63] rounded-lg p-1 sm:p-2 w-full sm:w-[48%] h-auto">
                  {/* <!-- First Two Text Elements in Column --> */}
                  <div className="flex flex-col space-y-2">
                    <div className="text-white font-semibold text-base sm:text-sm md:text-base">
                      US Dollar
                    </div>
                    <div className="text-white font-semibold text-base sm:text-sm md:text-base">
                      80,435.712
                    </div>
                  </div>

                  {/* <!-- Dashed Border --> */}
                  <div className="border-t border-dashed border-white my-4"></div>

                  {/* <!-- Third Text and Image in Column --> */}
                  <div className="flex flex-col space-y-2">
                    <div className="text-white font-semibold text-base sm:text-sm md:text-base">
                      {`₹ 0,0014`}
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
                      Bitcoin
                    </div>
                    <div className="text-white font-semibold text-base sm:text-sm md:text-base">
                      1.84333767
                    </div>
                  </div>

                  {/* <!-- Dashed Border --> */}
                  <div className="border-t border-dashed border-white my-4"></div>

                  {/* <!-- Third Text and Image in Column --> */}
                  <div className="flex flex-col space-y-2">
                    <div className="text-white font-semibold text-base sm:text-sm md:text-base">
                      {`₹ 109106,60`}
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

              <div className="flex space-x-4 mt-4">
                <div className="w-1/2">
                  <Image
                    src={require("../assets/logo/Withdraw.png")} // replace with your image path
                    alt="Image 1"
                    width={500} // adjust the width as needed
                    height={300} // adjust the height as needed
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="w-1/2 ">
                  <Image
                    src={require("../assets/logo/Deposit.png")} // replace with your image path
                    alt="Image 2"
                    width={500} // adjust the width as needed
                    height={300} // adjust the height as needed
                    className="w-full h-auto object-cover"
                  />
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
                    src={require("../assets/logo/Logo_Bit.png")}
                    alt="Currency Image"
                    width={46}
                    height={46}
                  />
                  <div className="flex flex-col space-y-2">
                    <p className="text-xs font-semibold text-[#3F4765] ">
                      Bitcoin{" "}
                    </p>
                    <p className="text-sm font-normal text-[#3F4765]">Sell </p>
                  </div>
                </div>

                {/* Second Section: Two text elements column-wise */}
                <div className="flex flex-col space-y-2">
                  <p className="text-sm font-semibold text-[#F85842] text-end">
                  ₹2,435.80{" "}
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
                      Ethereum{" "}
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
                      Algorand{" "}
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
