"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import FilterModal from "../components/common/FilterModal";
import axios from "axios";

export default function CombinedMutualFund() {
  const router = useRouter();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [familyData, setFamilyData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const headers = [
    "Name",
    "Category",
    "Current Cost",
    "Current XIRR",
    "AUM (in Rs.)",
    "Expense Ratio",
    "Action",
  ];

  useEffect(() => {
    const initializeData = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("myData");

        if (!token) {
          setError("No authentication token found");
          return;
        }

        await GetCombindMutualFund(JSON.parse(token));
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    initializeData();
  }, []);

  async function GetCombindMutualFund(token) {
    console.log(token, "tokentoken");
    try {
      const response = await axios({
        method: "post",
        url: "https://dev.netrumusa.com/starkcapital/api-backend/get-usermf-data",
        headers: {
          "Cache-Control": "no-cache",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {},
      });
      console.log(response?.data);
      if (response.data?.status === "success") {
        const uniqueData = (response?.data?.data || []).filter(
          (item, index, self) =>
            index === self.findIndex((t) => t.id === item.id)
        );

        // Save the filtered data
        setFamilyData(uniqueData);
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

  // Fallback data in case API fails or during development

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }
  const formatCompact = (number) => {
    const formatter = new Intl.NumberFormat("en-IN", {
      notation: "compact",
      compactDisplay: "short",
      maximumFractionDigits: 2,
    });
    return formatter.format(number);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="space-y-6">
            {/* Title and Filter Row */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <h1 className="text-2xl font-bold text-gray-900">
                Transactions List
              </h1>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsFilterOpen(true)}
                  className="p-2 rounded-md hover:bg-gray-100"
                >
                  <Image
                    src={require("../assets/logo/FilterModal.png")}
                    alt="Filter"
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                </button>
              </div>
            </div>

            {/* Filter Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4 sm:items-center">
                <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                  Market Cap:
                </span>
                <select className="mt-1 block w-full sm:w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md">
                  <option>LargeCap</option>
                  <option>MidCap</option>
                  <option>SmallCap</option>
                </select>
              </div>

              <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4 sm:items-center">
                <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                  Rolling Returns:
                </span>
                <select className="mt-1 block w-full sm:w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md">
                  <option>1 Year</option>
                  <option>2 Years</option>
                  <option>3 Years</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Table Section */}
        {familyData?.length !== 0 ? (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {headers.map((header, index) => (
                      <th
                        key={index}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {familyData?.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-normal">
                        <div className="text-sm font-medium text-gray-900 max-w-xs line-clamp-2">
                          {item?.["FSCBI-FundLegalName"]}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-normal">
                        <div className="text-sm text-gray-900">
                          {item?.["AT-FundLevelCategoryName"]}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          ₹{item?.close_calculated}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {item?.["DP-Return1Yr"]}%
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {`₹ ${formatCompact(
                            item?.["FNA-AsOfOriginalReported"]
                          )}`}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {item?.["ARF-InterimNetExpenseRatio"]}%
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() =>
                            router.push(`/CombinedDetailsMutualFund/${item.id}`)
                          }
                          className="text-green-600 hover:text-green-900 px-3 py-1 border border-green-600 rounded-md hover:bg-green-50"
                        >
                          Detail
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="bg-white px-4 py-3 flex items-center justify-center border-t border-gray-200 sm:px-6">
              <nav
                className="flex items-center space-x-2"
                aria-label="Pagination"
              >
                <button className="relative inline-flex items-center px-3 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                  Previous
                </button>
                <button className="relative inline-flex items-center px-3 py-2 rounded-md border border-purple-500 bg-purple-50 text-sm font-medium text-purple-600">
                  1
                </button>
                <button className="relative inline-flex items-center px-3 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  2
                </button>
                <span className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700">
                  ...
                </span>
                <button className="relative inline-flex items-center px-3 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  9
                </button>
                <button className="relative inline-flex items-center px-3 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  10
                </button>
                <button className="relative inline-flex items-center px-3 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  Next
                </button>
              </nav>
            </div>
          </div>
        ) : null}
      </div>

      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />
    </div>
  );
}
