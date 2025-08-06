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
import moment from "moment";

export default function DashboardMain() {
  const router = useRouter();

  const [chartView, setChartView] = useState("investment"); // "investment" or "xirr"
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

  // Add this useEffect to log the calculation
  useEffect(() => {
    if (balanceData?.currentValue && DashboardData?.data?.totalNetExpenseRatio) {
      const currentValue = balanceData.currentValue;
      const totalNetExpenseRatio = parseFloat(DashboardData.data.totalNetExpenseRatio);
      const calcResult = currentValue * totalNetExpenseRatio;

      console.log("currentValue * totalNetExpenseRatio:", calcResult);
      console.log("Calculation details:", {
        currentValue,
        totalNetExpenseRatio,
        result: calcResult
      });

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
      console.log(data?.data, "formattedResultsformattedResults");
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

      console.log("Sending data:", requestBody);

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
      console.log(data, "datadata");

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
    console.log(
      JSON.stringify({ user_id: userId.toString() }),
      token,
      "GetRecentTrans"
    );
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
        console.log(data?.data, "0000000"), setRecentTransactions(data?.data);
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

      if (data?.status === "success") {
        const processedData = data?.summaries.map((item) => ({
          date: item?.date,
          totalCost: parseFloat(item?.totalCost),
          currentValue: parseFloat(item?.currentValue),
          sensex: parseInt(item?.sensex),
          xirr: parseFloat(item?.xirr),
        }));

        processedData.sort((a, b) => new Date(a.date) - new Date(b.date));
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
      fundName: transaction.fund_name || "",
      transactionType: transaction.transaction_type || "",
      sipStartDate: transaction.sip_start_date || "",
      installments: transaction.number_of_installments || "",
      frequency: transaction.frequency || "",
      amount: transaction.amount || "",
      isin: transaction.isin || "",
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
        id: editingTransaction.id,
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

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded shadow-md">
          <p className="font-bold">
            { new Date(label).toLocaleDateString("en-IN", {
              year: "numeric",
              month: "short",
              day: "numeric",
            }) }
          </p>

          { chartView === "xirr" ? (
            <p className="text-green-600">XIRR: { payload[0]?.value || 0 }%</p>
          ) : (
            <>
              <p className="text-blue-600">
                Current Cost: ₹
                { Number(payload[0]?.value || 0).toLocaleString("en-IN") }
              </p>
              <p className="text-red-600">
                Current Value: ₹
                { Number(payload[1]?.value || 0).toLocaleString("en-IN") }
              </p>
              <p className="text-yellow-600">
                Sensex: { Number(payload[2]?.value || 0).toLocaleString("en-IN") }
              </p>
            </>
          ) }
        </div>
      );
    }
    return null;
  };

  const formatYAxis = (value) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
    return value;
  };

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

  console.log(formData, "formData");
  return (
    <>
      <div className="flex flex-col md:flex-row w-full justify-between px-4 sm:px-6 lg:px-28">
        {/* First div with 70% width on medium and larger screens */ }
        <div className="w-full md:w-[70%] flex flex-wrap gap-4 justify-between">
          {/* Card 1 */ }
          <div className="relative flex-1 min-w-[200px] max-w-[275px] bg-white border border-[#D9D9D9] rounded-lg p-2 h-[100px] sm:h-[110px] md:h-[120px]">
            {/* Row 1 */ }
            <div className="flex items-center mb-3">
              <Image
                src={ require("../assets/logo/Bitcoin.png") } // Replace with your icon path
                alt="Search Icon"
                width={ 20 } // Icon width
                height={ 20 } // Icon height
              />
              <p className="text-xs sm:text-sm font-medium text-[#6E7499] ml-1">
                Current Value
              </p>
            </div>

            {/* Row 2 */ }
            <div className="mb-3">
              <p className="text-sm sm:text-base md:text-lg font-semibold text-[#2B2B2B] ml-0 sm:ml-1">
                { `₹ ${formatMoney(
                  PortfolioData[PortfolioData.length - 1]?.currentValue
                )}` }
              </p>
            </div>

            {/* Row 3 */ }
            <div></div>
          </div>

          {/* Card 2 */ }
          <div className="relative flex-1 min-w-[160px] max-w-[275px] bg-white border border-[#D9D9D9] rounded-lg p-2 h-[100px] sm:h-[110px] md:h-[120px]">
            {/* Row 1 */ }
            <div className="flex items-center mb-3">
              <Image
                src={ require("../assets/logo/Icon1.png") } // Replace with your icon path
                alt="Search Icon"
                width={ 20 } // Icon width
                height={ 20 } // Icon height
              />
              <p className="text-xs sm:text-sm font-medium text-[#6E7499] ml-1">
                Current Cost
              </p>
            </div>

            {/* Row 2 */ }
            <div className="mb-3">
              <p className="text-sm sm:text-base md:text-lg font-semibold text-[#2B2B2B] ml-0 sm:ml-1">
                { `₹ ${formatMoney(
                  PortfolioData[PortfolioData.length - 1]?.totalCost
                )}` }
              </p>
            </div>
          </div>

          {/* Card 3 */ }
          <div className="relative flex-1 min-w-[160px] max-w-[275px] bg-white border border-[#D9D9D9] rounded-lg p-2 h-[100px] sm:h-[110px] md:h-[120px]">
            {/* Row 1 */ }
            <div className="flex items-center mb-3">
              <Image
                src={ require("../assets/logo/Icon2.png") } // Replace with your icon path
                alt="Search Icon"
                width={ 20 } // Icon width
                height={ 20 } // Icon height
              />
              <p className="text-xs sm:text-sm font-medium text-[#6E7499] ml-1">
                Current XIRR
              </p>
            </div>

            {/* Row 2 */ }
            <div className="mb-3">
              <p className="text-sm sm:text-base md:text-lg font-semibold text-[#2B2B2B] ml-0 sm:ml-1">
                { `₹ ${formatMoney(
                  PortfolioData[PortfolioData.length - 1]?.xirr
                )}` }
              </p>
            </div>
          </div>
          {/* {chart section} */ }
          <div className="w-full flex flex-wrap gap-4 h-auto p-4 rounded-lg border-[1.5px] border-[#D9D9D9] ">
            {/* First Content: Bold Text */ }
            <div className="justify-between w-full flex flex-wrap gap-4 h-auto">
              <div className="flex flex-col items-start space-y-2">
                <div className="font-medium text-lg sm:text-xl md:text-2xl text-[#3F4765] font-sans">
                  Investment Graph
                </div>
              </div>

              {/* Toggle buttons */ }
              <div className="flex space-x-4">
                <button
                  onClick={ () => setChartView("investment") }
                  className={ `text-[#9FA8C7] px-4 py-2 rounded-2xl border text-sm ${chartView === "investment"
                    ? "bg-[#ECEFF9] border-[#E5EBEF] text-[#3F4765] font-medium"
                    : "border-[#E5EBEF]"
                    }` }
                >
                  Investment
                </button>

                <button
                  onClick={ () => setChartView("xirr") }
                  className={ `text-[#9FA8C7] px-4 py-2 rounded-2xl border text-sm ${chartView === "xirr"
                    ? "bg-[#ECEFF9] border-[#E5EBEF] text-[#3F4765] font-medium"
                    : "border-[#E5EBEF]"
                    }` }
                >
                  XIRR
                </button>
              </div>
            </div>

            <div className="w-full flex flex-wrap gap-4 h-auto p-4 rounded-lg">
              { " " }
              <div className="w-full h-96">
                { isLoading ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <p>Loading chart data...</p>
                  </div>
                ) : error ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <p>Error loading chart: { error }</p>
                  </div>
                ) : (
                  // Complete LineChart component with proper tooltip display for each view
                  <>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={ PortfolioData }
                        margin={ {
                          top: 10,
                          right: 30,
                          left: 20,
                          bottom: 10, // Reduced bottom margin since we're hiding XAxis
                        } }
                      >
                        <CartesianGrid strokeDasharray="3 3" opacity={ 0.3 } />

                        {/* Hidden XAxis that still provides positioning */ }
                        {/* <XAxis
                          dataKey="date"
                          axisLine={ true }
                          tickLine={ true }
                          tick={ true }
                          height={ 50 }
                          tickFormatter={ (dateStr) => {
                            const date = new Date(dateStr);
                            return date.toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric'
                            }).toUpperCase().replace(' ', '-');
                          } }
                        /> */}
                        <XAxis
                          dataKey="date"
                          axisLine={ true }
                          tickLine={ true }
                          tick={ true }
                          height={ 50 }
                          tickFormatter={ (dateStr) => {
                            const date = new Date(dateStr);
                            return date.toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric'
                            }).toLowerCase().split(' ').map(function (word) {
                              return (word.charAt(0).toUpperCase() + word.slice(1));
                            }).join(' ').replace(' ', '-');
                          } }
                          ticks={ PortfolioData
                            .filter((_, index) => index % 2 === 0)
                            .map(item => item.date)
                          }
                          interval={ 0 }
                        />

                        { chartView === "xirr" ? (
                          <>
                            <YAxis
                              yAxisId="right"
                              orientation="right"
                              tickFormatter={ (value) => `${value}%` }
                              domain={ [0, 30] }
                            />
                            <Tooltip
                              content={ ({ active, payload, label }) => {
                                if (active && payload && payload.length) {
                                  // Use payload[0].payload.date instead of label
                                  const date = payload[0].payload.date;
                                  return (
                                    <div className="bg-white p-4 border border-gray-200 rounded shadow-md">
                                      <p className="font-bold">
                                        { new Date(date).toLocaleDateString("en-IN", {
                                          year: "numeric",
                                          month: "short",
                                          day: "numeric",
                                        }) }
                                      </p>
                                      <p className="text-green-600">
                                        XIRR: { payload[0]?.value || 0 }%
                                      </p>
                                    </div>
                                  );
                                }
                                return null;
                              } }
                            />
                            <Legend />
                            <Line
                              yAxisId="right"
                              type="monotone"
                              dataKey="xirr"
                              name="XIRR%"
                              stroke="#10b981"
                              strokeWidth={ 2 }
                              dot={ { r: 3 } }
                              activeDot={ { r: 6 } }
                              connectNulls={ true }
                            />
                          </>
                        ) : (
                          <>
                            <YAxis
                              yAxisId="left"
                              orientation="left"
                              tickFormatter={ formatYAxis }
                              domain={ [1400000, 1800000] }
                            />
                            <Tooltip
                              content={ ({ active, payload, label }) => {
                                if (active && payload && payload.length) {
                                  // Use payload[0].payload.date instead of label
                                  const date = payload[0].payload.date;
                                  return (
                                    <div className="bg-white p-4 border border-gray-200 rounded shadow-md">
                                      <p className="font-bold">
                                        { new Date(date).toLocaleDateString("en-IN", {
                                          year: "numeric",
                                          month: "short",
                                          day: "numeric",
                                        }) }
                                      </p>
                                      <p className="text-blue-600">
                                        Current Cost: ₹
                                        { Number(payload[0]?.value || 0).toLocaleString("en-IN") }
                                      </p>
                                      <p className="text-red-600">
                                        Current Value: ₹
                                        { Number(payload[1]?.value || 0).toLocaleString("en-IN") }
                                      </p>
                                      <p className="text-yellow-600">
                                        BSE500:{ " " }
                                        { Number(payload[2]?.value || 0).toLocaleString("en-IN") }
                                      </p>
                                    </div>
                                  );
                                }
                                return null;
                              } }
                            />
                            <Legend />
                            <Line
                              yAxisId="left"
                              type="monotone"
                              dataKey="totalCost"
                              name="Current Cost"
                              stroke="#1e40af"
                              strokeWidth={ 2 }
                              dot={ { r: 3 } }
                              activeDot={ { r: 6 } }
                              connectNulls={ true }
                            />
                            <Line
                              yAxisId="left"
                              type="monotone"
                              dataKey="currentValue"
                              name="Current Value"
                              stroke="#dc2626"
                              strokeWidth={ 2 }
                              dot={ { r: 3 } }
                              activeDot={ { r: 6 } }
                              connectNulls={ true }
                            />
                            <Line
                              yAxisId="left"
                              type="monotone"
                              dataKey="sensex"
                              name="BSE500"
                              stroke="#f59e0b"
                              strokeWidth={ 2 }
                              dot={ { r: 3 } }
                              activeDot={ { r: 6 } }
                              connectNulls={ true }
                            />
                          </>
                        ) }
                      </LineChart>
                    </ResponsiveContainer>
                  </>
                ) }
              </div>
            </div>
          </div>

          {/* <div className="justify-between w-full flex flex-wrap gap-4 h-auto mb-2">
            <div className="flex flex-col items-start space-y-2">
              <div className="font-medium text-lg sm:text-xl md:text-2xl text-[#3F4765] font-sans">
                Recent Transactions
              </div>
            </div>
          </div> */}

          <div className="container mx-auto px-4 py-6 max-w-6xl">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Header */ }
              <div className="bg-gradient-to-r from-slate-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">
                  Recent Transactions
                </h2>
              </div>

              {/* Desktop Table */ }
              <div className="hidden md:block">
                {/* Table Header */ }
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

                {/* Table Body */ }
                <div className="divide-y divide-gray-200">
                  { RecentTransactions.map((row, index) => (
                    <div
                      key={ index }
                      className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors duration-150 items-center"
                    >
                      <div className="col-span-2 text-sm font-medium text-gray-900">
                        { new Date(row.transaction_date).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }) }
                      </div>
                      <div className="col-span-6 text-sm text-gray-700">
                        <div
                          className="font-medium line-clamp-2"
                          title={ row.scheme }
                        >
                          { row.scheme }
                        </div>
                      </div>
                      <div className="col-span-2">
                        <span
                          className={ `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(
                            row.transaction_type
                          )}` }
                        >
                          { row.transaction_type }
                        </span>
                      </div>
                      <div className="col-span-2 text-sm font-semibold text-gray-900 text-right">
                        { `₹${formatMoney(row.amount)}` }
                      </div>
                    </div>
                  )) }
                </div>
              </div>

              {/* Mobile Cards */ }
              <div className="md:hidden">
                <div className="divide-y divide-gray-200">
                  { RecentTransactions.map((row, index) => (
                    <div
                      key={ index }
                      className="p-4 hover:bg-gray-50 transition-colors duration-150"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="text-sm font-medium text-gray-900">
                          { new Date(row.transaction_date).toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          ) }
                        </div>
                        <span
                          className={ `inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(
                            row.transaction_type
                          )}` }
                        >
                          { row.transaction_type }
                        </span>
                      </div>
                      <div className="text-sm text-gray-700 mb-2 line-clamp-2">
                        { row.scheme }
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-semibold text-gray-900">
                          { row.amount }
                        </span>
                      </div>
                    </div>
                  )) }
                </div>
              </div>

              {/* Empty State */ }
              { RecentTransactions.length === 0 && (
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
                        strokeWidth={ 1 }
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-500 text-sm">No transactions found</p>
                </div>
              ) }
            </div>
          </div>

          <div className="justify-between w-full flex flex-wrap gap-4 h-auto mb-2">
            <div className="flex flex-col items-start space-y-2">
              <div className="font-medium text-lg sm:text-xl md:text-2xl text-[#3F4765] font-sans">
                Systematic Transactions
              </div>
            </div>

            <div className="flex gap-4">
              <div
                onClick={ () => setIsModalOpen(true) }
                className="border bg-gray-100 text-gray-700 rounded-3xl text-xs sm:text-sm lg:text-base px-4 py-2 focus:outline-none focus:ring-2 focus:ring-fuchsia-700 hover:bg-gray-200 flex justify-center items-center cursor-pointer"
              >
                Add New
              </div>
            </div>
          </div>

          <div className="container mx-auto px-4 py-6">
            { systematicTransactions.length > 0 && (
              <div className="hidden md:block">
                <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] text-left p-3 bg-[#F5F5F5] rounded-lg gap-4 ">
                  <div className="text-xs font-normal leading-6 text-[#848CA9]">FUND NAME</div>
                  <div className="text-xs font-normal leading-6 text-[#848CA9] text-center">TYPE</div>
                  <div className="text-xs font-normal leading-6 text-[#848CA9]">START DATE</div>
                  <div className="text-xs font-normal leading-6 text-[#848CA9]">FREQUENCY</div>
                  <div className="text-xs font-normal leading-6 text-[#848CA9]">AMOUNT (₹)</div>
                  <div className="text-xs font-normal leading-6 text-[#848CA9]">ACTION</div>
                </div>
              </div>
            ) }

            { systematicTransactions.length > 0 ? (
              systematicTransactions.map((row, index) => (
                <>
                  <div className="hidden md:block">
                    <div
                      key={ index }
                      className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] bg-white text-left p-3 my-2 items-center rounded-lg gap-4 shadow-sm"
                    >
                      <div className="text-sm text-gray-700">{ row.fund_name }</div>
                      <div className="text-sm text-gray-700 text-center">{ row.transaction_type || "N/A" }</div>
                      <div className="text-sm text-gray-700">{ formatDate(row.sip_start_date) }</div>
                      <div className="text-sm text-gray-700">{ row.frequency }</div>
                      <div className="text-sm text-gray-700">₹{ row.amount.toLocaleString("en-IN") }</div>
                      <div className="flex gap-2">
                        <button
                          onClick={ () => handleEditTransaction(row) }
                          className="text-[#35B26B] border border-[#35B26B] rounded-md p-2 hover:bg-[#e8f5eb] transition-colors"
                          title="Edit"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z"
                              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                        <button
                          onClick={ () => handleDeleteTransaction(row.id) }
                          disabled={ isDeleting }
                          className={ `text-[#dc2626] border border-[#dc2626] rounded-md p-2 hover:bg-[#fef2f2] transition-colors ${isDeleting ? "opacity-50 cursor-not-allowed" : ""
                            }` }
                          title={ isDeleting ? "Deleting..." : "Delete" }
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="m3 6 3 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <path d="m21 6-3 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <path d="m18 6-.84 12.63a1 1 0 0 1-1 .84H7.89a1 1 0 0 1-1-.84L6 6"
                              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="m8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* Mobile Cards */ }
                  <div className="md:hidden">
                    <div className="divide-y divide-gray-200">
                      { systematicTransactions.map((row, index) => (
                        <div
                          key={ index }
                          className="p-4 hover:bg-gray-50 transition-colors duration-150"
                        >
                          <div className="text-sm text-gray-700 mb-2 line-clamp-2">
                            { formatDate(row.sip_start_date) } ({ row.frequency })
                          </div>
                          <div className="flex justify-between items-start mb-2">
                            <div className="text-sm font-medium text-gray-900">
                              { row.fund_name }
                            </div>

                            <span
                              className={ "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium" }
                            >
                              { row.transaction_type || "N/A" }
                            </span>
                          </div>


                          {/* <div className="text-sm text-gray-700 mb-2 line-clamp-2">
                            { row.frequency }
                          </div> */}
                          <div className="text-sm text-gray-700 mb-2 line-clamp-2">
                            ₹{ row.amount.toLocaleString("en-IN") }
                          </div>
                          <div className="text-right">
                            <span className="text-lg text-gray-900 gap-2">
                              <button
                                onClick={ () => handleEditTransaction(row) }
                                className="text-[#35B26B] border border-[#35B26B] rounded-md p-2 hover:bg-[#e8f5eb] transition-colors"
                                title="Edit"
                              >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                  <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z"
                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </button>

                            </span>
                            <span className="text-lg text-gray-900 gap-2">
                              <button
                                onClick={ () => handleDeleteTransaction(row.id) }
                                disabled={ isDeleting }
                                className={ `text-[#dc2626] border border-[#dc2626] rounded-md p-2 hover:bg-[#fef2f2] transition-colors ${isDeleting ? "opacity-50 cursor-not-allowed" : ""
                                  }` }
                                title={ isDeleting ? "Deleting..." : "Delete" }
                              >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                  <path d="m3 6 3 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                  <path d="m21 6-3 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                  <path d="m18 6-.84 12.63a1 1 0 0 1-1 .84H7.89a1 1 0 0 1-1-.84L6 6"
                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                  <path d="m8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </button>
                            </span>
                          </div>
                        </div>
                      )) }
                    </div>
                  </div>
                </>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No systematic transactions found
              </div>
            ) }
          </div>


        </div>

        {/* Second div with 20% width on medium and larger screens */ }
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
            {/* <!-- First Card --> */ }
            <div className="relative bg-[#60BC63] rounded-lg p-1 sm:p-2 w-full sm:w-[48%] h-auto">
              {/* <!-- First Two Text Elements in Column --> */ }
              <div className="flex flex-col space-y-2">
                {/* <div className="text-white font-semibold text-base sm:text-sm md:text-base">
                  {`Gain`}
                </div> */}
                <div className="text-white font-semibold text-base sm:text-sm md:text-base">
                  { `Today's ${getGainLossText()}` }
                </div>
              </div>

              {/* <!-- Dashed Border --> */ }
              <div className="border-t border-dashed border-white my-4"></div>

              {/* <!-- Third Text and Image in Column --> */ }
              <div className="flex flex-col space-y-2">
                <div className="text-white font-semibold text-base sm:text-sm md:text-base">
                  { balanceData ? formatCurrency(balanceData?.todaysGain) : "₹0" }
                </div>
                <div className="w-6 h-6 sm:w-8 sm:h-8">
                  <Image
                    src={ require("../assets/logo/Credit_Card_green.png") }
                    alt="Card Image"
                    width={ 24 }
                    height={ 24 }
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* <!-- Absolute Image at Bottom Right --> */ }
              <div className="absolute bottom-0 right-0 w-15 h-8 sm:w-10 sm:h-10">
                <Image
                  src={ require("../assets/logo/Highlight_green.png") }
                  alt="Value Image"
                  width={ 100 }
                  height={ 100 }
                  objectFit="contain"
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* <!-- Second Card --> */ }
            <div className="relative bg-[#FFBA33] rounded-lg p-1 sm:p-2 w-full sm:w-[48%] h-auto">
              {/* <!-- First Two Text Elements in Column --> */ }
              <div className="flex flex-col space-y-2">
                {/* <div className="text-white font-semibold text-base sm:text-sm md:text-base">
                  {`Today's`}
                </div> */}
                <div className="text-white font-semibold text-base sm:text-sm md:text-base">
                  Expenses
                </div>
              </div>

              {/* <!-- Dashed Border --> */ }
              <div className="border-t border-dashed border-white my-4"></div>

              {/* <!-- Third Text and Image in Column --> */ }
              <div className="flex flex-col space-y-2">
                <div className="text-white font-semibold text-base sm:text-sm md:text-base">
                  { result !== null ? result.toFixed(2) : 'Loading...' }
                </div>
                <div className="w-6 h-6 sm:w-8 sm:h-8">
                  <Image
                    src={ require("../assets/logo/Credit_Card_yellow.png") }
                    alt="Card Image"
                    width={ 24 }
                    height={ 24 }
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* <!-- Absolute Image at Bottom Right --> */ }
              <div className="absolute bottom-0 right-0 w-15 h-8 sm:w-10 sm:h-10">
                <Image
                  src={ require("../assets/logo/Highlight_yellow.png") }
                  alt="Value Image"
                  width={ 100 }
                  height={ 100 }
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
              { `Today  ▼` }
            </div>
          </div>

          <div className="flex justify-between items-start space-y-4 md:space-y-0 flex-row mt-2">
            {/* First Section: Image and Text in one row */ }
            <div className="flex items-center space-x-4">
              <Image
                src={ require("../assets/logo/Activity.png") }
                alt="Currency Image"
                width={ 46 }
                height={ 46 }
              />
              <div className="flex flex-col space-y-2">
                <p className="text-xs font-semibold text-[#3F4765] ">
                  Activities Name
                </p>
                <p className="text-sm font-normal text-[#3F4765]">Sell </p>
              </div>
            </div>

            {/* Second Section: Two text elements column-wise */ }
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
            {/* First Section: Image and Text in one row */ }
            <div className="flex items-center space-x-4">
              <Image
                src={ require("../assets/logo/Logo_B.png") }
                alt="Currency Image"
                width={ 46 }
                height={ 46 }
              />
              <div className="flex flex-col space-y-2">
                <p className="text-xs font-semibold text-[#3F4765] ">
                  Activities Name
                </p>
                <p className="text-sm font-normal text-[#3F4765]">Buy </p>
              </div>
            </div>

            {/* Second Section: Two text elements column-wise */ }
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
            {/* First Section: Image and Text in one row */ }
            <div className="flex items-center space-x-4">
              <Image
                src={ require("../assets/logo/Logo_A.png") }
                alt="Currency Image"
                width={ 46 }
                height={ 46 }
              />
              <div className="flex flex-col space-y-2">
                <p className="text-xs font-semibold text-[#3F4765] ">
                  Activities Name
                </p>
                <p className="text-sm font-normal text-[#3F4765]">Buy</p>
              </div>
            </div>

            {/* Second Section: Two text elements column-wise */ }
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
            onClick={ () => router.push("/Newslist") }
            className="flex items-center space-x-4 justify-between mt-6 p-4 rounded-lg transition-all duration-300 ease-in-out hover:bg-gray-100 hover:shadow-md"
          >
            <div className="font-sans text-lg sm:text-base md:text-lg font-medium leading-5 text-left text-[#3F4765]">
              News
            </div>
            <div className="font-sans text-sm sm:text-base md:text-sm font-medium leading-5 text-left text-[#969CCB]">
              See All
            </div>
          </div>
          { NewsData?.map((item) => {
            return (
              <div
                key={ item }
                className="flex justify-between items-start flex-row mt-4"
              >
                {/* First Section: Image and Text in one row */ }
                <div className="flex items-center space-x-4 w-[70%]">
                  <div className="flex flex-col">
                    <p className="text-sm font-medium text-[#3F4765] line-clamp-3 leading-5">
                      { item?.content }
                    </p>
                    <p className="text-xs font-light text-[#A2A9C7] mt-1">
                      { item?.source?.name }
                    </p>
                  </div>
                </div>

                {/* Second Section: Image */ }
                <div className="flex-shrink-0">
                  <img
                    src={ item?.image }
                    alt="News thumbnail"
                    className="h-10 w-10 md:h-16 md:w-16 bg-[#C4C4C4] border border-gray-300 rounded-md object-cover"
                  />
                </div>
              </div>
            );
          }) }
        </div>
      </div>

      { isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-[#3F4765]">
                Add New Systematic Transaction
              </h2>
              <button
                onClick={ () => setIsModalOpen(false) }
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <form className="space-y-4">
              {/* Fund Name - Searchable Input */ }
              <div>
                <label className="block text-sm font-medium text-[#3F4765] mb-1">
                  Fund Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={ formData.fundName }
                    onChange={ (e) => {
                      setFormData({ ...formData, fundName: e.target.value });
                      fetchSearchResults(e.target.value);
                    } }
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Search fund name..."
                  />
                  { isSearchLoading && (
                    <div className="absolute right-2 top-2">
                      <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                    </div>
                  ) }
                  { searchResults.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto">
                      { searchResults.map((result, index) => (
                        <>
                          { result?.FSCBI_ISIN !== null ? (
                            <div
                              key={ index }
                              onClick={ () => {
                                setFormData({
                                  ...formData,
                                  fundName: result.FSCBI_LegalName,
                                  isin: result?.FSCBI_ISIN,
                                  selectedFundData: result, // Store complete fund data
                                });
                                setSearchResults([]);
                              } }
                              className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                            >
                              { result.FSCBI_LegalName }
                            </div>
                          ) : null }
                        </>
                      )) }
                    </div>
                  ) }
                </div>
              </div>

              {/* Transaction Type */ }
              <div>
                <label className="block text-sm font-medium text-[#3F4765] mb-1">
                  Transaction Type
                </label>
                <select
                  value={ formData.transactionType }
                  onChange={ (e) =>
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

              {/* SIP Start Date */ }
              <div>
                <label className="block text-sm font-medium text-[#3F4765] mb-1">
                  SIP Start Date
                </label>
                <input
                  type="date"
                  value={ formData.sipStartDate }
                  onChange={ (e) =>
                    setFormData({ ...formData, sipStartDate: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* No. of Installments */ }
              <div>
                <label className="block text-sm font-medium text-[#3F4765] mb-1">
                  No. of Installments
                </label>
                <input
                  type="number"
                  value={ formData.installments }
                  onChange={ (e) =>
                    setFormData({ ...formData, installments: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter number of installments"
                  min="1"
                />
              </div>

              {/* Frequency */ }
              <div>
                <label className="block text-sm font-medium text-[#3F4765] mb-1">
                  Frequency
                </label>
                <select
                  value={ formData.frequency }
                  onChange={ (e) =>
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

              {/* Amount */ }
              <div>
                <label className="block text-sm font-medium text-[#3F4765] mb-1">
                  Amount (₹)
                </label>
                <input
                  type="number"
                  value={ formData.amount }
                  onChange={ (e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter amount"
                  min="1"
                />
              </div>

              {/* Action Buttons */ }
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={ () => setIsModalOpen(false) }
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={ handleSaveSystematicTransaction }
                  disabled={ isSaving }
                  className={ `flex-1 px-4 py-2 rounded-md ${isSaving
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                    } text-white` }
                >
                  { isSaving ? "Saving..." : "Save" }
                </button>
              </div>
            </form>
          </div>
        </div>
      ) }

      { isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-[#3F4765]">
                Edit Systematic Transaction
              </h2>
              <button
                onClick={ () => {
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
                } }
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <form className="space-y-4">
              {/* Fund Name - Searchable Input */ }
              <div>
                <label className="block text-sm font-medium text-[#3F4765] mb-1">
                  Fund Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={ formData.fundName }
                    onChange={ (e) => {
                      setFormData({ ...formData, fundName: e.target.value });
                      fetchSearchResults(e.target.value);
                    } }
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Search fund name..."
                  />
                  { isSearchLoading && (
                    <div className="absolute right-2 top-2">
                      <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                    </div>
                  ) }
                  { searchResults.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto">
                      { searchResults.map((result, index) => (
                        <div key={ index }>
                          { result?.FSCBI_ISIN !== null ? (
                            <div
                              onClick={ () => {
                                setFormData({
                                  ...formData,
                                  fundName: result.FSCBI_LegalName,
                                  isin: result?.FSCBI_ISIN,
                                  selectedFundData: result,
                                });
                                setSearchResults([]);
                              } }
                              className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                            >
                              { result.FSCBI_LegalName }
                            </div>
                          ) : null }
                        </div>
                      )) }
                    </div>
                  ) }
                </div>
              </div>

              {/* Transaction Type */ }
              <div>
                <label className="block text-sm font-medium text-[#3F4765] mb-1">
                  Transaction Type
                </label>
                <select
                  value={ formData.transactionType }
                  onChange={ (e) =>
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

              {/* SIP Start Date */ }
              <div>
                <label className="block text-sm font-medium text-[#3F4765] mb-1">
                  SIP Start Date
                </label>
                <input
                  type="date"
                  value={ formatToYYYYMMDD(formData.sipStartDate) }
                  onChange={ (e) =>
                    setFormData({ ...formData, sipStartDate: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* No. of Installments */ }
              <div>
                <label className="block text-sm font-medium text-[#3F4765] mb-1">
                  No. of Installments
                </label>
                <input
                  type="number"
                  value={ formData.installments }
                  onChange={ (e) =>
                    setFormData({ ...formData, installments: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter number of installments"
                  min="1"
                />
              </div>

              {/* Frequency */ }
              <div>
                <label className="block text-sm font-medium text-[#3F4765] mb-1">
                  Frequency
                </label>
                <select
                  value={ formData.frequency }
                  onChange={ (e) =>
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

              {/* Amount */ }
              <div>
                <label className="block text-sm font-medium text-[#3F4765] mb-1">
                  Amount (₹)
                </label>
                <input
                  type="number"
                  value={ formData.amount }
                  onChange={ (e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter amount"
                  min="1"
                />
              </div>

              {/* Action Buttons */ }
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={ () => {
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
                  } }
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={ handleUpdateSystematicTransaction }
                  disabled={ isUpdating }
                  className={ `flex-1 px-4 py-2 rounded-md ${isUpdating
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                    } text-white` }
                >
                  { isUpdating ? "Updating..." : "Update" }
                </button>
              </div>
            </form>
          </div>
        </div>
      ) }
    </>
  );
}
