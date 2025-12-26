"use client";
import React, { useState, useEffect, useCallback } from "react";
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
import {
  Activity,
  TrendingUp,
  BarChart3,
  Target,
  ArrowUp,
  ArrowDown,
  Calendar,
  PieChart,
} from "lucide-react";
import Image from "next/image";
import { Chart } from "react-google-charts";
import { useRouter } from "next/navigation";

export default function AnalysisMain() {
  const router = useRouter();
  const [activeButton, setActiveButton] = useState("risk");
  const [PortFolioAssetAllocation, setPortFolioAssetAllocation] = useState([
    ["Category", "Amount"],
    ["Equity", 0],
    ["Debt", 0],
    ["Others", 0],
  ]);
  const [
    PortfolioMarketCapDistributionData,
    setPortfolioMarketCapDistributionData,
  ] = useState([
    ["Category", "Percentage"],
    ["Large Cap", 0],
    ["Mid Cap", 0],
    ["Small Cap", 0],
    ["Others", 0],
  ]);
  const [AMC_Distribution_data, setAMC_Distribution_data] = useState([
    ["Category", "Percentage"],
    ["No Data", 100],
  ]);
  const [Category_Distribution, setCategory_Distribution] = useState([
    ["Category", "Percentage"],
    ["No Data", 100],
  ]);
  const [captureRatiosData, setCaptureRatiosData] = useState([]);
  const [
    captureRatiosDataForShowLastValue,
    setCaptureRatiosDataForShowLastValue,
  ] = useState(null);
  const [riskRatiosData, setRiskRatiosData] = useState([]);
  const [riskRatiosDataForShowLastValue, setriskRatiosDataForShowLastValue] =
    useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataLoadStatus, setDataLoadStatus] = useState({});

  // Asset allocation data state
  const [assetAllocationData, setAssetAllocationData] = useState({
    date: "",
    total: "₹0",
    equity: "₹0",
    equityPercent: "0%",
    debt: "₹0",
    debtPercent: "0%",
    others: "₹0",
    othersPercent: "0%",
  });

  // Market cap data state
  const [marketCapData, setMarketCapData] = useState({
    date: "",
    totalEquityAUM: "₹0",
    largeCap: "₹0",
    largeCapPercent: "0%",
    midCapAUM: "₹0",
    midCapPercent: "0%",
    smallCapAUM: "₹0",
    smallCapPercent: "0%",
    others: "₹0",
    othersPercent: "0%",
  });

  // Helper function to format currency
  const formatCurrency = (value) => {
    if (!value || isNaN(value)) return "₹0";
    return `₹${parseFloat(value).toLocaleString("en-IN")}`;
  };

  // Helper function to format percentage
  const formatPercentage = (value) => {
    if (!value) return "0%";
    // If value already includes %, return as is
    if (typeof value === "string" && value.includes("%")) {
      return value;
    }
    // Otherwise format it
    if (!isNaN(value)) {
      return `${parseFloat(value).toFixed(2)}%`;
    }
    return "0%";
  };

  // Helper function to safely get localStorage item
  const getStorageItem = (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      return null;
    }
  };

  // Portfolio Asset Allocation API
  const fetchPortFolioAssetAllocationDatas = useCallback(
    async (fundId, token) => {
      try {
        const response = await fetch(
          "https://dev.netrumusa.com/starkcapital/api-backend/portfolio-asset-allocation",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ user_id: fundId.toString() }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data?.status === "success" && data?.data) {
          const mybalance = data?.data?.mybalance || {};
          const allocation = data?.data?.assetAllocation || {};

          const formattedData = {
            date:
              mybalance?.date ||
              new Date().toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              }),
            total: formatCurrency(mybalance?.totalCost || 0),
            equity: formatCurrency(allocation?.Equity || 0),
            equityPercent: formatPercentage(allocation?.Equity_Percentage || 0),
            debt: formatCurrency(allocation?.Debt || 0),
            debtPercent: formatPercentage(allocation?.Debt_Percentage || 0),
            others: formatCurrency(allocation?.Others || 0),
            othersPercent: formatPercentage(allocation?.Others_Percentage || 0),
          };

          setAssetAllocationData(formattedData);

          const chartData = [
            ["Category", "Amount"],
            ["Equity", parseFloat(allocation?.Equity || 0)],
            ["Debt", parseFloat(allocation?.Debt || 0)],
            ["Others", parseFloat(allocation?.Others || 0)],
          ];
          setPortFolioAssetAllocation(chartData);

          return { success: true, data: formattedData };
        }
        return { success: false, error: "Invalid data structure" };
      } catch (error) {
        return { success: false, error: error.message };
      }
    },
    []
  );

  // New Portfolio Market Cap API
  const fetchPortfolioMarketCapData = useCallback(async (fundId, token) => {
    try {
      const response = await fetch(
        "https://dev.netrumusa.com/starkcapital/api-backend/portfolio-market-cap",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ user_id: fundId.toString() }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data?.status === "success" && data?.summary) {
        const summary = data?.summary;

        // Format the market cap display data
        const formattedMarketCapData = {
          date: data?.xirrData?.date
            ? new Date(data?.xirrData?.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })
            : new Date().toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              }),
          totalEquityAUM: formatCurrency(summary?.totalPortfolioValue || 0),
          largeCap: formatCurrency(summary?.totallargeCapAUM || 0),
          largeCapPercent: summary?.totallargeCapPercentage || "0%",
          midCapAUM: formatCurrency(summary?.totalmidCapAUM || 0),
          midCapPercent: summary?.totalmidCapPercentage || "0%",
          smallCapAUM: formatCurrency(summary?.totalsmallCapAUM || 0),
          smallCapPercent: summary?.totalsmallCapPercentage || "0%",
          others: formatCurrency(summary?.totalotherAUM || 0),
          othersPercent: summary?.totalotherPercentage || "0%",
        };

        setMarketCapData(formattedMarketCapData);

        // Create chart data from the summary
        const chartData = [["Category", "Percentage"]];

        const largeCapPct = parseFloat(
          summary?.totallargeCapPercentage?.replace("%", "") || 0
        );
        const midCapPct = parseFloat(
          summary?.totalmidCapPercentage?.replace("%", "") || 0
        );
        const smallCapPct = parseFloat(
          summary?.totalsmallCapPercentage?.replace("%", "") || 0
        );
        const otherPct = parseFloat(
          summary?.totalotherPercentage?.replace("%", "") || 0
        );

        if (largeCapPct > 0) chartData.push(["Large Cap", largeCapPct]);
        if (midCapPct > 0) chartData.push(["Mid Cap", midCapPct]);
        if (smallCapPct > 0) chartData.push(["Small Cap", smallCapPct]);
        if (otherPct > 0) chartData.push(["Others", otherPct]);

        if (chartData.length > 1) {
          setPortfolioMarketCapDistributionData(chartData);
        }

        return { success: true, data: formattedMarketCapData };
      }
      return { success: false, error: "Invalid data structure" };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }, []);

  // Portfolio Asset Allocation Graph API
  const fetchPortFolioAssetAllocation = useCallback(async (fundId, token) => {
    try {
      const response = await fetch(
        "https://dev.netrumusa.com/starkcapital/api-backend/portfolio-asset-allocation-graph",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : undefined,
          },
          body: JSON.stringify({ user_id: fundId.toString() }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data?.status === "success" && data?.data) {
        setPortFolioAssetAllocation(data?.data);
        return { success: true };
      }
      return { success: false };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }, []);

  // Market Cap Distribution Graph API (existing)
  const GetPortfolioMarketCapDistributionData = useCallback(
    async (fundId, token) => {
      try {
        const response = await fetch(
          "https://dev.netrumusa.com/starkcapital/api-backend/portfolio-market-cap-distribution-graph",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ user_id: fundId.toString() }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (
          data?.status === "success" &&
          data?.data &&
          Array.isArray(data.data)
        ) {
          const formattedData = [["Category", "Percentage"]];

          data?.data?.forEach((item) => {
            if (item?.category && item?.percentage !== undefined) {
              const formattedCategory = item?.category
                .split("_")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");

              const percentageValue =
                typeof item.percentage === "string"
                  ? parseFloat(item?.percentage.replace("%", ""))
                  : parseFloat(item?.percentage);

              if (percentageValue > 0) {
                formattedData.push([formattedCategory, percentageValue]);
              }
            }
          });

          if (formattedData.length > 1) {
            setPortfolioMarketCapDistributionData(formattedData);
          }
          return { success: true };
        }
        return { success: false };
      } catch (error) {
        return { success: false, error: error.message };
      }
    },
    []
  );

  // Category Distribution API
  const fetchCategoryDistribution = useCallback(async (userId, token) => {
    try {
      const response = await fetch(
        "https://dev.netrumusa.com/starkcapital/api-backend/category-distribution-graph",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : undefined,
          },
          body: JSON.stringify({ user_id: userId.toString() }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data?.status === "success" && data?.data) {
        const formattedData = [["Category", "Percentage"]];

        data.data.forEach((item) => {
          if (item?.category && item?.percentage > 0) {
            formattedData.push([
              item.category,
              parseFloat(item.percentage) || 0,
            ]);
          }
        });

        if (formattedData.length > 1) {
          setCategory_Distribution(formattedData);
        }
        return { success: true };
      }
      return { success: false };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }, []);

  // Risk Ratios API
  const fetchRiskRatiosData = useCallback(async (userId, token) => {
    try {
      const response = await fetch(
        "https://dev.netrumusa.com/starkcapital/api-backend/risk-ratios-graph",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : undefined,
          },
          body: JSON.stringify({ user_id: userId.toString() }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (
        data?.status === "success" &&
        data?.summaries &&
        Array.isArray(data.summaries)
      ) {
        const formattedData = data.summaries
          .filter((item) => item?.currentValue > 0)
          .map((item) => ({
            date: item.date || "",
            Sharpe: parseFloat(item?.weightedSharpeRatio) || 0,
            Alpha: parseFloat(item?.weightedAlpha) || 0,
            Beta: parseFloat(item?.weightedBeta) || 0,
            "Std. Dev.": parseFloat(item?.weightedStdDev) || 0,
          }));

        setRiskRatiosData(formattedData);

        if (data.summaries.length > 0) {
          const lastValue = data.summaries[data.summaries.length - 1];
          setriskRatiosDataForShowLastValue({
            weightedStdDev: parseFloat(lastValue?.weightedStdDev || 0).toFixed(
              2
            ),
            weightedSharpeRatio: parseFloat(
              lastValue?.weightedSharpeRatio || 0
            ).toFixed(2),
            weightedBeta: parseFloat(lastValue?.weightedBeta || 0).toFixed(2),
            weightedAlpha: parseFloat(lastValue?.weightedAlpha || 0).toFixed(2),
          });
        }
        return { success: true };
      }
      return { success: false };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }, []);

  // Capture Ratios API
  const fetchCaptureRatiosData = useCallback(async (userId, token) => {
    try {
      const response = await fetch(
        "https://dev.netrumusa.com/starkcapital/api-backend/capture-ratios-graph",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : undefined,
          },
          body: JSON.stringify({ user_id: userId.toString() }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (
        data?.status === "success" &&
        data?.summaries &&
        Array.isArray(data.summaries)
      ) {
        const formattedData = data.summaries
          .filter(
            (item) =>
              item?.weightedCaptureRatioUpside1Yr !== null &&
              item?.weightedCaptureRatioDownside1Yr !== null
          )
          .map((item) => ({
            date: item.date || "",
            Up: parseFloat(item?.weightedCaptureRatioUpside1Yr) || 0,
            Down: parseFloat(item?.weightedCaptureRatioDownside1Yr) || 0,
          }));

        setCaptureRatiosData(formattedData);

        if (formattedData.length > 0) {
          const lastValue = formattedData[formattedData.length - 1];
          setCaptureRatiosDataForShowLastValue({
            Up: lastValue.Up.toFixed(2),
            Down: lastValue.Down.toFixed(2),
          });
        }
        return { success: true };
      }
      return { success: false };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }, []);

  // AMC Distribution API
  const fetch_AMC_Distribution = useCallback(async (userId, token) => {
    try {
      const response = await fetch(
        "https://dev.netrumusa.com/starkcapital/api-backend/amc-distribution-graph",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ user_id: userId.toString() }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (
        data?.status === "success" &&
        data?.data &&
        Array.isArray(data.data)
      ) {
        const formattedData = [["Category", "Percentage"]];

        data?.data?.forEach((item) => {
          if (item?.amc && item?.percentage) {
            const percentage = parseFloat(item?.percentage.replace("%", ""));
            if (percentage > 0) {
              formattedData.push([item?.amc, percentage]);
            }
          }
        });

        if (formattedData.length > 1) {
          setAMC_Distribution_data(formattedData);
        }
        return { success: true };
      }
      return { success: false };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }, []);

  // Main data initialization
  useEffect(() => {
    const initializeData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const token = getStorageItem("myData");
        const userId = getStorageItem("UserId");

        if (!token || !userId) {
          setError("Authentication required. Please login.");
          router.push("/");
          return;
        }

        // Call all APIs and track their status
        const apiCalls = [
          {
            name: "Portfolio Asset Allocation",
            fn: () => fetchPortFolioAssetAllocationDatas(userId, token),
          },
          {
            name: "Portfolio Asset Graph",
            fn: () => fetchPortFolioAssetAllocation(userId, token),
          },
          {
            name: "Portfolio Market Cap",
            fn: () => fetchPortfolioMarketCapData(userId, token),
          },
          {
            name: "Market Cap Distribution Graph",
            fn: () => GetPortfolioMarketCapDistributionData(userId, token),
          },
          { name: "Risk Ratios", fn: () => fetchRiskRatiosData(userId, token) },
          {
            name: "Category Distribution",
            fn: () => fetchCategoryDistribution(userId, token),
          },
          {
            name: "Capture Ratios",
            fn: () => fetchCaptureRatiosData(userId, token),
          },
          {
            name: "AMC Distribution",
            fn: () => fetch_AMC_Distribution(userId, token),
          },
        ];

        const results = await Promise.allSettled(
          apiCalls.map((api) => api.fn())
        );

        const loadStatus = {};
        results.forEach((result, index) => {
          const apiName = apiCalls[index].name;
          if (result.status === "fulfilled" && result.value?.success) {
            loadStatus[apiName] = "success";
          } else {
            loadStatus[apiName] = "failed";
          }
        });

        setDataLoadStatus(loadStatus);
      } catch (err) {
        setError("Failed to load dashboard data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    initializeData();
  }, [
    fetchPortFolioAssetAllocationDatas,
    fetchPortFolioAssetAllocation,
    fetchPortfolioMarketCapData,
    GetPortfolioMarketCapDistributionData,
    fetchRiskRatiosData,
    fetchCategoryDistribution,
    fetchCaptureRatiosData,
    fetch_AMC_Distribution,
    router,
  ]);


  // Default fallback data
  const defaultRiskRatioData = [
    {
      date: "03/07/2024",
      "Std. Dev.": 9.2,
      Sharpe: 1.3,
      Beta: 0.65,
      Alpha: 0.9,
    },
    {
      date: "04/08/2024",
      "Std. Dev.": 9.1,
      Sharpe: 1.4,
      Beta: 0.7,
      Alpha: 3.5,
    },
    {
      date: "01/09/2024",
      "Std. Dev.": 9.15,
      Sharpe: 1.45,
      Beta: 0.75,
      Alpha: 6.5,
    },
    {
      date: "01/10/2024",
      "Std. Dev.": 9.2,
      Sharpe: 1.48,
      Beta: 0.78,
      Alpha: 6.6,
    },
    {
      date: "10/11/2024",
      "Std. Dev.": 9.25,
      Sharpe: 1.5,
      Beta: 0.8,
      Alpha: 6.65,
    },
  ];

  const defaultCaptureRatioData = [
    { date: "03/07/2024", Up: 90.5, Down: 85.0 },
    { date: "04/08/2024", Up: 92.3, Down: 78.0 },
    { date: "01/09/2024", Up: 93.5, Down: 70.0 },
    { date: "01/10/2024", Up: 94.0, Down: 65.0 },
    { date: "10/11/2024", Up: 94.2, Down: 67.0 },
  ];

  // Chart options
  const portfolio_allocation_options = {
    titleTextStyle: {
      color: "#3F4765",
      fontSize: 16,
      fontName: "sans-serif",
      bold: true,
    },
    is3D: false,
    colors: ["#5C6BC0", "#EC407A", "#FFA726", "#60BC63"],
    backgroundColor: "transparent",
    legend: {
      position: "right",
      alignment: "center",
      textStyle: { color: "#3F4765", fontSize: 12, fontName: "sans-serif" },
    },
    pieSliceText: "percentage",
    pieSliceTextStyle: { color: "white", fontSize: 14, fontName: "sans-serif" },
    tooltip: {
      showColorCode: true,
      textStyle: { color: "#3F4765", fontSize: 12, fontName: "sans-serif" },
    },
    chartArea: { left: 10, top: 30, width: "80%", height: "80%" },
  };

  const portfolio_MarketCap_options = { ...portfolio_allocation_options };
  const portfolio_CATEGORY_options = {
    ...portfolio_allocation_options,
    title: "Category Distribution",
  };
  const portfolio_AMC_Distribution_options = {
    ...portfolio_allocation_options,
    title: "AMC Distribution",
  };

  // Get active chart data
  const getActiveData = () => {
    if (activeButton === "risk") {
      return riskRatiosData.length > 0 ? riskRatiosData : defaultRiskRatioData;
    }
    return captureRatiosData.length > 0
      ? captureRatiosData
      : defaultCaptureRatioData;
  };

  const getChartTitle = () => {
    return activeButton === "risk"
      ? "Risk Ratios over time"
      : "Capture Ratios over time";
  };

  const metrics = [
    {
      label: "STD. DEV",
      value: riskRatiosDataForShowLastValue?.weightedStdDev || "0.00",
      icon: <Activity className="w-5 h-5 text-blue-500" />,
    },
    {
      label: "Sharpe Ratio",
      value: riskRatiosDataForShowLastValue?.weightedSharpeRatio || "0.00",
      icon: <TrendingUp className="w-5 h-5 text-green-500" />,
    },
    {
      label: "Beta",
      value: riskRatiosDataForShowLastValue?.weightedBeta || "0.00",
      icon: <BarChart3 className="w-5 h-5 text-purple-500" />,
    },
    {
      label: "Alpha",
      value: riskRatiosDataForShowLastValue?.weightedAlpha || "0.00",
      icon: <Target className="w-5 h-5 text-orange-500" />,
    },
    {
      label: "Capture Ratio (Up)",
      value: captureRatiosDataForShowLastValue?.Up || "0.00",
      icon: <ArrowUp className="w-5 h-5 text-emerald-500" />,
    },
    {
      label: "Capture Ratio (Down)",
      value: captureRatiosDataForShowLastValue?.Down || "0.00",
      icon: <ArrowDown className="w-5 h-5 text-red-500" />,
    },
  ];

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading Analysis data Wait...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center bg-red-50 p-6 rounded-lg">
          <p className="text-red-600 font-semibold">Error</p>
          <p className="mt-2 text-gray-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col md:flex-row w-full justify-between px-4 sm:px-6 lg:px-28">
        <div className="w-full md:w-[95%] flex flex-wrap gap-4 justify-between">
          {/* Metrics Cards */}
          <div className="w-full md:w-[100%] flex flex-wrap gap-4 justify-between">
            {metrics.map((metric, index) => (
              <div
                key={index}
                className="relative flex-1 min-w-[160px] max-w-[275px] bg-white border border-[#D9D9D9] rounded-lg p-3 h-[100px] sm:h-[110px] md:h-[120px] hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex items-center mb-3">
                  {metric.icon}
                  <p className="text-xs sm:text-sm font-medium text-[#6E7499] ml-2">
                    {metric.label}
                  </p>
                </div>
                <div className="mb-3">
                  <p className="text-lg sm:text-xl md:text-2xl font-semibold text-[#2B2B2B]">
                    {metric.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full flex flex-wrap gap-4 justify-between">
            {/* Portfolio Asset Allocation Card */}
            <div className="flex-1 min-w-[400px] bg-white border border-[#D9D9D9] rounded-xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border-b border-[#E5EBEF]">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-[#3F4765] flex items-center gap-2">
                    <PieChart className="w-5 h-5 text-blue-500" />
                    Portfolio Asset Allocation
                  </h3>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{assetAllocationData?.date}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div className="bg-white rounded-lg p-2 border border-gray-100">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">Total</span>
                      <span className="text-sm font-semibold text-[#2B2B2B]">
                        {assetAllocationData?.total}
                      </span>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-2 border border-gray-100">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">Equity</span>
                      <div className="text-right">
                        <span className="text-sm font-semibold text-[#2B2B2B] block">
                          {assetAllocationData?.equity}
                        </span>
                        <span className="text-xs text-green-600">
                          {assetAllocationData?.equityPercent}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-2 border border-gray-100">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">
                        Debt (inc. Arbitrage)
                      </span>
                      <div className="text-right">
                        <span className="text-sm font-semibold text-[#2B2B2B] block">
                          {assetAllocationData?.debt}
                        </span>
                        <span className="text-xs text-blue-600">
                          {assetAllocationData?.debtPercent}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-2 border border-gray-100">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">Others</span>
                      <div className="text-right">
                        <span className="text-sm font-semibold text-[#2B2B2B] block">
                          {assetAllocationData?.others}
                        </span>
                        <span className="text-xs text-orange-600">
                          {assetAllocationData?.othersPercent}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 h-[250px] flex items-center justify-center">
                {PortFolioAssetAllocation.length > 1 ? (
                  <Chart
                    chartType="PieChart"
                    data={PortFolioAssetAllocation}
                    options={portfolio_allocation_options}
                    width={"100%"}
                    height={"220px"}
                  />
                ) : (
                  <p className="text-gray-500">No data available</p>
                )}
              </div>
            </div>

            {/* Portfolio Market Cap Distribution Card */}
            <div className="flex-1 min-w-[400px] bg-white border border-[#D9D9D9] rounded-xl overflow-hidden">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 border-b border-[#E5EBEF]">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-[#3F4765] flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-purple-500" />
                    Portfolio Market Cap Distribution
                  </h3>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{marketCapData?.date}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-white rounded-lg p-2 border border-gray-100">
                      <div className="text-center">
                        <span className="text-xs text-gray-500 block">
                          Large Cap
                        </span>
                        <span className="text-sm font-semibold text-[#2B2B2B] block">
                          {marketCapData?.largeCap}
                        </span>
                        <span className="text-xs text-blue-600">
                          {marketCapData?.largeCapPercent}
                        </span>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-2 border border-gray-100">
                      <div className="text-center">
                        <span className="text-xs text-gray-500 block">
                          Mid Cap
                        </span>
                        <span className="text-sm font-semibold text-[#2B2B2B] block">
                          {marketCapData?.midCapAUM}
                        </span>
                        <span className="text-xs text-green-600">
                          {marketCapData?.midCapPercent}
                        </span>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-2 border border-gray-100">
                      <div className="text-center">
                        <span className="text-xs text-gray-500 block">
                          Small Cap
                        </span>
                        <span className="text-sm font-semibold text-[#2B2B2B] block">
                          {marketCapData?.smallCapAUM}
                        </span>
                        <span className="text-xs text-orange-600">
                          {marketCapData?.smallCapPercent}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-2 border border-gray-100">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">
                        Total Equity AUM
                      </span>
                      <span className="text-sm font-semibold text-[#2B2B2B]">
                        {marketCapData?.totalEquityAUM}
                      </span>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-2 border border-gray-100">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">Others</span>
                      <div className="text-right">
                        <span className="text-sm font-semibold text-[#2B2B2B]">
                          {marketCapData?.others}
                        </span>
                        <span className="text-xs text-purple-600 ml-2">
                          {marketCapData?.othersPercent}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 h-[250px] flex items-center justify-center">
                {PortfolioMarketCapDistributionData &&
                PortfolioMarketCapDistributionData.length > 1 ? (
                  <Chart
                    chartType="PieChart"
                    data={PortfolioMarketCapDistributionData}
                    options={portfolio_MarketCap_options}
                    width={"100%"}
                    height={"200px"}
                  />
                ) : (
                  <p className="text-gray-500">No data available</p>
                )}
              </div>
            </div>

            {/* Risk/Capture Ratios Chart */}
            <div className="w-full flex flex-wrap gap-4 h-auto p-4 rounded-lg border-[1.5px] border-[#D9D9D9] bg-white">
              <div className="justify-between w-full flex flex-wrap gap-4 h-auto">
                <div className="flex flex-col items-start space-y-2">
                  <div className="font-medium text-lg sm:text-xl md:text-2xl text-[#3F4765] font-sans">
                    {getChartTitle()}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => setActiveButton("risk")}
                    className={`text-[#9FA8C7] px-4 py-2 rounded-2xl border text-sm ${
                      activeButton === "risk"
                        ? "bg-[#ECEFF9] border-[#E5EBEF] text-[#3F4765] font-medium"
                        : "border-[#E5EBEF]"
                    }`}
                  >
                    Risk Ratio
                  </button>

                  <button
                    onClick={() => setActiveButton("capture")}
                    className={`text-[#9FA8C7] px-4 py-2 rounded-2xl border text-sm ${
                      activeButton === "capture"
                        ? "bg-[#ECEFF9] border-[#E5EBEF] text-[#3F4765] font-medium"
                        : "border-[#E5EBEF]"
                    }`}
                  >
                    Capture Ratio
                  </button>
                </div>
              </div>

              <div className="w-full h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={getActiveData()}
                    margin={{ top: 10, right: 30, left: 20, bottom: 30 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis
                      dataKey="date"
                      angle={-45}
                      textAnchor="end"
                      height={70}
                      interval={0}
                      tick={{ fontSize: 11 }}
                    />

                    {activeButton === "risk" ? (
                      <>
                        <YAxis
                          yAxisId="left"
                          orientation="left"
                          domain={["auto", "auto"]}
                        />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="Std. Dev."
                          name="Std. Dev."
                          stroke="#EA4335"
                          activeDot={{ r: 6 }}
                          strokeWidth={2}
                          yAxisId="left"
                          connectNulls={true}
                        />
                        <Line
                          type="monotone"
                          dataKey="Sharpe"
                          name="Sharpe"
                          stroke="#FBBC05"
                          activeDot={{ r: 6 }}
                          strokeWidth={2}
                          yAxisId="left"
                          connectNulls={true}
                        />
                        <Line
                          type="monotone"
                          dataKey="Beta"
                          name="Beta"
                          stroke="#34A853"
                          activeDot={{ r: 6 }}
                          strokeWidth={2}
                          yAxisId="left"
                          connectNulls={true}
                        />
                        <Line
                          type="monotone"
                          dataKey="Alpha"
                          name="Alpha"
                          stroke="#FF6D01"
                          activeDot={{ r: 6 }}
                          strokeWidth={2}
                          yAxisId="left"
                          connectNulls={true}
                        />
                      </>
                    ) : (
                      <>
                        <YAxis
                          yAxisId="left"
                          orientation="left"
                          domain={[0, 120]}
                          tickFormatter={(value) => `${value}%`}
                        />
                        <Tooltip formatter={(value) => `${value}%`} />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="Up"
                          name="Up Capture"
                          stroke="#4285F4"
                          activeDot={{ r: 6 }}
                          strokeWidth={2}
                          yAxisId="left"
                          connectNulls={true}
                        />
                        <Line
                          type="monotone"
                          dataKey="Down"
                          name="Down Capture"
                          stroke="#EA4335"
                          activeDot={{ r: 6 }}
                          strokeWidth={2}
                          yAxisId="left"
                          connectNulls={true}
                        />
                      </>
                    )}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Category and AMC Distribution */}
          <div className="w-full md:w-[100%] flex flex-wrap gap-4 justify-between mb-5">
            <div className="relative flex-1 w-1/2 bg-white border border-[#D9D9D9] rounded-xl p-4 z-10">
              <div className="pt-4">
                {Category_Distribution.length > 1 &&
                Category_Distribution[0][0] !== "No Data" ? (
                  <Chart
                    chartType="PieChart"
                    data={Category_Distribution}
                    options={portfolio_CATEGORY_options}
                    width={"100%"}
                    height={"220px"}
                  />
                ) : (
                  <p className="text-gray-500 text-center">No data available</p>
                )}
              </div>
            </div>

            <div className="relative flex-1 w-1/2 bg-white border border-[#D9D9D9] rounded-xl p-4 z-10">
              <div className="pt-4">
                {AMC_Distribution_data.length > 1 &&
                AMC_Distribution_data[0][0] !== "No Data" ? (
                  <Chart
                    chartType="PieChart"
                    data={AMC_Distribution_data}
                    options={portfolio_AMC_Distribution_options}
                    width={"100%"}
                    height={"220px"}
                  />
                ) : (
                  <p className="text-gray-500 text-center">No data available</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
