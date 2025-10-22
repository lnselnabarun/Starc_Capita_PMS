"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Chart } from "react-google-charts";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function DashboardMainNew() {
  const router = useRouter();

  //   useEffect(() => {
  //     const handleContextMenu = (event) => {
  //       event.preventDefault();
  //     };
  //     document.addEventListener('contextmenu', handleContextMenu);
  //     return () => {
  //       document.removeEventListener('contextmenu', handleContextMenu);
  //     };
  //   }, []);

  const [chartView, setChartView] = useState("investment");
  const [timeRange, setTimeRange] = useState("6M");
  const [DashboardData, SetDashboardData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [PortfolioData, setPortfolioData] = useState([]);
  const [balanceData, setBalanceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [RecentTransactions, setRecentTransactions] = useState([]);
  const [NewsData, SetNewsData] = useState([]);
  const [systematicTransactions, setSystematicTransactions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [result, setResult] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const [formData, setFormData] = useState({
    fundName: "",
    transactionType: "",
    sipStartDate: "",
    installments: "",
    frequency: "",
    amount: "",
    isin: "",
    selectedFundData: null,
  });

  useEffect(() => {
    if (
      balanceData?.currentValue &&
      DashboardData?.data?.totalNetExpenseRatio
    ) {
      const currentValue = balanceData.currentValue;
      const totalNetExpenseRatio = parseFloat(
        DashboardData.data.totalNetExpenseRatio
      );
      const calcResult = currentValue * totalNetExpenseRatio;
      setResult(calcResult);
    }
  }, [balanceData, DashboardData]);

  const fetchSearchResults = async (query) => {
    if (!query || query.length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearchLoading(true);
    try {
      const response = await fetch(
        "https://dev.netrumusa.com/starkcapital/api-backend/get-combineddata-withkeyword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ FSCBI_LegalName: query.toString() }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data?.status === "success") {
        setSearchResults(data?.data);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Search API Error:", error);
      setSearchResults([]);
    } finally {
      setIsSearchLoading(false);
    }
  };

  const fetchBalanceData = async () => {
    try {
      setLoading(true);
      setError(null);

      const userId = localStorage.getItem("UserId");
      if (!userId) {
        throw new Error("User ID not found in localStorage");
      }

      const response = await fetch(
        "https://dev.netrumusa.com/starkcapital/api-backend/my-balance",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_reg_id: userId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.status === "success") {
        setBalanceData(data?.data);
      }
    } catch (err) {
      setError(err.message);
      console.error("Error fetching balance data:", err);
    } finally {
      setLoading(false);
    }
  };

  async function GetNewsData() {
    try {
      const response = await axios({
        method: "get",
        url: "https://gnews.io/api/v4/search?q=finance&lang=en&country=in&max=5&apikey=17c29ee48fb5efc174029fd665646b59",
        headers: {
          "Content-Type": "application/json",
        },
      });
      SetNewsData(response?.data?.articles);
    } catch (error) {
      throw error;
    }
  }

  const fetchSystematicTransactions = async () => {
    try {
      const userId = localStorage.getItem("UserId");
      if (!userId) {
        console.error("User ID not found in localStorage");
        return;
      }

      const response = await fetch(
        "https://dev.netrumusa.com/starkcapital/api-backend/userlist-portfoliosip",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_reg_id: userId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.status === "success") {
        setSystematicTransactions(data.data);
      }
    } catch (error) {
      console.error("Error fetching systematic transactions:", error);
    }
  };

  useEffect(() => {
    fetchSystematicTransactions();
  }, []);

  const handleSaveSystematicTransaction = async () => {
    try {
      setIsSaving(true);
      const userId = localStorage.getItem("UserId");
      if (!userId) {
        alert("User ID not found. Please login again.");
        return;
      }

      const requestBody = {
        user_reg_id: userId,
        fund_name: formData.fundName,
        isin: formData?.isin,
        sip_start_date: formData.sipStartDate,
        sip_end_date: "",
        number_of_installments: formData.installments,
        frequency: formData.frequency,
        amount: formData.amount,
        transaction_type: formData?.transactionType,
      };

      const response = await fetch(
        "https://dev.netrumusa.com/starkcapital/api-backend/add-user-portfoliosip",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.status === "success") {
        alert("Systematic transaction added successfully!");
        setFormData({
          fundName: "",
          transactionType: "",
          sipStartDate: "",
          installments: "",
          frequency: "",
          amount: "",
          isin: "",
          selectedFundData: null,
        });
        setSearchResults([]);
        setIsModalOpen(false);
        fetchSystematicTransactions();
      }
    } catch (error) {
      console.error("Error saving systematic transaction:", error);
      alert("Error saving systematic transaction. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const formatDates = (dateString) => {
    if (!dateString || dateString === "0000-00-00") return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN");
  };

  useEffect(() => {
    const initializeData = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("myData");
        const userId = localStorage.getItem("UserId");
        if (!token) {
          setError("No authentication token found");
          return;
        }

        await GetDashboardData(JSON.parse(token)).then(() => {
          fetchFundDetails(JSON.parse(userId)).then(() =>
            GetRecentTrans(JSON.parse(token), JSON.parse(userId))
          );
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    initializeData();
  }, []);

  useEffect(() => {
    GetNewsData();
  }, []);

  async function GetDashboardData(token) {
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
      if (response.data?.status === "success") {
        SetDashboardData(response.data);
      }
    } catch (error) {
      throw error;
    }
  }

  const GetRecentTrans = async (token, userId) => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://dev.netrumusa.com/starkcapital/api-backend/last-transaction-list",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ user_id: userId }),
        }
      );
      const data = response.json().then((data) => {
        setRecentTransactions(data?.data);
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchFundDetails = async (fundId) => {
    try {
      const response = await fetch(
        "https://dev.netrumusa.com/starkcapital/api-backend/portfolio-XIRR-graph",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: fundId.toString() }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      console.log(data);

      if (data?.status === "success") {
        const processedData = data?.summaries
          .map((item) => ({
            date: item?.date,
            totalCost: parseFloat(item?.totalCost),
            currentValue: parseFloat(item?.currentValue),
            sensex: parseInt(item?.sensex),
            xirr: parseFloat(item?.xirr),
          }))
          .filter((item) => {
            return (
              item?.totalCost !== 0 &&
              item?.currentValue !== 0 &&
              item?.sensex !== 0 &&
              item?.xirr !== 0 &&
              item?.currentValue >= 1400000 // ✅ Remove records where currentValue < 1.4M
            );
          });

        processedData.sort((a, b) => new Date(a?.date) - new Date(b?.date));
        setPortfolioData(processedData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTransaction = async (transactionId) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this systematic transaction?"
      )
    ) {
      return;
    }

    try {
      setIsDeleting(true);
      const userId = localStorage.getItem("UserId");

      if (!userId) {
        alert("User ID not found. Please login again.");
        return;
      }

      const response = await fetch(
        "https://dev.netrumusa.com/starkcapital/api-backend/delete-user-portfoliosip",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: transactionId.toString(),
            user_reg_id: userId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.status === "success") {
        alert("Systematic transaction deleted successfully!");
        fetchSystematicTransactions();
      } else {
        alert(data.message || "Failed to delete systematic transaction");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction);
    setFormData({
      fundName: transaction?.fund_name || "",
      transactionType: transaction?.transaction_type || "",
      sipStartDate: transaction?.sip_start_date || "",
      installments: transaction?.number_of_installments || "",
      frequency: transaction?.frequency || "",
      amount: transaction?.amount || "",
      isin: transaction?.isin || "",
      selectedFundData: null,
    });
    setIsEditModalOpen(true);
  };

  const handleUpdateSystematicTransaction = async () => {
    try {
      setIsUpdating(true);
      const userId = localStorage.getItem("UserId");

      if (!userId) {
        alert("User ID not found. Please login again.");
        return;
      }

      const requestBody = {
        id: editingTransaction?.id,
        user_reg_id: userId,
        fund_name: formData?.fundName,
        isin: formData?.isin,
        sip_start_date: formData?.sipStartDate,
        sip_end_date: "",
        number_of_installments: formData?.installments,
        frequency: formData?.frequency,
        amount: formData?.amount,
        transaction_type: formData?.transactionType,
      };

      const response = await fetch(
        "https://dev.netrumusa.com/starkcapital/api-backend/update-user-portfoliosip",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.status === "success") {
        alert("Systematic transaction updated successfully!");
        setFormData({
          fundName: "",
          transactionType: "",
          sipStartDate: "",
          installments: "",
          frequency: "",
          amount: "",
          isin: "",
          selectedFundData: null,
        });
        setSearchResults([]);
        setIsEditModalOpen(false);
        setEditingTransaction(null);
        fetchSystematicTransactions();
      } else {
        alert(data.message || "Failed to update systematic transaction");
      }
    } catch (error) {
      console.error("Error updating systematic transaction:", error);
      alert("Error updating systematic transaction. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  function formatMoney(amount) {
    if (!amount) return "0.00";
    return new Intl.NumberFormat("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  }

  function formatToYYYYMMDD(dateString) {
    const dateObj = new Date(dateString);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // NEW CHART FUNCTIONS
  const generateChartData = (range, view) => {
    if (!PortfolioData || PortfolioData.length === 0) {
      if (view === "xirr") {
        return [["Date", "XIRR"]];
      }
      return [["Date", "Current Cost", "Current Value", "BSE500"]];
    }

    const allData = [...PortfolioData];
    const latestDate = new Date(allData[allData.length - 1].date);
    let filteredData = [];
    let cutoffDate = new Date(latestDate);

    switch (range) {
      case "5D":
        cutoffDate.setDate(cutoffDate.getDate() - 5);
        filteredData = allData.filter((d) => new Date(d.date) >= cutoffDate);
        break;
      case "1M":
        cutoffDate.setMonth(cutoffDate.getMonth() - 1);
        filteredData = allData.filter((d) => new Date(d.date) >= cutoffDate);
        break;
      case "6M":
        cutoffDate.setMonth(cutoffDate.getMonth() - 6);
        filteredData = allData.filter((d) => new Date(d.date) >= cutoffDate);
        break;
      case "YTD":
        const yearStart = new Date(latestDate.getFullYear(), 0, 1);
        filteredData = allData.filter((d) => new Date(d.date) >= yearStart);
        break;
      case "1Y":
        cutoffDate.setFullYear(cutoffDate.getFullYear() - 1);
        filteredData = allData.filter((d) => new Date(d.date) >= cutoffDate);
        break;
      case "5Y":
        cutoffDate.setFullYear(cutoffDate.getFullYear() - 5);
        filteredData = allData.filter((d) => new Date(d.date) >= cutoffDate);
        break;
      case "MAX":
        filteredData = allData;
        break;
      default:
        filteredData = allData;
        break;
    }

    console.log(cutoffDate, filteredData, "cutoffDate");

    if (filteredData.length === 0) {
      filteredData = [allData[allData.length - 1]];
    }

    if (view === "xirr") {
      const data = [["Date", "XIRR"]];
      filteredData.forEach((item) => {
        const date = new Date(item.date);
        data.push([date, item.xirr]);
      });
      return data;
    }

    const data = [["Date", "Current Cost", "Current Value", "BSE500"]];
    filteredData.forEach((item) => {
      const date = new Date(item.date);
      data.push([date, item.totalCost, item.currentValue, item.sensex]);
    });

    return data;
  };

  //   const calculateStats = () => {
  //     if (!PortfolioData || PortfolioData.length === 0) {
  //       return [];
  //     }

  //     const latest = PortfolioData[PortfolioData.length - 1];
  //     const previous = PortfolioData[PortfolioData.length - 2] || latest;

  //     const portfolioChange = latest.currentValue - previous.currentValue;
  //     const portfolioPercent = (
  //       (portfolioChange / previous.currentValue) *
  //       100
  //     ).toFixed(2);

  //     const sensexChange =
  //       latest.sensex > 0 && previous.sensex > 0
  //         ? latest.sensex - previous.sensex
  //         : 0;
  //     const sensexPercent =
  //       previous.sensex > 0
  //         ? ((sensexChange / previous.sensex) * 100).toFixed(2)
  //         : "0.00";

  //     const xirrChange = latest.xirr - previous.xirr;
  //     const xirrPercent = ((xirrChange / Math.abs(previous.xirr)) * 100).toFixed(
  //       2
  //     );

  //     return [
  //       {
  //         name: "Portfolio Value",
  //         value: latest.currentValue.toLocaleString("en-IN", {
  //           maximumFractionDigits: 2,
  //         }),
  //         change:
  //           portfolioChange >= 0
  //             ? `+${portfolioChange.toFixed(2)}`
  //             : portfolioChange.toFixed(2),
  //         percent: `${portfolioPercent}%`,
  //         color: "#00bcd4",
  //       },
  //       {
  //         name: "BSE500",
  //         value:
  //           latest.sensex > 0
  //             ? latest.sensex.toLocaleString("en-IN", {
  //                 maximumFractionDigits: 2,
  //               })
  //             : "N/A",
  //         change:
  //           sensexChange >= 0
  //             ? `+${sensexChange.toFixed(2)}`
  //             : sensexChange.toFixed(2),
  //         percent: `${sensexPercent}%`,
  //         color: "#9c27b0",
  //       },
  //       {
  //         name: "Total Cost",
  //         value: latest.totalCost.toLocaleString("en-IN", {
  //           maximumFractionDigits: 2,
  //         }),
  //         change: "0.00",
  //         percent: "0.00%",
  //         color: "#2196f3",
  //       },
  //       {
  //         name: "XIRR",
  //         value: `${latest.xirr.toFixed(2)}%`,
  //         change:
  //           xirrChange >= 0 ? `+${xirrChange.toFixed(2)}` : xirrChange.toFixed(2),
  //         percent: `${xirrPercent}%`,
  //         color: "#ff9800",
  //       },
  //     ];
  //   };

  const chartData = generateChartData(timeRange, chartView);
  //   const stockData = PortfolioData.length > 0 ? calculateStats() : [];

  const chartOptions =
    chartView === "xirr"
      ? {
          curveType: "function",
          legend: { position: "bottom" },
          chartArea: { width: "90%", height: "75%", top: 20 },
          hAxis: {
            format: "MMM dd",
            gridlines: { color: "transparent" }, // Changed from "#f0f0f0" to "transparent"
            textStyle: { color: "#666", fontSize: 11 },
          },
          vAxis: {
            title: "",
            gridlines: { color: "#f0f0f0" },
            textStyle: { color: "#666", fontSize: 11 },
            format: "#'%'",
          },
          colors: ["#10b981"],
          lineWidth: 2,
          backgroundColor: "white",
          tooltip: { isHtml: true },
        }
      : {
          curveType: "function",
          legend: { position: "bottom" },
          chartArea: { width: "90%", height: "75%", top: 20 },
          hAxis: {
            format: "MMM dd",
            gridlines: { color: "transparent" }, // Changed from "#f0f0f0" to "transparent"
            textStyle: { color: "#666", fontSize: 11 },
          },
          vAxis: {
            title: "",
            gridlines: { color: "#f0f0f0" },
            textStyle: { color: "#666", fontSize: 11 },
            format: "short",
          },
          colors: ["#1e40af", "#dc2626", "#f59e0b"],
          lineWidth: 2,
          backgroundColor: "white",
          tooltip: { isHtml: true },
        };

  const timeRanges = ["5D", "1M", "6M", "YTD", "1Y", "5Y", "MAX"];

  const getTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case "purchase":
        return "bg-green-100 text-green-700";
      case "redemption":
        return "bg-red-100 text-red-700";
      case "sip":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const getGainLossText = () => {
    if (!balanceData) return "Gain";
    return balanceData.todaysGain < 0 ? "Loss" : "Gain";
  };

  useEffect(() => {
    fetchBalanceData();
  }, []);

  const formatCurrency = (amount) => {
    if (amount === null || amount === undefined) return "₹0";
    return `₹${Math.abs(amount).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <>
      <div className="flex flex-col md:flex-row w-full justify-between px-4 sm:px-6 lg:px-28">
        <div className="w-full md:w-[70%] flex flex-wrap gap-4 justify-between">
          {/* Card 1 */}
          <div className="relative flex-1 min-w-[200px] max-w-[275px] bg-white border border-[#D9D9D9] rounded-lg p-2 h-[100px] sm:h-[110px] md:h-[120px]">
            <div className="flex items-center mb-3">
              <Image
                src={require("../assets/logo/Bitcoin.png")} // Replace with your icon path
                alt="Search Icon"
                width={20} // Icon width
                height={20} // Icon height
              />
              <p className="text-xs sm:text-sm font-medium text-[#6E7499] ml-1">
                Current Value
              </p>
            </div>
            <div className="mb-3">
              <p className="text-sm sm:text-base md:text-lg font-semibold text-[#2B2B2B] ml-0 sm:ml-1">
                {`₹ ${formatMoney(
                  PortfolioData[PortfolioData.length - 1]?.currentValue
                )}`}
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative flex-1 min-w-[160px] max-w-[275px] bg-white border border-[#D9D9D9] rounded-lg p-2 h-[100px] sm:h-[110px] md:h-[120px]">
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
            <div className="mb-3">
              <p className="text-sm sm:text-base md:text-lg font-semibold text-[#2B2B2B] ml-0 sm:ml-1">
                {`₹ ${formatMoney(
                  PortfolioData[PortfolioData.length - 1]?.totalCost
                )}`}
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative flex-1 min-w-[160px] max-w-[275px] bg-white border border-[#D9D9D9] rounded-lg p-2 h-[100px] sm:h-[110px] md:h-[120px]">
            <div className="flex items-center mb-3">
              <Image
                src={require("../assets/logo/Icon2.png")} // Replace with your icon path
                alt="Search Icon"
                width={20} // Icon width
                height={20} // Icon height
              />
              <p className="text-xs sm:text-sm font-medium text-[#6E7499] ml-1">
                Current XIRR
              </p>
            </div>
            <div className="mb-3">
              <p className="text-sm sm:text-base md:text-lg font-semibold text-[#2B2B2B] ml-0 sm:ml-1">
                {`${formatMoney(
                  PortfolioData[PortfolioData.length - 1]?.xirr
                )}%`}
              </p>
            </div>
          </div>

          {/* NEW CHART SECTION */}
          <div className="w-full flex flex-wrap gap-4 h-auto p-4 rounded-lg border-[1.5px] border-[#D9D9D9]">
            <div className="justify-between w-full flex flex-wrap gap-4 h-auto">
              <div className="flex flex-col items-start space-y-2">
                <div className="font-medium text-lg sm:text-xl md:text-2xl text-[#3F4765] font-sans">
                  Investment Graph
                </div>
              </div>

              {/* Investment/XIRR Toggle buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={() => setChartView("investment")}
                  className={`text-[#9FA8C7] px-4 py-2 rounded-2xl border text-sm ${
                    chartView === "investment"
                      ? "bg-[#ECEFF9] border-[#E5EBEF] text-[#3F4765] font-medium"
                      : "border-[#E5EBEF]"
                  }`}
                >
                  Investment
                </button>
                <button
                  onClick={() => setChartView("xirr")}
                  className={`text-[#9FA8C7] px-4 py-2 rounded-2xl border text-sm ${
                    chartView === "xirr"
                      ? "bg-[#ECEFF9] border-[#E5EBEF] text-[#3F4765] font-medium"
                      : "border-[#E5EBEF]"
                  }`}
                >
                  XIRR
                </button>
              </div>
            </div>

            {/* Time Range Selector */}
            <div className="w-full flex gap-2 overflow-x-auto pb-2 border-b border-gray-200">
              {timeRanges.map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-2 text-sm whitespace-nowrap transition-all ${
                    timeRange === range
                      ? "bg-white text-black font-bold border-b-3 border-red-600"
                      : "bg-transparent text-gray-600"
                  }`}
                  style={
                    timeRange === range
                      ? { borderBottom: "3px solid #d32f2f" }
                      : {}
                  }
                >
                  {range}
                </button>
              ))}
            </div>

            <div className="w-full flex flex-col lg:flex-row gap-4">
              {/* Chart */}
              <div className="flex-1 min-h-[400px]">
                {isLoading ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <p>Loading chart data...</p>
                  </div>
                ) : error ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <p>Error loading chart: {error}</p>
                  </div>
                ) : (
                  <Chart
                    chartType="LineChart"
                    width="100%"
                    height="400px"
                    data={chartData}
                    options={chartOptions}
                  />
                )}
              </div>

              {/* Stats Panel */}
              {/* <div className="w-full lg:w-64 flex flex-col gap-4">
                {stockData.map((stock, index) => (
                  <div key={index} className="flex items-center gap-3 text-sm">
                    <div 
                      className="w-1 h-5 rounded"
                      style={{ backgroundColor: stock.color }}
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-800 mb-1">
                        {stock.name}
                      </div>
                      <div className="flex gap-2 text-xs">
                        <span className="text-gray-600">{stock.value}</span>
                        <span className={stock.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                          {stock.change}
                        </span>
                        <span className={stock.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                          {stock.change.startsWith('+') ? '▲' : '▼'}{stock.percent}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div> */}
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="container mx-auto px-4 py-6 max-w-6xl">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-slate-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">
                  Recent Transactions
                </h2>
              </div>

              <div className="hidden md:block">
                <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200 items-center">
                  <div className="col-span-2 text-xs font-semibold uppercase tracking-wide text-gray-600">
                    Date
                  </div>
                  <div className="col-span-6 text-xs font-semibold uppercase tracking-wide text-gray-600">
                    Fund Name
                  </div>
                  <div className="col-span-2 text-xs font-semibold uppercase tracking-wide text-gray-600">
                    Type
                  </div>
                  <div className="col-span-2 text-xs font-semibold uppercase tracking-wide text-gray-600 text-right">
                    Amount
                  </div>
                </div>

                <div className="divide-y divide-gray-200">
                  {RecentTransactions.map((row, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors duration-150 items-center"
                    >
                      <div className="col-span-2 text-sm font-medium text-gray-900">
                        {new Date(row.transaction_date).toLocaleDateString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </div>
                      <div className="col-span-6 text-sm text-gray-700">
                        <div
                          className="font-medium line-clamp-2"
                          title={row.scheme}
                        >
                          {row.scheme}
                        </div>
                      </div>
                      <div className="col-span-2">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(
                            row.transaction_type
                          )}`}
                        >
                          {row.transaction_type}
                        </span>
                      </div>
                      <div className="col-span-2 text-sm font-semibold text-gray-900 text-right">
                        {`₹${formatMoney(row.amount)}`}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:hidden">
                <div className="divide-y divide-gray-200">
                  {RecentTransactions.map((row, index) => (
                    <div
                      key={index}
                      className="p-4 hover:bg-gray-50 transition-colors duration-150"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="text-sm font-medium text-gray-900">
                          {new Date(row.transaction_date).toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </div>
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(
                            row.transaction_type
                          )}`}
                        >
                          {row.transaction_type}
                        </span>
                      </div>
                      <div className="text-sm text-gray-700 mb-2 line-clamp-2">
                        {row.scheme}
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-semibold text-gray-900">
                          {row.amount}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {RecentTransactions.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-2">
                    <svg
                      className="mx-auto h-12 w-12"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-500 text-sm">No transactions found</p>
                </div>
              )}
            </div>
          </div>

          {/* Systematic Transactions */}
          <div className="justify-between w-full flex flex-wrap gap-4 h-auto mb-2">
            <div className="flex flex-col items-start space-y-2">
              <div className="font-medium text-lg sm:text-xl md:text-2xl text-[#3F4765] font-sans">
                Systematic Transactions
              </div>
            </div>

            <div className="flex gap-4">
              <div
                onClick={() => setIsModalOpen(true)}
                className="border bg-gray-100 text-gray-700 rounded-3xl text-xs sm:text-sm lg:text-base px-4 py-2 focus:outline-none focus:ring-2 focus:ring-fuchsia-700 hover:bg-gray-200 flex justify-center items-center cursor-pointer"
              >
                Add New
              </div>
            </div>
          </div>

          <div className="container mx-auto px-4 py-6">
            {systematicTransactions.length > 0 && (
              <div className="hidden md:block">
                <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] text-left p-3 bg-[#F5F5F5] rounded-lg gap-4 ">
                  <div className="text-xs font-normal leading-6 text-[#848CA9]">
                    FUND NAME
                  </div>
                  <div className="text-xs font-normal leading-6 text-[#848CA9] text-center">
                    TYPE
                  </div>
                  <div className="text-xs font-normal leading-6 text-[#848CA9]">
                    START DATE
                  </div>
                  <div className="text-xs font-normal leading-6 text-[#848CA9]">
                    FREQUENCY
                  </div>
                  <div className="text-xs font-normal leading-6 text-[#848CA9]">
                    AMOUNT (₹)
                  </div>
                  <div className="text-xs font-normal leading-6 text-[#848CA9]">
                    ACTION
                  </div>
                </div>
              </div>
            )}

            {systematicTransactions.length > 0 ? (
              systematicTransactions.map((row, index) => (
                <React.Fragment key={index}>
                  <div className="hidden md:block">
                    <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] bg-white text-left p-3 my-2 items-center rounded-lg gap-4 shadow-sm">
                      <div className="text-sm text-gray-700">
                        {row.fund_name}
                      </div>
                      <div className="text-sm text-gray-700 text-center">
                        {row.transaction_type || "N/A"}
                      </div>
                      <div className="text-sm text-gray-700">
                        {formatDate(row.sip_start_date)}
                      </div>
                      <div className="text-sm text-gray-700">
                        {row.frequency}
                      </div>
                      <div className="text-sm text-gray-700">
                        ₹{row.amount.toLocaleString("en-IN")}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditTransaction(row)}
                          className="text-[#35B26B] border border-[#35B26B] rounded-md p-2 hover:bg-[#e8f5eb] transition-colors"
                          title="Edit"
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDeleteTransaction(row.id)}
                          disabled={isDeleting}
                          className={`text-[#dc2626] border border-[#dc2626] rounded-md p-2 hover:bg-[#fef2f2] transition-colors ${
                            isDeleting ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                          title={isDeleting ? "Deleting..." : "Delete"}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="m3 6 3 0"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                            <path
                              d="m21 6-3 0"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                            <path
                              d="m18 6-.84 12.63a1 1 0 0 1-1 .84H7.89a1 1 0 0 1-1-.84L6 6"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="m8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="md:hidden">
                    <div className="p-4 bg-white rounded-lg shadow-sm mb-2 hover:bg-gray-50 transition-colors">
                      <div className="text-sm text-gray-700 mb-2">
                        {formatDate(row.sip_start_date)} ({row.frequency})
                      </div>
                      <div className="flex justify-between items-start mb-2">
                        <div className="text-sm font-medium text-gray-900">
                          {row.fund_name}
                        </div>
                        <span className="text-xs px-2 py-1 bg-gray-100 rounded">
                          {row.transaction_type || "N/A"}
                        </span>
                      </div>
                      <div className="text-sm text-gray-700 mb-2">
                        ₹{row.amount.toLocaleString("en-IN")}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditTransaction(row)}
                          className="text-[#35B26B] border border-[#35B26B] rounded-md p-2 hover:bg-[#e8f5eb] transition-colors"
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDeleteTransaction(row.id)}
                          disabled={isDeleting}
                          className={`text-[#dc2626] border border-[#dc2626] rounded-md p-2 hover:bg-[#fef2f2] transition-colors ${
                            isDeleting ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="m3 6 3 0"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                            <path
                              d="m21 6-3 0"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                            <path
                              d="m18 6-.84 12.63a1 1 0 0 1-1 .84H7.89a1 1 0 0 1-1-.84L6 6"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="m8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No systematic transactions found
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full md:w-[27%] bg-[#f5f5f5] p-1 sm:p-2 rounded-lg">
          <div className="flex items-center space-x-4 justify-between">
            <div className="font-sans text-lg sm:text-base md:text-lg font-semibold leading-5 text-left text-[#3F4765] mt-1">
              My Balance
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between space-x-0 sm:space-x-4 mt-3">
            <div
              className={`relative rounded-lg p-1 sm:p-2 w-full sm:w-[48%] h-auto ${
                getGainLossText() === "Gain" ? "bg-[#60BC63]" : "bg-red-500"
              }`}
            >
              <div className="flex flex-col space-y-2">
                <div className="text-white font-semibold text-sm sm:text-sm md:text-sm">
                  {`Today's ${getGainLossText()}`}
                </div>
              </div>
              <div className="border-t border-dashed border-white my-4"></div>
              <div className="flex flex-col space-y-2">
                <div className="text-white font-semibold text-base sm:text-sm md:text-base">
                  {balanceData ? formatCurrency(balanceData?.todaysGain) : "₹0"}
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
            </div>

            <div className="relative bg-[#FFBA33] rounded-lg p-1 sm:p-2 w-full sm:w-[48%] h-auto mt-2 sm:mt-0">
              <div className="flex flex-col space-y-2">
                <div className="text-white font-semibold text-sm sm:text-sm md:text-sm">
                  Expense Ratio (%)
                </div>
              </div>
              <div className="border-t border-dashed border-white my-4"></div>
              <div className="flex flex-col space-y-2">
                <div className="text-white font-semibold text-base sm:text-sm md:text-base">
                  {result !== null ? balanceData?.weightedExpenseRatio : "₹0"}
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
            </div>
          </div>

          <div className="flex items-center space-x-4 justify-between mt-4">
            <div className="font-sans text-lg sm:text-base md:text-lg font-semibold leading-5 text-left text-[#3F4765]">
              Change (This Month)
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between space-x-0 sm:space-x-4 mt-3">
            <div className="relative rounded-lg p-1 sm:p-2 w-full sm:w-[48%] h-auto bg-[#783c6a]">
              <div className="flex flex-col space-y-2">
                <div className="text-white font-semibold text-sm">
                  Current Value
                </div>
              </div>
              <div className="border-t border-dashed border-white my-4"></div>
              <div className="flex flex-col space-y-2">
                <div className="text-white font-semibold text-base">
                  {balanceData ? `${balanceData?.currentValueChanges}%` : "0 %"}
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
            </div>

            <div className="relative bg-[#783c6a] rounded-lg p-1 sm:p-2 w-full sm:w-[48%] h-auto mt-2 sm:mt-0">
              <div className="flex flex-col space-y-2">
                <div className="text-white font-semibold text-sm">BSE500</div>
              </div>
              <div className="border-t border-dashed border-white my-4"></div>
              <div className="flex flex-col space-y-2">
                <div className="text-white font-semibold text-base">
                  {result !== null ? `${balanceData?.BSE500Changes} %` : "0 %"}
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
            </div>
          </div>

          <div
            onClick={() => router.push("/Newslist")}
            className="flex items-center space-x-4 justify-between mt-6 p-4 rounded-lg transition-all duration-300 ease-in-out hover:bg-gray-100 hover:shadow-md cursor-pointer"
          >
            <div className="font-sans text-lg sm:text-base md:text-lg font-medium leading-5 text-left text-[#3F4765]">
              News
            </div>
            <div className="font-sans text-sm sm:text-base md:text-sm font-medium leading-5 text-left text-[#969CCB]">
              See All
            </div>
          </div>

          {NewsData?.map((item, idx) => (
            <div
              key={idx}
              className="flex justify-between items-start flex-row mt-4"
            >
              <div className="flex items-center space-x-4 w-[70%]">
                <div className="flex flex-col">
                  <p className="text-sm font-medium text-[#3F4765] line-clamp-3 leading-5">
                    {item?.content}
                  </p>
                  <p className="text-xs font-light text-[#A2A9C7] mt-1">
                    {item?.source?.name}
                  </p>
                </div>
              </div>
              <div className="flex-shrink-0">
                <img
                  src={item?.image}
                  alt="News thumbnail"
                  className="h-10 w-10 md:h-16 md:w-16 bg-[#C4C4C4] border border-gray-300 rounded-md object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-[#3F4765]">
                Add New Systematic Transaction
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#3F4765] mb-1">
                  Fund Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.fundName}
                    onChange={(e) => {
                      setFormData({ ...formData, fundName: e.target.value });
                      fetchSearchResults(e.target.value);
                    }}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Search fund name..."
                  />
                  {isSearchLoading && (
                    <div className="absolute right-2 top-2">
                      <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                    </div>
                  )}
                  {searchResults.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto">
                      {searchResults.map(
                        (result, index) =>
                          result?.FSCBI_ISIN !== null && (
                            <div
                              key={index}
                              onClick={() => {
                                setFormData({
                                  ...formData,
                                  fundName: result.FSCBI_LegalName,
                                  isin: result?.FSCBI_ISIN,
                                  selectedFundData: result,
                                });
                                setSearchResults([]);
                              }}
                              className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                            >
                              {result.FSCBI_LegalName}
                            </div>
                          )
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#3F4765] mb-1">
                  Transaction Type
                </label>
                <select
                  value={formData.transactionType}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      transactionType: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Type</option>
                  <option value="SIP">SIP</option>
                  <option value="STP">STP</option>
                  <option value="SWP">SWP</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#3F4765] mb-1">
                  SIP Start Date
                </label>
                <input
                  type="date"
                  value={formData.sipStartDate}
                  onChange={(e) =>
                    setFormData({ ...formData, sipStartDate: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#3F4765] mb-1">
                  No. of Installments
                </label>
                <input
                  type="number"
                  value={formData.installments}
                  onChange={(e) =>
                    setFormData({ ...formData, installments: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter number of installments"
                  min="1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#3F4765] mb-1">
                  Frequency
                </label>
                <select
                  value={formData.frequency}
                  onChange={(e) =>
                    setFormData({ ...formData, frequency: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Frequency</option>
                  <option value="Daily">Daily</option>
                  <option value="Once a week">Once a week</option>
                  <option value="Once a Month">Once a Month</option>
                  <option value="Once a Year">Once a Year</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#3F4765] mb-1">
                  Amount (₹)
                </label>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter amount"
                  min="1"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveSystematicTransaction}
                  disabled={isSaving}
                  className={`flex-1 px-4 py-2 rounded-md ${
                    isSaving
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  } text-white`}
                >
                  {isSaving ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-[#3F4765]">
                Edit Systematic Transaction
              </h2>
              <button
                onClick={() => {
                  setIsEditModalOpen(false);
                  setEditingTransaction(null);
                  setFormData({
                    fundName: "",
                    transactionType: "",
                    sipStartDate: "",
                    installments: "",
                    frequency: "",
                    amount: "",
                    isin: "",
                    selectedFundData: null,
                  });
                  setSearchResults([]);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#3F4765] mb-1">
                  Fund Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.fundName}
                    onChange={(e) => {
                      setFormData({ ...formData, fundName: e.target.value });
                      fetchSearchResults(e.target.value);
                    }}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Search fund name..."
                  />
                  {isSearchLoading && (
                    <div className="absolute right-2 top-2">
                      <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                    </div>
                  )}
                  {searchResults.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto">
                      {searchResults.map(
                        (result, index) =>
                          result?.FSCBI_ISIN !== null && (
                            <div
                              key={index}
                              onClick={() => {
                                setFormData({
                                  ...formData,
                                  fundName: result.FSCBI_LegalName,
                                  isin: result?.FSCBI_ISIN,
                                  selectedFundData: result,
                                });
                                setSearchResults([]);
                              }}
                              className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                            >
                              {result.FSCBI_LegalName}
                            </div>
                          )
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#3F4765] mb-1">
                  Transaction Type
                </label>
                <select
                  value={formData.transactionType}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      transactionType: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Type</option>
                  <option value="SIP">SIP</option>
                  <option value="STP">STP</option>
                  <option value="SWP">SWP</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#3F4765] mb-1">
                  SIP Start Date
                </label>
                <input
                  type="date"
                  value={formatToYYYYMMDD(formData.sipStartDate)}
                  onChange={(e) =>
                    setFormData({ ...formData, sipStartDate: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#3F4765] mb-1">
                  No. of Installments
                </label>
                <input
                  type="number"
                  value={formData.installments}
                  onChange={(e) =>
                    setFormData({ ...formData, installments: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter number of installments"
                  min="1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#3F4765] mb-1">
                  Frequency
                </label>
                <select
                  value={formData.frequency}
                  onChange={(e) =>
                    setFormData({ ...formData, frequency: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Frequency</option>
                  <option value="Daily">Daily</option>
                  <option value="Once a week">Once a week</option>
                  <option value="Once a Month">Once a Month</option>
                  <option value="Once a Year">Once a Year</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#3F4765] mb-1">
                  Amount (₹)
                </label>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter amount"
                  min="1"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setEditingTransaction(null);
                    setFormData({
                      fundName: "",
                      transactionType: "",
                      sipStartDate: "",
                      installments: "",
                      frequency: "",
                      amount: "",
                      isin: "",
                      selectedFundData: null,
                    });
                    setSearchResults([]);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleUpdateSystematicTransaction}
                  disabled={isUpdating}
                  className={`flex-1 px-4 py-2 rounded-md ${
                    isUpdating
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  } text-white`}
                >
                  {isUpdating ? "Updating..." : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
