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

export default function HybridMutualFund() {
  
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
  
  const headers = [
    "Name",
    "Category",
    "Date of Investment",
    "Current Cost",
    "Current XIRR",
    "AUM (in Rs.)",
    "Expense Ratio",
    "Statistic",
    "Action",
  ];
  const dummyData = [
    {
      name: "Canara Robeco ",
      category: "Equity - Large Cap",
      dateOfInvestment: "2023-01-15",
      currentCost: "5,000.00",
      currentXIRR: "12.5%",
      aum: "5,080.88",
      expenseRatio: "1.5%",
      statistic: require("../assets/logo/Graph.png"),
    },
    {
      name: "Canara Robeco ",
      category: "Equity - Large Cap",
      dateOfInvestment: "2023-01-15",
      currentCost: "5,000.00",
      currentXIRR: "12.5%",
      aum: "5,080.88",
      expenseRatio: "1.5%",
      statistic: require("../assets/logo/Graph.png"),
    },
    {
      name: "Canara Robeco ",
      category: "Equity - Large Cap",
      dateOfInvestment: "2023-01-15",
      currentCost: "5,000.00",
      currentXIRR: "12.5%",
      aum: "5,080.88",
      expenseRatio: "1.5%",
      statistic: require("../assets/logo/Graph.png"),
    },
    {
      name: "Canara Robeco ",
      category: "Equity - Large Cap",
      dateOfInvestment: "2023-01-15",
      currentCost: "5,000.00",
      currentXIRR: "12.5%",
      aum: "5,080.88",
      expenseRatio: "1.5%",
      statistic: require("../assets/logo/Graph.png"),
    },
    {
      name: "Canara Robeco ",
      category: "Equity - Large Cap",
      dateOfInvestment: "2023-01-15",
      currentCost: "5,000.00",
      currentXIRR: "12.5%",
      aum: "5,080.88",
      expenseRatio: "1.5%",
      statistic: require("../assets/logo/Graph.png"),
    },
    {
      name: "Canara Robeco ",
      category: "Equity - Large Cap",
      dateOfInvestment: "2023-01-15",
      currentCost: "5,000.00",
      currentXIRR: "12.5%",
      aum: "5,080.88",
      expenseRatio: "1.5%",
      statistic: require("../assets/logo/Graph.png"),
    },
    {
      name: "Canara Robeco ",
      category: "Equity - Large Cap",
      dateOfInvestment: "2023-01-15",
      currentCost: "5,000.00",
      currentXIRR: "12.5%",
      aum: "5,080.88",
      expenseRatio: "1.5%",
      statistic: require("../assets/logo/Graph.png"),
    },
    {
      name: "Canara Robeco ",
      category: "Equity - Large Cap",
      dateOfInvestment: "2023-01-15",
      currentCost: "5,000.00",
      currentXIRR: "12.5%",
      aum: "5,080.88",
      expenseRatio: "1.5%",
      statistic: require("../assets/logo/Graph.png"),
    },
    // Add more dummy data as needed
  ];

  
  return (
    <>
    <div className="px-4 sm:px-8 md:px-16 lg:px-28 mb-5 ">
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
    <div className="px-4 sm:px-8 md:px-16 lg:px-28 ">
      <header className="mb-5 ">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <h1 className="text-xl sm:text-xl lg:text-xl font-bold mb-4 md:mb-0 text-[#3F4765] ">
              Transactions List
            </h1>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              {/* First Select Box */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-2 space-y-2 sm:space-y-0">
                <span className="font-semibold text-xs sm:text-xs lg:text-xs text-[#3F4765] text-left">
                  Market Cap Distribution:
                </span>
                <select className="border bg-gray-100 text-gray-700 rounded-3xl px-2 py-1 text-xs sm:text-xs lg:text-xs  focus:outline-none focus:ring-2 focus:ring-fuchsia-700">
                  <option className="bg-white text-black">
                    LargeCap
                  </option>
                  <option className="bg-white text-black">
                    MidCap
                  </option>
                  <option className="bg-white text-black">
                    SmallCap
                  </option>
                </select>
              </div>

              {/* Second Select Box */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-2 space-y-2 sm:space-y-0">
                <span className="font-semibold text-xs sm:text-xs lg:text-xs  text-[#3F4765] text-left">
                  Net Rolling Returns:
                </span>
                <select className="border bg-gray-100 text-gray-700 rounded-3xl px-2 py-1 text-xs sm:text-xs lg:text-xs  focus:outline-none focus:ring-2 focus:ring-fuchsia-700">
                  <option className="bg-white text-black ">
                    1 Year
                  </option>
                  <option className="bg-white text-black">
                    2 Year
                  </option>
                  <option className="bg-white text-black">
                    3 Year
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="w-full overflow-x-auto">
        <div className="min-w-max mt-4">
          <div className="flex bg-[#F5F5F5] font-normal text-sm text-[#848CA9] border rounded-md">
            {headers.map((header, index) => (
              <div
                key={index}
                className={`p-2 w-36 text-left ${
                  index === 0 ? "sticky left-0 bg-[#F5F5F5] z-10" : ""
                } ${
                  index === 1
                    ? "sticky left-36 bg-[#F5F5F5] z-10 font-semibold"
                    : "font-semibold"
                }`}
              >
                {`${header}`}
              </div>
            ))}
          </div>

          {dummyData.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="flex border-b items-center justify-between bg-[#DBDDF659] p-1"
            >
              <div className="p-3 w-36 line-clamp-2 overflow-hidden text-ellipsis break-all text-[13px] font-medium text-[#3F4765] sticky left-0 bg-white z-10">
                {row.name}
              </div>
              <div className="p-3 w-36 text-[13px] font-medium text-[#3F4765] sticky left-36 bg-white z-10">
                {row.category}
              </div>
              <div className="w-36 text-[13px] font-medium text-[#3F4765] pl-2">
                {row.dateOfInvestment}
              </div>
              <div className="w-36 text-[13px] font-medium text-[#3F4765]">
                {row.currentCost}
              </div>
              <div className="w-36 text-[13px] font-medium text-[#3F4765]">
                {row.currentXIRR}
              </div>
              <div className="w-36 text-[13px] font-medium text-[#3F4765]">
                {row.aum}
              </div>
              <div className="w-36 text-[13px] font-medium text-[#3F4765]">
                {row.expenseRatio}
              </div>
              <div className="w-36 items-center">
                <Image
                  src={row.statistic}
                  alt="Statistic"
                  width={60}
                  height={20}
                  className="h-auto w-auto max-w-full"
                />
              </div>
              <div className="w-36">
                <button className="md:block text-[#35B26B] border border-[#35B26B] rounded-md px-2 hover:bg-[#e8f5eb] text-sm">
                  More Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center space-x-2 my-10">
        {/* Previous Button */}
        <button
          className="w-10 h-10 flex items-center justify-center bg-gray-400 text-white rounded-lg"
          disabled
        >
          &lt;
        </button>

        {/* Page Numbers */}
        <button className="w-10 h-10 flex items-center justify-center bg-white border border-gray-300 text-purple-700 rounded-lg">
          1
        </button>
        <button className="w-10 h-10 flex items-center justify-center bg-white border border-gray-300 text-gray-700 rounded-lg">
          2
        </button>
        <div className="w-10 h-10 flex items-center justify-center text-gray-700">
          ...
        </div>
        <button className="w-10 h-10 flex items-center justify-center bg-white border border-gray-300 text-gray-700 rounded-lg">
          9
        </button>
        <button className="w-10 h-10 flex items-center justify-center bg-white border border-gray-300 text-gray-700 rounded-lg">
          10
        </button>

        {/* Next Button */}
        <button className="w-10 h-10 flex items-center justify-center bg-gray-400 text-white rounded-lg">
          &gt;
        </button>
      </div>
    </div>
  </>
  );
}
