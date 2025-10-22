"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Filter, Minus, Plus } from "lucide-react";
import Image from "next/image";

export default function CombinedMutualFund() {
  const router = useRouter();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [familyData, setFamilyData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter states
  const [costRange, setCostRange] = useState([0, 100000]);
  const [rollingReturns, setRollingReturns] = useState([0, 100]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedMarketCaps, setSelectedMarketCaps] = useState([]);
  const [selectedReturnPeriods, setSelectedReturnPeriods] = useState([]);
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    cost: true,
    riskRatios: true,
    netRollingReturns: false,
    filterMFName: true,
  });
  const [selectedMarketCap, setSelectedMarketCap] = useState("All");
  const [selectedRollingReturn, setSelectedRollingReturn] = useState("1 Year");

  const [selectCategory, setselectCategory] = useState("");

  const categoriess = [
    "Large-Cap",
    "Mid-Cap",
    "Equity - Other",
    "Flexi Cap",
    "Focused Fund",
    "Long Duration",
    "Fund of Funds",
    "Equity - Infrastructure",
    "Large & Mid-Cap",
    "Equity Savings",
    "Contra",
    "Arbitrage Fund",
    "Dynamic Asset Allocation",
    "Value",
    "Money Market",
    "Dynamic Bond",
    "Floating Rate",
    "Sector - Precious Metals",
    "Conservative Allocation",
    "Aggressive Allocation",
    "Liquid",
    "Low Duration",
    "Index Funds",
    "Small-Cap",
    "Multi Asset Allocation",
  ];

  const headers = [
    "Name",
    "Category",
    // "ISIN",
    "Current Cost (₹)",
    "Current XIRR",
    "Current VALUE (₹)",
    "Expense Ratio",
    "Exit Load",
    "LargeCap %",
    "LargeCap AUM",
    "MidCap %",
    "MidCap AUM",
    "SmallCap %",
    "SmallCap AUM",
    "Others %",
    "Others AUM",
    "Std. Dev.",
    "Sharpe Ratio",
    "Caputure Ratios (UP)",
    "Caputure Ratios (DOWN)",
    "Beta",
    "Alpha",
    "Net Rolling (1 Year Max)",
    "Net Rolling (1 Year Avg)",
    "Net Rolling (1 Year Min)",
    "Net Rolling (3 Year Max)",
    "Net Rolling (3 Year Avg)",
    "Net Rolling (3 Year Min)",
    "Net Tailing (1 Year)",
    "Net Tailing (3 Year)",
    "Avg. Manager Tenure",
    "Tenure Over Ratio",
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
        setError(err?.message);
      } finally {
        setIsLoading(false);
      }
    };

    initializeData();
  }, []);

  async function GetCombindMutualFund(token) {
    try {
      const response = await axios.post(
        "https://dev.netrumusa.com/starkcapital/api-backend/get-usermf-data",
        { category: "ALL" },
        {
          headers: {
            "Cache-Control": "no-cache",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data?.status === "success") {
        let rawData;
        if (response.data?.data?.data) {
          rawData = response.data.data.data;
        } else if (response.data?.data) {
          rawData = response.data.data;
        } else {
          rawData = response.data;
        }
        if (Array.isArray(rawData) && rawData.length > 0 && rawData[0]?.data) {
          setFilteredData(rawData);
          const flattenedData = rawData.flatMap((group) => group.data || []);
          setFamilyData(flattenedData);
        }
        if (Array.isArray(rawData)) {
          // Remove duplicates

          const uniqueData = rawData.map((dataOne) => {
            dataOne.data = dataOne.data.filter((item, index, self) => {
              return (
                index ===
                self.findIndex((t) => {
                  if (item?.id && t?.id) return t.id === item.id;
                  if (item?.isin && t?.isin) return t.isin === item.isin;
                  if (item?.scheme && t?.scheme)
                    return t.scheme === item.scheme;
                  return false;
                })
              );
            });
            return dataOne;
          });

          setFamilyData(uniqueData);
          setFilteredData(response?.data?.data);
        }
        // If rawData is an object
        else {
          setFilteredData([rawData]);
          setFamilyData([rawData]);
        }
      } else {
        // localStorage.clear();
        // router.push("/");
        throw new Error(
          response.data?.message || "API returned unsuccessful status"
        );
      }
    } catch (error) {
      if (error.response) {
        throw new Error(
          `API Error (${error.response.status}): ${
            error.response.data?.message ||
            error.response.statusText ||
            error.message
          }`
        );
      } else if (error.request) {
        throw new Error("Network Error: No response from server");
      } else {
        throw new Error(`Request Error: ${error.message}`);
      }
    }
  }

  const handleCategoryChange = (category) => {
    setselectCategory(category);
  };

  const handleApplyFilters = () => {
    // applyFilters();
    setIsFilterOpen(false);
  };

  const resetFilters = () => {
    setselectCategory("");
    setIsFilterOpen(false);
  };

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

  function formatMoney(amount) {
    return new Intl.NumberFormat("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="space-y-6">
            {/* Title and Filter Row */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <h1 className="text-2xl font-bold text-gray-900">Fund List</h1>
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-600">
                  Total Funds: {filteredData?.length || 0}
                </div>
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="p-2 rounded-md hover:bg-gray-100"
                >
                  <Filter className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Table Section */}
        {filteredData?.length !== 0 ? (
          <div className="bg-white rounded-lg shadow">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {/* Fixed width for name column to prevent layout shifts */}
                    <th
                      className="sticky left-0 z-20 bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      style={{ minWidth: "200px", maxWidth: "250px" }}
                    >
                      {headers[0]} {/* Name column */}
                    </th>
                    {/* Fixed width for category column */}
                    <th
                      className="sticky left-[200px] z-10 bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      style={{ minWidth: "150px" }}
                    >
                      {headers[1]} {/* Category column */}
                    </th>
                    {/* Regular columns with appropriate width */}
                    {headers.slice(2).map((header, index) => (
                      <th
                        key={index + 2}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                        style={{
                          minWidth: header.includes("Current VALUE")
                            ? "150px"
                            : "120px",
                        }}
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>

                {isFilterOpen === true ? (
                  <>
                    <div>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredData?.map((items, indexs) => (
                          <>
                            {selectCategory == items?.category
                              ? items?.data?.map((item, index) => {
                                  return (
                                    <>
                                      <tr
                                        key={item.id}
                                        className="hover:bg-gray-50"
                                      >
                                        {/* Fixed width for name column */}
                                        <td
                                          className="sticky left-0 z-20 bg-white px-6 py-4 whitespace-normal"
                                          style={{
                                            minWidth: "200px",
                                            maxWidth: "250px",
                                            boxShadow:
                                              "2px 0 5px -2px rgba(0,0,0,0.1)",
                                          }}
                                        >
                                          <div className="text-sm font-medium text-gray-900 line-clamp-2">
                                            {item?.scheme ||
                                              item?.["FSCBI-FundLegalName"] ||
                                              "N/A"}
                                          </div>
                                        </td>
                                        {/* Fixed width for category column */}
                                        <td
                                          className="sticky left-[200px] z-10 bg-white px-6 py-4 whitespace-normal"
                                          style={{
                                            minWidth: "150px",
                                            boxShadow:
                                              "2px 0 5px -2px rgba(0,0,0,0.1)",
                                          }}
                                        >
                                          <div className="text-sm text-gray-900">
                                            {item?.[
                                              "AT-FundLevelCategoryName"
                                            ] || "N/A"}
                                          </div>
                                        </td>
                                        {/* Current isin */}
                                        <td
                                          className="px-6 py-4 whitespace-nowrap"
                                          style={{ minWidth: "120px" }}
                                        >
                                          <div className="text-sm text-gray-900">
                                            {item?.isin || "N/A"}
                                          </div>
                                        </td>
                                        {/* Current Cost */}
                                        <td
                                          className="px-6 py-4 whitespace-nowrap"
                                          style={{ minWidth: "120px" }}
                                        >
                                          <div className="text-sm text-gray-900">
                                            {item?.valuation_cost
                                              ? `₹${formatMoney(
                                                  item.valuation_cost
                                                )}`
                                              : "N/A"}
                                          </div>
                                        </td>
                                        {/* Current XIRR */}
                                        <td
                                          className="px-6 py-4 whitespace-nowrap"
                                          style={{ minWidth: "120px" }}
                                        >
                                          <div className="text-sm text-gray-900">
                                            {item?.currentXIRR
                                              ? `${item.currentXIRR}%`
                                              : "0%"}
                                          </div>
                                        </td>
                                        {/* Current Value */}
                                        <td
                                          className="px-6 py-4 whitespace-nowrap"
                                          style={{ minWidth: "150px" }}
                                        >
                                          <div className="text-sm text-gray-900">
                                            {item?.currentValue
                                              ? `₹${formatMoney(
                                                  item.currentValue
                                                )}`
                                              : "N/A"}
                                          </div>
                                        </td>
                                        {/* Expense Ratio */}
                                        <td
                                          className="px-6 py-4 whitespace-nowrap"
                                          style={{ minWidth: "120px" }}
                                        >
                                          <div className="text-sm text-gray-900">
                                            {item?.[
                                              "ARF-InterimNetExpenseRatio"
                                            ]
                                              ? `${item["ARF-InterimNetExpenseRatio"]}%`
                                              : "N/A"}
                                          </div>
                                        </td>
                                        {/* Exit Load */}
                                        <td
                                          className="px-6 py-4 whitespace-nowrap"
                                          style={{ minWidth: "120px" }}
                                        >
                                          <div className="text-sm text-gray-900">
                                            {item?.["LS-DeferLoads"] || "N/A"}
                                          </div>
                                        </td>
                                        <td
                                          className="px-6 py-4 whitespace-nowrap"
                                          style={{ minWidth: "120px" }}
                                        >
                                          <div className="text-sm text-gray-900">
                                            {item?.[
                                              "IMCBD-IndiaLargeCapLong"
                                            ] || "N/A"}
                                          </div>
                                        </td>
                                        <td
                                          className="px-6 py-4 whitespace-nowrap"
                                          style={{ minWidth: "120px" }}
                                        >
                                          <div className="text-sm text-gray-900">
                                            {item?.largeCapAUM || "N/A"}
                                          </div>
                                        </td>
                                        <td
                                          className="px-6 py-4 whitespace-nowrap"
                                          style={{ minWidth: "120px" }}
                                        >
                                          <div className="text-sm text-gray-900">
                                            {item?.["IMCBD-IndiaMidCapNet"] ||
                                              "N/A"}
                                          </div>
                                        </td>
                                        <td
                                          className="px-6 py-4 whitespace-nowrap"
                                          style={{ minWidth: "120px" }}
                                        >
                                          <div className="text-sm text-gray-900">
                                            {item?.midCapAUM || "N/A"}
                                          </div>
                                        </td>
                                        <td
                                          className="px-6 py-4 whitespace-nowrap"
                                          style={{ minWidth: "120px" }}
                                        >
                                          <div className="text-sm text-gray-900">
                                            {item?.["IMCBD-IndiaSmallCapNet"] ||
                                              "N/A"}
                                          </div>
                                        </td>
                                        <td
                                          className="px-6 py-4 whitespace-nowrap"
                                          style={{ minWidth: "120px" }}
                                        >
                                          <div className="text-sm text-gray-900">
                                            {item?.smallCapAUM || "N/A"}
                                          </div>
                                        </td>
                                        <td
                                          className="px-6 py-4 whitespace-nowrap"
                                          style={{ minWidth: "120px" }}
                                        >
                                          <div className="text-sm text-gray-900">
                                            0
                                          </div>
                                        </td>
                                        <td
                                          className="px-6 py-4 whitespace-nowrap"
                                          style={{ minWidth: "120px" }}
                                        >
                                          <div className="text-sm text-gray-900">
                                            {item?.otherAUM || "N/A"}
                                          </div>
                                        </td>
                                        <td
                                          className="px-6 py-4 whitespace-nowrap"
                                          style={{ minWidth: "120px" }}
                                        >
                                          <div className="text-sm text-gray-900">
                                            {item?.["RM-StdDev1Yr"] || "N/A"}
                                          </div>
                                        </td>
                                        <td
                                          className="px-6 py-4 whitespace-nowrap"
                                          style={{ minWidth: "120px" }}
                                        >
                                          <div className="text-sm text-gray-900">
                                            {item?.["RM-SharpeRatio1Yr"] ||
                                              "N/A"}
                                          </div>
                                        </td>
                                        <td
                                          className="px-6 py-4 whitespace-nowrap"
                                          style={{ minWidth: "120px" }}
                                        >
                                          <div className="text-sm text-gray-900">
                                            {item?.[
                                              "RMP-CaptureRatioUpside1Yr"
                                            ] || "N/A"}
                                          </div>
                                        </td>
                                        <td
                                          className="px-6 py-4 whitespace-nowrap"
                                          style={{ minWidth: "120px" }}
                                        >
                                          <div className="text-sm text-gray-900">
                                            {item?.[
                                              "RMP-CaptureRatioDownside1Yr"
                                            ] || "N/A"}
                                          </div>
                                        </td>
                                        <td
                                          className="px-6 py-4 whitespace-nowrap"
                                          style={{ minWidth: "120px" }}
                                        >
                                          <div className="text-sm text-gray-900">
                                            {item?.["RMP-Beta1Yr"] || "N/A"}
                                          </div>
                                        </td>
                                        <td
                                          className="px-6 py-4 whitespace-nowrap"
                                          style={{ minWidth: "120px" }}
                                        >
                                          <div className="text-sm text-gray-900">
                                            {item?.["RMP-Alpha1Yr"] || "N/A"}
                                          </div>
                                        </td>
                                        <td
                                          className="px-6 py-4 whitespace-nowrap"
                                          style={{ minWidth: "120px" }}
                                        >
                                          <div className="text-sm text-gray-900">
                                            {item?.[
                                              "Rolling Return Max 0.08333333333333333YR"
                                            ] || "N/A"}
                                          </div>
                                        </td>
                                        <td
                                          className="px-6 py-4 whitespace-nowrap"
                                          style={{ minWidth: "120px" }}
                                        >
                                          <div className="text-sm text-gray-900">
                                            {item?.[
                                              "Rolling Return Avg 0.08333333333333333YR"
                                            ] || "N/A"}
                                          </div>
                                        </td>
                                        <td
                                          className="px-6 py-4 whitespace-nowrap"
                                          style={{ minWidth: "120px" }}
                                        >
                                          <div className="text-sm text-gray-900">
                                            {item?.[
                                              "Rolling Return Min 0.08333333333333333YR"
                                            ] || "N/A"}
                                          </div>
                                        </td>
                                        <td
                                          className="px-6 py-4 whitespace-nowrap"
                                          style={{ minWidth: "120px" }}
                                        >
                                          <div className="text-sm text-gray-900">
                                            {item?.[
                                              "Rolling Return Max 0.25YR"
                                            ] || "N/A"}
                                          </div>
                                        </td>
                                        <td
                                          className="px-6 py-4 whitespace-nowrap"
                                          style={{ minWidth: "120px" }}
                                        >
                                          <div className="text-sm text-gray-900">
                                            {item?.[
                                              "Rolling Return Avg 0.25YR"
                                            ] || "N/A"}
                                          </div>
                                        </td>
                                        <td
                                          className="px-6 py-4 whitespace-nowrap"
                                          style={{ minWidth: "120px" }}
                                        >
                                          <div className="text-sm text-gray-900">
                                            {item?.[
                                              "Rolling Return Min 0.25YR"
                                            ] || "N/A"}
                                          </div>
                                        </td>
                                        <td
                                          className="px-6 py-4 whitespace-nowrap"
                                          style={{ minWidth: "120px" }}
                                        >
                                          <div className="text-sm text-gray-900">
                                            {item?.["DP-Return1Yr"] || "N/A"}
                                          </div>
                                        </td>
                                        <td
                                          className="px-6 py-4 whitespace-nowrap"
                                          style={{ minWidth: "120px" }}
                                        >
                                          <div className="text-sm text-gray-900">
                                            {item?.["DP-Return3Yr"] || "N/A"}
                                          </div>
                                        </td>

                                        <td
                                          className="px-6 py-4 whitespace-nowrap"
                                          style={{ minWidth: "120px" }}
                                        >
                                          <div className="text-sm text-gray-900">
                                            {"N/A"}
                                          </div>
                                        </td>
                                        <td
                                          className="px-6 py-4 whitespace-nowrap"
                                          style={{ minWidth: "120px" }}
                                        >
                                          <div className="text-sm text-gray-900">
                                            {"N/A"}
                                          </div>
                                        </td>

                                        {/* Action column */}
                                        <td
                                          className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                                          style={{ minWidth: "100px" }}
                                        >
                                          <button
                                            onClick={() =>
                                              router.push(
                                                `/CombinedDetailsMutualFund/${item.id}`
                                              )
                                            }
                                            className="text-green-600 hover:text-green-900 px-3 py-1 border border-green-600 rounded-md hover:bg-green-50"
                                          >
                                            Detail
                                          </button>
                                        </td>
                                      </tr>
                                    </>
                                  );
                                })
                              : null}
                          </>
                        ))}
                      </tbody>
                    </div>
                  </>
                ) : (
                  <>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredData?.map((items, indexs) => (
                        <>
                          {items?.data?.map((item, index) => {
                            return (
                              <tr key={item.id} className="hover:bg-gray-50">
                                {/* Fixed width for name column */}
                                <td
                                  className="sticky left-0 z-20 bg-white px-6 py-4 whitespace-normal"
                                  style={{
                                    minWidth: "200px",
                                    maxWidth: "250px",
                                    boxShadow: "2px 0 5px -2px rgba(0,0,0,0.1)",
                                  }}
                                >
                                  <div className="text-sm font-medium text-gray-900 line-clamp-2">
                                    {item?.scheme ||
                                      item?.["FSCBI-FundLegalName"] ||
                                      "N/A"}
                                  </div>
                                </td>
                                {/* Fixed width for category column */}
                                <td
                                  className="sticky left-[200px] z-10 bg-white px-6 py-4 whitespace-normal"
                                  style={{
                                    minWidth: "150px",
                                    boxShadow: "2px 0 5px -2px rgba(0,0,0,0.1)",
                                  }}
                                >
                                  <div className="text-sm text-gray-900">
                                    {item?.["AT-FundLevelCategoryName"] ||
                                      "N/A"}
                                  </div>
                                </td>
                                {/* Current isin */}
                                {/* <td
                                  className="px-6 py-4 whitespace-nowrap"
                                  style={{ minWidth: "120px" }}
                                >
                                  <div className="text-sm text-gray-900">
                                    {item?.isin || "N/A"}
                                  </div>
                                </td> */}
                                {/* Current Cost */}
                                <td
                                  className="px-6 py-4 whitespace-nowrap"
                                  style={{ minWidth: "120px" }}
                                >
                                  <div className="text-sm text-gray-900">
                                    {item?.valuation_cost
                                      ? `₹${formatMoney(item.valuation_cost)}`
                                      : "N/A"}
                                  </div>
                                </td>
                                {/* Current XIRR */}
                                <td
                                  className="px-6 py-4 whitespace-nowrap"
                                  style={{ minWidth: "120px" }}
                                >
                                  <div className="text-sm text-gray-900">
                                    {item?.currentXIRR
                                      ? `${item.currentXIRR}%`
                                      : "0%"}
                                  </div>
                                </td>
                                {/* Current Value */}
                                <td
                                  className="px-6 py-4 whitespace-nowrap"
                                  style={{ minWidth: "150px" }}
                                >
                                  <div className="text-sm text-gray-900">
                                    {item?.currentValue
                                      ? `₹${formatMoney(item.currentValue)}`
                                      : "N/A"}
                                  </div>
                                </td>
                                {/* Expense Ratio */}
                                <td
                                  className="px-6 py-4 whitespace-nowrap"
                                  style={{ minWidth: "120px" }}
                                >
                                  <div className="text-sm text-gray-900">
                                    {item?.["ARF-InterimNetExpenseRatio"]
                                      ? `${item["ARF-InterimNetExpenseRatio"]}%`
                                      : "N/A"}
                                  </div>
                                </td>
                                {/* Exit Load */}
                                <td
                                  className="px-6 py-4 whitespace-nowrap"
                                  style={{ minWidth: "120px" }}
                                >
                                  <div className="text-sm text-gray-900">
                                    {item?.["LS-DeferLoads"] || "N/A"}
                                  </div>
                                </td>
                                <td
                                  className="px-6 py-4 whitespace-nowrap"
                                  style={{ minWidth: "120px" }}
                                >
                                  <div className="text-sm text-gray-900">
                                    {item?.["IMCBD-IndiaLargeCapLong"] || "N/A"}
                                  </div>
                                </td>
                                <td
                                  className="px-6 py-4 whitespace-nowrap"
                                  style={{ minWidth: "120px" }}
                                >
                                  <div className="text-sm text-gray-900">
                                    {item?.largeCapAUM || "N/A"}
                                  </div>
                                </td>
                                <td
                                  className="px-6 py-4 whitespace-nowrap"
                                  style={{ minWidth: "120px" }}
                                >
                                  <div className="text-sm text-gray-900">
                                    {item?.["IMCBD-IndiaMidCapNet"] || "N/A"}
                                  </div>
                                </td>
                                <td
                                  className="px-6 py-4 whitespace-nowrap"
                                  style={{ minWidth: "120px" }}
                                >
                                  <div className="text-sm text-gray-900">
                                    {item?.midCapAUM || "N/A"}
                                  </div>
                                </td>
                                <td
                                  className="px-6 py-4 whitespace-nowrap"
                                  style={{ minWidth: "120px" }}
                                >
                                  <div className="text-sm text-gray-900">
                                    {item?.["IMCBD-IndiaSmallCapNet"] || "N/A"}
                                  </div>
                                </td>
                                <td
                                  className="px-6 py-4 whitespace-nowrap"
                                  style={{ minWidth: "120px" }}
                                >
                                  <div className="text-sm text-gray-900">
                                    {item?.smallCapAUM || "N/A"}
                                  </div>
                                </td>
                                <td
                                  className="px-6 py-4 whitespace-nowrap"
                                  style={{ minWidth: "120px" }}
                                >
                                  <div className="text-sm text-gray-900">0</div>
                                </td>
                                <td
                                  className="px-6 py-4 whitespace-nowrap"
                                  style={{ minWidth: "120px" }}
                                >
                                  <div className="text-sm text-gray-900">
                                    {item?.otherAUM || "N/A"}
                                  </div>
                                </td>
                                <td
                                  className="px-6 py-4 whitespace-nowrap"
                                  style={{ minWidth: "120px" }}
                                >
                                  <div className="text-sm text-gray-900">
                                    {item?.["RM-StdDev1Yr"] || "N/A"}
                                  </div>
                                </td>
                                <td
                                  className="px-6 py-4 whitespace-nowrap"
                                  style={{ minWidth: "120px" }}
                                >
                                  <div className="text-sm text-gray-900">
                                    {item?.["RM-SharpeRatio1Yr"] || "N/A"}
                                  </div>
                                </td>
                                <td
                                  className="px-6 py-4 whitespace-nowrap"
                                  style={{ minWidth: "120px" }}
                                >
                                  <div className="text-sm text-gray-900">
                                    {item?.["RMP-CaptureRatioUpside1Yr"] ||
                                      "N/A"}
                                  </div>
                                </td>
                                <td
                                  className="px-6 py-4 whitespace-nowrap"
                                  style={{ minWidth: "120px" }}
                                >
                                  <div className="text-sm text-gray-900">
                                    {item?.["RMP-CaptureRatioDownside1Yr"] ||
                                      "N/A"}
                                  </div>
                                </td>
                                <td
                                  className="px-6 py-4 whitespace-nowrap"
                                  style={{ minWidth: "120px" }}
                                >
                                  <div className="text-sm text-gray-900">
                                    {item?.["RMP-Beta1Yr"] || "N/A"}
                                  </div>
                                </td>
                                <td
                                  className="px-6 py-4 whitespace-nowrap"
                                  style={{ minWidth: "120px" }}
                                >
                                  <div className="text-sm text-gray-900">
                                    {item?.["RMP-Alpha1Yr"] || "N/A"}
                                  </div>
                                </td>
                                <td
                                  className="px-6 py-4 whitespace-nowrap"
                                  style={{ minWidth: "120px" }}
                                >
                                  <div className="text-sm text-gray-900">
                                    {item?.[
                                      "Rolling Return Max 0.08333333333333333YR"
                                    ] || "N/A"}
                                  </div>
                                </td>
                                <td
                                  className="px-6 py-4 whitespace-nowrap"
                                  style={{ minWidth: "120px" }}
                                >
                                  <div className="text-sm text-gray-900">
                                    {item?.[
                                      "Rolling Return Avg 0.08333333333333333YR"
                                    ] || "N/A"}
                                  </div>
                                </td>
                                <td
                                  className="px-6 py-4 whitespace-nowrap"
                                  style={{ minWidth: "120px" }}
                                >
                                  <div className="text-sm text-gray-900">
                                    {item?.[
                                      "Rolling Return Min 0.08333333333333333YR"
                                    ] || "N/A"}
                                  </div>
                                </td>
                                <td
                                  className="px-6 py-4 whitespace-nowrap"
                                  style={{ minWidth: "120px" }}
                                >
                                  <div className="text-sm text-gray-900">
                                    {item?.["Rolling Return Max 0.25YR"] ||
                                      "N/A"}
                                  </div>
                                </td>
                                <td
                                  className="px-6 py-4 whitespace-nowrap"
                                  style={{ minWidth: "120px" }}
                                >
                                  <div className="text-sm text-gray-900">
                                    {item?.["Rolling Return Avg 0.25YR"] ||
                                      "N/A"}
                                  </div>
                                </td>
                                <td
                                  className="px-6 py-4 whitespace-nowrap"
                                  style={{ minWidth: "120px" }}
                                >
                                  <div className="text-sm text-gray-900">
                                    {item?.["Rolling Return Min 0.25YR"] ||
                                      "N/A"}
                                  </div>
                                </td>
                                <td
                                  className="px-6 py-4 whitespace-nowrap"
                                  style={{ minWidth: "120px" }}
                                >
                                  <div className="text-sm text-gray-900">
                                    {item?.["DP-Return1Yr"] || "N/A"}
                                  </div>
                                </td>
                                <td
                                  className="px-6 py-4 whitespace-nowrap"
                                  style={{ minWidth: "120px" }}
                                >
                                  <div className="text-sm text-gray-900">
                                    {item?.["DP-Return3Yr"] || "N/A"}
                                  </div>
                                </td>

                                <td
                                  className="px-6 py-4 whitespace-nowrap"
                                  style={{ minWidth: "120px" }}
                                >
                                  <div className="text-sm text-gray-900">
                                    {"N/A"}
                                  </div>
                                </td>
                                <td
                                  className="px-6 py-4 whitespace-nowrap"
                                  style={{ minWidth: "120px" }}
                                >
                                  <div className="text-sm text-gray-900">
                                    {"N/A"}
                                  </div>
                                </td>

                                {/* Action column */}
                                <td
                                  className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                                  style={{ minWidth: "100px" }}
                                >
                                  <button
                                    onClick={() =>
                                      router.push(
                                        `/CombinedDetailsMutualFund/${item.id}`
                                      )
                                    }
                                    className="text-green-600 hover:text-green-900 px-3 py-1 border border-green-600 rounded-md hover:bg-green-50"
                                  >
                                    Detail
                                  </button>
                                </td>
                              </tr>
                            );
                          })}

                          <tr
                            key={items.id}
                            className="hover:bg-slate-300 bg-slate-200"
                          >
                            {/* Fixed width for name column */}
                            <td
                              className="sticky left-0 z-20 bg-slate-200 px-6 py-1 whitespace-normal"
                              style={{
                                minWidth: "200px",
                                maxWidth: "250px",
                                boxShadow: "2px 0 5px -2px rgba(0,0,0,0.1)",
                              }}
                            >
                              <div className="text-base font-bold text-fuchsia-950 line-clamp-2">
                                Category Average
                              </div>
                            </td>
                            {/* Fixed width for category column */}
                            <td
                              className="sticky left-[200px] z-10 bg-slate-200 px-6 py-1 whitespace-normal"
                              style={{
                                minWidth: "150px",
                                boxShadow: "2px 0 5px -2px rgba(0,0,0,0.1)",
                              }}
                            >
                              <div className="text-sm text-gray-900">
                                {items?.category}
                              </div>
                            </td>
                            {/* Current isin */}
                            <td
                              className="px-6 py-1 whitespace-nowrap"
                              style={{ minWidth: "120px" }}
                            >
                              <div className="text-sm text-gray-900">
                                {`₹${formatMoney(
                                  items?.summery?.totalCurrentCost
                                )}`}
                              </div>
                            </td>
                            {/* Current Cost */}
                            <td
                              className="px-6 py-1 whitespace-nowrap"
                              style={{ minWidth: "120px" }}
                            >
                              <div className="text-sm text-gray-900"></div>
                            </td>
                            {/* Current XIRR */}
                            <td
                              className="px-6 py-1 whitespace-nowrap"
                              style={{ minWidth: "120px" }}
                            >
                              <div className="text-sm text-gray-900">
                                {`₹${formatMoney(
                                  items?.summery?.totalCurrentValue
                                )}`}
                              </div>
                            </td>
                            {/* Current Value */}
                            <td
                              className="px-6 py-1 whitespace-nowrap"
                              style={{ minWidth: "150px" }}
                            >
                              <div className="text-sm text-gray-900">
                                {items?.summery?.weightedExpenseRatio}
                              </div>
                            </td>
                            {/* Expense Ratio */}
                            <td
                              className="px-6 py-1 whitespace-nowrap"
                              style={{ minWidth: "120px" }}
                            >
                              <div className="text-sm text-gray-900"></div>
                            </td>
                            {/* Exit Load */}
                            <td
                              className="px-6 py-1 whitespace-nowrap"
                              style={{ minWidth: "120px" }}
                            >
                              <div className="text-sm text-gray-900"></div>
                            </td>
                            <td
                              className="px-6 py-1 whitespace-nowrap"
                              style={{ minWidth: "120px" }}
                            >
                              <div className="text-sm text-gray-900"></div>
                            </td>
                            <td
                              className="px-6 py-1 whitespace-nowrap"
                              style={{ minWidth: "120px" }}
                            >
                              <div className="text-sm text-gray-900"></div>
                            </td>
                            <td
                              className="px-6 py-1 whitespace-nowrap"
                              style={{ minWidth: "120px" }}
                            >
                              <div className="text-sm text-gray-900"></div>
                            </td>
                            <td
                              className="px-6 py-1 whitespace-nowrap"
                              style={{ minWidth: "120px" }}
                            >
                              <div className="text-sm text-gray-900"></div>
                            </td>
                            <td
                              className="px-6 py-1 whitespace-nowrap"
                              style={{ minWidth: "120px" }}
                            >
                              <div className="text-sm text-gray-900"></div>
                            </td>
                            <td
                              className="px-6 py-1 whitespace-nowrap"
                              style={{ minWidth: "120px" }}
                            >
                              <div className="text-sm text-gray-900">0</div>
                            </td>
                            <td
                              className="px-6 py-1 whitespace-nowrap"
                              style={{ minWidth: "120px" }}
                            >
                              <div className="text-sm text-gray-900"></div>
                            </td>
                            <td
                              className="px-6 py-1 whitespace-nowrap"
                              style={{ minWidth: "120px" }}
                            >
                              <div className="text-sm text-gray-900">
                                {items?.summery?.weightedStdDev}
                              </div>
                            </td>
                            <td
                              className="px-6 py-1 whitespace-nowrap"
                              style={{ minWidth: "120px" }}
                            >
                              <div className="text-sm text-gray-900">
                                {items?.summery?.weightedSharpeRatio}
                              </div>
                            </td>
                            <td
                              className="px-6 py-1 whitespace-nowrap"
                              style={{ minWidth: "120px" }}
                            >
                              <div className="text-sm text-gray-900">
                                {items?.summery?.weightedUpsideCapture}
                              </div>
                            </td>
                            <td
                              className="px-6 py-1 whitespace-nowrap"
                              style={{ minWidth: "120px" }}
                            >
                              <div className="text-sm text-gray-900">
                                {items?.summery?.weightedDownsideCapture}
                              </div>
                            </td>
                            <td
                              className="px-6 py-1 whitespace-nowrap"
                              style={{ minWidth: "120px" }}
                            >
                              <div className="text-sm text-gray-900">
                                {items?.summery?.weightedBeta}
                              </div>
                            </td>
                            <td
                              className="px-6 py-1 whitespace-nowrap"
                              style={{ minWidth: "120px" }}
                            >
                              <div className="text-sm text-gray-900">
                                {items?.summery?.weightedAlpha}
                              </div>
                            </td>
                            <td
                              className="px-6 py-1 whitespace-nowrap"
                              style={{ minWidth: "120px" }}
                            >
                              <div className="text-sm text-gray-900">
                                {items?.summery?.weightedRolling1YrMax}
                              </div>
                            </td>
                            <td
                              className="px-6 py-1 whitespace-nowrap"
                              style={{ minWidth: "120px" }}
                            >
                              <div className="text-sm text-gray-900">
                                {items?.summery?.weightedRolling1YrAvg}
                              </div>
                            </td>
                            <td
                              className="px-6 py-1 whitespace-nowrap"
                              style={{ minWidth: "120px" }}
                            >
                              <div className="text-sm text-gray-900">
                                {items?.summery?.weightedRolling1YrMin}
                              </div>
                            </td>
                            <td
                              className="px-6 py-1 whitespace-nowrap"
                              style={{ minWidth: "120px" }}
                            >
                              <div className="text-sm text-gray-900">
                                {items?.summery?.weightedRolling3YrMax}
                              </div>
                            </td>
                            <td
                              className="px-6 py-1 whitespace-nowrap"
                              style={{ minWidth: "120px" }}
                            >
                              <div className="text-sm text-gray-900">
                                {items?.summery?.weightedRolling3YrAvg}
                              </div>
                            </td>
                            <td
                              className="px-6 py-1 whitespace-nowrap"
                              style={{ minWidth: "120px" }}
                            >
                              <div className="text-sm text-gray-900">
                                {items?.summery?.weightedRolling3YrMin}
                              </div>
                            </td>
                            <td
                              className="px-6 py-1 whitespace-nowrap"
                              style={{ minWidth: "120px" }}
                            >
                              <div className="text-sm text-gray-900"></div>
                            </td>
                            <td
                              className="px-6 py-1 whitespace-nowrap"
                              style={{ minWidth: "120px" }}
                            >
                              <div className="text-sm text-gray-900"></div>
                            </td>
                            <td
                              className="px-6 py-1 whitespace-nowrap"
                              style={{ minWidth: "120px" }}
                            >
                              <div className="text-sm text-gray-900"></div>
                            </td>
                            <td
                              className="px-6 py-1 whitespace-nowrap"
                              style={{ minWidth: "120px" }}
                            >
                              <div className="text-sm text-gray-900"></div>
                            </td>

                            {/* Action column */}
                          </tr>
                        </>
                      ))}
                    </tbody>
                  </>
                )}
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600">
              No mutual funds match your filters. Try adjusting your criteria.
            </p>
            <button
              onClick={resetFilters}
              className="mt-4 px-4 py-2 bg-fuchsia-950 text-white rounded-md hover:bg-fuchsia-800"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Filter sidebar */}
      {isFilterOpen === true ? (
        <div
          className={`fixed inset-y-0 left-0 w-full sm:w-80 bg-gray-100 shadow-lg transform ${
            isFilterOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out z-50 overflow-y-auto`}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Filter</h2>
              <div
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer"
                aria-label="Close filter"
              >
                <Image
                  src={require("../assets/logo/CloseModal.png")}
                  alt="Close"
                  width={24}
                  height={24}
                />
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium">Category</h3>
              </div>
              {isFilterOpen && (
                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {categoriess?.map((category) => (
                    <div key={category} className="flex items-center">
                      <input
                        type="checkbox"
                        id={category}
                        className="mr-2 h-5 w-5"
                        checked={selectCategory == category}
                        onChange={() => handleCategoryChange(category)}
                      />
                      <label
                        htmlFor={category}
                        className="text-gray-600 text-sm"
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="p-4 border-t flex space-x-4">
              <button
                onClick={handleApplyFilters}
                className="flex-1 bg-fuchsia-950 text-white py-2 px-4 rounded-md hover:bg-fuchsia-800 transition duration-200"
              >
                Close Filter
              </button>
              <button
                onClick={resetFilters}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-200"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
