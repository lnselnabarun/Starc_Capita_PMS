// Dashboard.js
"use client";
import React, { useState, useEffect } from "react";
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
import { useRouter } from "next/navigation";
import axios from "axios";

export default function DashboardMain() {
  const router = useRouter();
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

  const [DashboardData, SetDashboardData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeIndexTime, setActiveIndexTime] = useState(0);

  const handleClickTime = (index) => {
    setActiveIndexTime(index);
  };

  useEffect(() => {
    const initializeData = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("myData");

        if (!token) {
          setError("No authentication token found");
          return;
        }

        await GetGetDashboardData(JSON.parse(token));
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    initializeData();
  }, []);

  async function GetGetDashboardData(token) {
    try {
      const response = await axios({
        method: "get",
        url: "https://dev.netrumusa.com/starkcapital/api-backend/userportfoliodata",
        headers: {
          "Cache-Control": "no-cache",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {},
      });
      console.log(response?.data?.data,"ffffff");
      if (response.data?.status === "success") {
        SetDashboardData(response.data?.data);
      } else {
        throw new Error(
          response.data?.message || "Failed to fetch mutual fund data"
        );
      }
    } catch (error) {
      console.error("Error fetching mutual fund data:", error);
      throw error;
    }
  }
  function formatMoney(amount) {
    return (
      new Intl.NumberFormat("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(amount)
    );
  }
  return (
    <>
      <div className="flex flex-col md:flex-row w-full justify-between px-4 sm:px-6 lg:px-28">
        {/* First div with 70% width on medium and larger screens */}
        <div className="w-full md:w-[70%] flex flex-wrap gap-4 justify-between">
          {/* Card 1 */}
          <div className="relative flex-1 min-w-[200px] max-w-[275px] bg-white border border-[#D9D9D9] rounded-lg p-2 h-[100px] sm:h-[110px] md:h-[120px]">
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
                {`₹ ${formatMoney(DashboardData?.totalPositiveAmount)}`}
              </p>
            </div>

            {/* Row 3 */}
            <div>
              {/* <p className="text-[10px] sm:text-xs md:text-sm font-medium text-[#24A959] ml-0 sm:ml-1">
                ↑ 1.7%
              </p> */}
            </div>
            {/* <Image
              src={require("../assets/logo/Graph.png")} // Replace with the correct image path
              alt="Description"
              className="absolute bottom-2 right-2 z-50"
              width={90} // Set the width you want
              height={60} // Set the height you want
              layout="intrinsic"
            /> */}
          </div>

          {/* Card 2 */}
          <div className="relative flex-1 min-w-[160px] max-w-[275px] bg-white border border-[#D9D9D9] rounded-lg p-2 h-[100px] sm:h-[110px] md:h-[120px]">
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
                {`₹ ${formatMoney(DashboardData?.totalNegativeAmount)}`}
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
          </div>

          {/* Card 3 */}
          <div className="relative flex-1 min-w-[160px] max-w-[275px] bg-white border border-[#D9D9D9] rounded-lg p-2 h-[100px] sm:h-[110px] md:h-[120px]">
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
                ₹ 50,435.362
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
          </div>
          {/* {chart section} */}
          <div className="w-full flex flex-wrap gap-4 h-auto p-4 rounded-lg border-[1.5px] border-[#D9D9D9] ">
            {/* First Content: Bold Text */}
            <div className="justify-between w-full flex flex-wrap gap-4 h-auto">
              <div className="flex flex-col items-start space-y-2">
                <div className="font-medium text-lg sm:text-xl md:text-2xl text-[#3F4765] font-sans">
                  Total Investment Graph
                </div>
              </div>

              {/* Second Content: Four Pressable Divs */}
              <div className="flex gap-4">
                {["24H", "7D", "1M", "1Y"].map((option, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleClickTime(idx)}
                    className={`h-[32px] w-[52px] px-4 py-1 cursor-pointer rounded-lg border-[1.5px] text-transparent bg-clip-text text-lg font-medium
                    flex justify-center items-center
                    ${
                      activeIndexTime !== idx
                        ? "border-[#D9D9D9] text-[#9FA8C7] bg-slate-950"
                        : "border-[#F5F5F5] bg-gradient-to-r from-[#1CAC70] to-[#EDDC46]"
                    }
                    hover:bg-gray-200 bg-[#949595]`}
                  >
                    {option}
                  </div>
                ))}
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

          <div className="justify-between w-full flex flex-wrap gap-4 h-auto mb-2">
            <div className="flex flex-col items-start space-y-2">
              <div className="font-medium text-lg sm:text-xl md:text-2xl text-[#3F4765] font-sans">
                Recent Transactions
              </div>
            </div>

            {/* Second Content: Four Pressable Divs */}
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

              <div
                onClick={() => router.push("/RecentTransactions")}
                className="border bg-gray-100 text-gray-700 rounded-3xl text-xs sm:text-sm lg:text-base px-4 py-2 focus:outline-none focus:ring-2 focus:ring-fuchsia-700 hover:bg-gray-200 flex justify-center items-center cursor-pointer"
              >
                See All
              </div>
            </div>
          </div>

          <div className="container mx-auto px-4 py-6">
            {/* Table Header */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 text-left p-3 bg-[#F5F5F5] rounded-lg">
              <div className="text-xs sm:text-xs md:text-xs font-normal leading-6 text-left text-[#848CA9] ">
                {/* Added padding-right */}
                CURRENCY NAME
              </div>
              <div className="text-xs sm:text-xs md:text-xs font-normal leading-6 text-left text-[#848CA9] ml-4">
                {" "}
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
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 bg-[#F5F5F5] text-left p-2 my-2 justify-center items-center rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  {" "}
                  {/* Increased space between image and currency */}
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
                  {" "}
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

          <div className="justify-between w-full flex flex-wrap gap-4 h-auto mb-2">
            <div className="flex flex-col items-start space-y-2">
              <div className="font-medium text-lg sm:text-xl md:text-2xl text-[#3F4765] font-sans">
                Systematic Transactions
              </div>
            </div>

            {/* Second Content: Four Pressable Divs */}
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

              <div
                onClick={() => router.push("/SystematicTransactions")}
                className="border bg-gray-100 text-gray-700 rounded-3xl text-xs sm:text-sm lg:text-base px-4 py-2 focus:outline-none focus:ring-2 focus:ring-fuchsia-700 hover:bg-gray-200 flex justify-center items-center cursor-pointer"
              >
                See All
              </div>
            </div>
          </div>

          <div className="container mx-auto px-4 py-6">
            {/* Table Header */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 text-left p-3 bg-[#F5F5F5] rounded-lg">
              <div className="text-xs sm:text-xs md:text-xs font-normal leading-6 text-left text-[#848CA9] ">
                {/* Added padding-right */}
                CURRENCY NAME
              </div>
              <div className="text-xs sm:text-xs md:text-xs font-normal leading-6 text-left text-[#848CA9] ml-4">
                {" "}
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
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 bg-[#F5F5F5] text-left p-2 my-2 justify-center items-center rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  {" "}
                  {/* Increased space between image and currency */}
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
                  {" "}
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
                {/* <div className="text-white font-semibold text-base sm:text-sm md:text-base">
                  {`Gain`}
                </div> */}
                <div className="text-white font-semibold text-base sm:text-sm md:text-base">
                  Gain
                </div>
              </div>

              {/* <!-- Dashed Border --> */}
              <div className="border-t border-dashed border-white my-4"></div>

              {/* <!-- Third Text and Image in Column --> */}
              <div className="flex flex-col space-y-2">
                <div className="text-white font-semibold text-base sm:text-sm md:text-base">
                  {`₹ ${DashboardData?.differenceAmount}`}
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
                {/* <div className="text-white font-semibold text-base sm:text-sm md:text-base">
                  {`Today's`}
                </div> */}
                <div className="text-white font-semibold text-base sm:text-sm md:text-base">
                  Expenses
                </div>
              </div>

              {/* <!-- Dashed Border --> */}
              <div className="border-t border-dashed border-white my-4"></div>

              {/* <!-- Third Text and Image in Column --> */}
              <div className="flex flex-col space-y-2">
                <div className="text-white font-semibold text-base sm:text-sm md:text-base">
                 {`₹ ${DashboardData?.totalNetExpenseRatio}`}
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
                  Activities Name{" "}
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
                  Activities Name{" "}
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
                  Activities Name{" "}
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

          <div
            onClick={() => router.push("/Newslist")}
            className="flex items-center space-x-4 justify-between mt-6 p-4 rounded-lg transition-all duration-300 ease-in-out hover:bg-gray-100 hover:shadow-md"
          >
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
