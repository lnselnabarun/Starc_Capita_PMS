// Dashboard.js
"use client";
import React, {useState} from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import FilterModal from "../components/common/FilterModal";

export default function CombinedMutualFund() {
  const route = useRouter();

  const [isFilterOpen, setIsFilterOpen] = useState(false);

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

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <>
      <div className="px-4 sm:px-8 md:px-16 lg:px-28 ">
        <header className="mb-5 ">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
              <h1 className="text-xl sm:text-xl lg:text-xl font-bold mb-4 md:mb-0 text-[#3F4765] ">
                Transactions List
              </h1>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                {/* First Select Box */}

                <div onClick={() => toggleFilter()} className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-2 space-y-2 sm:space-y-0">
                <Image
                    src={require('../assets/logo/FilterModal.png')}
                    alt="Statistic"
                    width={70}
                    height={20}
                  />
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-2 space-y-2 sm:space-y-0">
                  <span className="font-semibold text-xs sm:text-xs lg:text-xs text-[#3F4765] text-left">
                    Market Cap Distribution:
                  </span>
                  <select className="border bg-gray-100 text-gray-700 rounded-3xl px-2 py-1 text-xs sm:text-xs lg:text-xs  focus:outline-none focus:ring-2 focus:ring-fuchsia-700">
                    <option className="bg-white text-black">LargeCap</option>
                    <option className="bg-white text-black">MidCap</option>
                    <option className="bg-white text-black">SmallCap</option>
                  </select>
                </div>

                {/* Second Select Box */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-2 space-y-2 sm:space-y-0">
                  <span className="font-semibold text-xs sm:text-xs lg:text-xs  text-[#3F4765] text-left">
                    Net Rolling Returns:
                  </span>
                  <select className="border bg-gray-100 text-gray-700 rounded-3xl px-2 py-1 text-xs sm:text-xs lg:text-xs  focus:outline-none focus:ring-2 focus:ring-fuchsia-700">
                    <option className="bg-white text-black ">1 Year</option>
                    <option className="bg-white text-black">2 Year</option>
                    <option className="bg-white text-black">3 Year</option>
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
                  <button
                    onClick={() =>
                      route.push("/CombinedDetailsMutualFund/12345")
                    }
                    className="md:block text-[#35B26B] border border-[#35B26B] rounded-md px-2 hover:bg-[#e8f5eb] text-sm"
                  >
                   Detail
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center space-x-2 my-5">
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

      <FilterModal isOpen={isFilterOpen} onClose={toggleFilter} />
    </>
  );
}
