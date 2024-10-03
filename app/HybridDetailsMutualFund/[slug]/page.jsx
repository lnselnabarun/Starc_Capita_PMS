
"use client";
import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
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
import { useRouter } from "next/navigation";

const EquityDetailsMutualFund = ({ params }) => {
  const [activeButton, setActiveButton] = useState("capture");
  const route = useRouter();
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
  console.log(params?.slug, "bbbbbb");
  const allDetails = [
    {
      name: "Name",
      details: "Canara Robeco Bluechip Equity Fund",
    },
    {
      name: "Category",
      details: "Unit Value",
    },
    {
      name: "Date of Investment",
      details: "QTY Value",
    },
    {
      name: "Current Cost",
      details: "Rate Value",
    },
    {
      name: "Current XIRR",
      details: "GST Value",
    },
    {
      name: "AUM (in Rs.)",
      details: "SGST Value",
    },
    {
      name: "Expense Ratio",
      details: "SGST Value",
    },
    {
      name: "Taxation",
      details: "IGST Value",
    },
    {
      name: "Exit Load",
      details: "Taxable Amount value",
    },
    {
      name: "Sharpe",
      details: "SGST Value",
    },
    {
      name: "Up",
      details: "IGST Value",
    },
    {
      name: "Down",
      details: "Taxable Amount value",
    },
    {
      name: "LargeCap %",
      details: "Name Of The Item",
    },
    {
      name: "LargeCap AUM",
      details: "Unit Value",
    },
    {
      name: "MidCap %",
      details: "QTY Value",
    },
    {
      name: "MidCap AUM",
      details: "Rate Value",
    },
    {
      name: "SmallCap %",
      details: "GST Value",
    },
    {
      name: "SmallCap AUM",
      details: "SGST Value",
    },
    {
      name: "Others %",
      details: "SGST Value",
    },
    {
      name: "Others AUM",
      details: "IGST Value",
    },
    {
      name: "Std. Dev.",
      details: "Taxable Amount value",
    },
    {
      name: "Beta",
      details: "SGST Value",
    },
    {
      name: "Alpha",
      details: "IGST Value",
    },
    {
      name: "Avg",
      details: "Taxable Amount value",
    },
  ];
  const handleBack = () => {
    route.back();
  };
  return (
    <div className="min-h-screen  bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="px-4 sm:px-8 md:px-16 lg:px-28">
        {/* Fund Title */}
        <div className="flex items-center font-medium text-lg sm:text-xl md:text-2xl text-[#25282C] font-sans pb-10">
          <button
            onClick={handleBack}
            className=" mr-5 bg-white text-gray-800 p-2 rounded-full shadow-md flex items-center z-10 hover:bg-white transition duration-300"
            aria-label="Go back"
          >
            <ArrowLeft size={24} />
          </button>
          <div>{`Canara Robeco Bluechip Equity Fund `}</div>
        </div>

        {/* Main Container */}
        <div className="w-full flex flex-wrap gap-4 p-4 rounded-lg border-[1.5px] border-[#D9D9D9] bg-white">
          {/* First Content: Bold Text */}
          <div className="w-full flex flex-wrap justify-between gap-4 h-auto">
            <div className="flex flex-col items-start space-y-2">
              {/* <div className="font-medium text-lg sm:text-xl md:text-2xl text-[#3F4765] font-sans">
            Chart Data
          </div> */}
            </div>

            {/* Second Content: Four Pressable Divs */}
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
              {/* Capture Ratio Button */}
              <button
                onClick={() => setActiveButton("capture")}
                className={`text-[#9FA8C7] px-4 py-2 rounded-2xl border text-xs sm:text-sm ${
                  activeButton === "capture"
                    ? "bg-[#ECEFF9] border-[#E5EBEF]"
                    : "border-[#E5EBEF]"
                }`}
              >
                Capture Ratio
              </button>

              {/* Risk Ratio Button */}
              <button
                onClick={() => setActiveButton("risk")}
                className={`text-[#9FA8C7] px-4 py-2 rounded-2xl border text-xs sm:text-sm ${
                  activeButton === "risk"
                    ? "bg-[#ECEFF9] border-[#E5EBEF]"
                    : "border-[#E5EBEF]"
                }`}
              >
                Risk Ratio
              </button>

              {/* Select Time Period Dropdown */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-2 space-y-2 sm:space-y-0">
                <span className="font-medium text-xs sm:text-sm text-[#848CA9] text-left">
                  Select Time Period:
                </span>
                <select className="border bg-gray-100 text-[#848CA9] rounded-3xl px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-700">
                  <option className="bg-white text-black">1 Year</option>
                  <option className="bg-white text-black">2 Year</option>
                  <option className="bg-white text-black">3 Year</option>
                </select>
              </div>
            </div>
          </div>

          {/* Line Chart Section */}
          <div className="w-full h-48 sm:h-64 md:h-80 lg:h-96 transition-all duration-300 ease-in-out hover:transform hover:scale-[1.02] hover:shadow-lg rounded-lg">
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
        <div className="font-medium text-lg sm:text-xl md:text-2xl text-[#25282C] font-sans py-4">
          All Details
        </div>
        <div className="flex flex-wrap justify-between">
          {allDetails.map((detail, index) => (
            <div
              key={index}
              className="w-full md:w-[48%] mb-4 p-4 rounded-lg bg-[#F5F5F5] shadow-lg transition-all duration-300 ease-in-out hover:transform hover:scale-105 hover:shadow-xl"
            >
              <div className="flex justify-between items-center">
                <div className="text-[12px] font-semibold text-left text-black">
                  {detail.name}
                </div>
                <div className="text-[12px] font-medium text-left text-gray-600">
                  {detail.details}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EquityDetailsMutualFund;
