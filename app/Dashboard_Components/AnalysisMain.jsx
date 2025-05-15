"use client";
import React, { useState, useEffect } from "react";
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
import Image from "next/image";
import { Chart } from "react-google-charts";
import { useRouter } from "next/navigation";

export default function AnalysisMain() {
  const [activeButton, setActiveButton] = useState("risk");
  const [PortFolioAssetAllocation, setPortFolioAssetAllocation] = useState([]);
  const [
    PortfolioMarketCapDistributionData,
    setPortfolioMarketCapDistributionData,
  ] = useState([]);
  const [riskRatiosData, setRiskRatiosData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Default data for Risk Ratios chart (will be replaced with API data)
  const riskRatioData = [
    {
      date: "03/07/2024",
      "Expense Ratio": 1.25,
      "Std. Dev.": 9.2,
      Sharpe: 1.3,
      Beta: 0.65,
      Alpha: 0.9,
    },
    {
      date: "04/08/2024",
      "Expense Ratio": 1.2,
      "Std. Dev.": 9.1,
      Sharpe: 1.4,
      Beta: 0.7,
      Alpha: 3.5,
    },
    {
      date: "01/09/2024",
      "Expense Ratio": 1.15,
      "Std. Dev.": 9.15,
      Sharpe: 1.45,
      Beta: 0.75,
      Alpha: 6.5,
    },
    {
      date: "01/10/2024",
      "Expense Ratio": 1.1,
      "Std. Dev.": 9.2,
      Sharpe: 1.48,
      Beta: 0.78,
      Alpha: 6.6,
    },
    {
      date: "10/11/2024",
      "Expense Ratio": 1.1,
      "Std. Dev.": 9.25,
      Sharpe: 1.5,
      Beta: 0.8,
      Alpha: 6.65,
    },
  ];

  // Data for Capture Ratios chart
  const captureRatioData = [
    {
      date: "03/07/2024",
      Up: 90.5,
      Down: 85.0,
    },
    {
      date: "04/08/2024",
      Up: 92.3,
      Down: 78.0,
    },
    {
      date: "01/09/2024",
      Up: 93.5,
      Down: 70.0,
    },
    {
      date: "01/10/2024",
      Up: 94.0,
      Down: 65.0,
    },
    {
      date: "10/11/2024",
      Up: 94.2,
      Down: 67.0,
    },
  ];

  const portfolio_allocation_options = {
    title: "Portfolio Asset Allocation",
    titleTextStyle: {
      color: "#3F4765",
      fontSize: 16,
      fontName: "sans-serif",
      bold: true,
    },
    is3D: true,
    pieHole: 0.4, // Creates a donut chart
    colors: ["#5C6BC0", "#EC407A", "#FFA726"], // More professional color scheme
    backgroundColor: "transparent",
    legend: {
      position: "right",
      alignment: "center",
      textStyle: {
        color: "#3F4765",
        fontSize: 12,
        fontName: "sans-serif",
      },
    },
    pieSliceText: "percentage",
    pieSliceTextStyle: {
      color: "white",
      fontSize: 14,
      fontName: "sans-serif",
    },
    tooltip: {
      showColorCode: true,
      textStyle: {
        color: "#3F4765",
        fontSize: 12,
        fontName: "sans-serif",
      },
    },
    chartArea: {
      left: 10,
      top: 30,
      width: "80%",
      height: "80%",
    },
  };

  const portfolio_MarketCap_options = {
    title: "Portfolio Market Cap Distribution",
    titleTextStyle: {
      color: "#3F4765",
      fontSize: 16,
      fontName: "sans-serif",
      bold: true,
    },
    is3D: true,
    colors: ["#5C6BC0", "#EC407A", "#FFA726", "#60BC63"], // Using colors similar to your UI
    backgroundColor: "transparent",
    legend: {
      position: "right",
      alignment: "center",
      textStyle: {
        color: "#3F4765",
        fontSize: 12,
        fontName: "sans-serif",
      },
    },
    pieSliceText: "percentage",
    pieSliceTextStyle: {
      color: "white",
      fontSize: 14,
      fontName: "sans-serif",
    },
    tooltip: {
      showColorCode: true,
      textStyle: {
        color: "#3F4765",
        fontSize: 12,
        fontName: "sans-serif",
      },
    },
    chartArea: {
      left: 10,
      top: 30,
      width: "80%",
      height: "80%",
    },
  };
  const portfolio_category_data = [
    ["Category", "Percentage"],
    ["Equity - Large Cap", 8.11],
    ["Equity - Contra", 19.75],
    ["Equity - Sectoral - Infrastructure", 16.78],
    ["Hybrid - Multi Asset Allocation", 55.37],
  ];

  const portfolio_CATEGORY_options = {
    title: "Category Distribution",
    titleTextStyle: {
      color: "#3F4765",
      fontSize: 16,
      fontName: "sans-serif",
      bold: true,
    },
    is3D: true,
    pieHole: 0.4, // Creates a donut chart
    colors: ["#4e73df", "#e9c46a", "#4cab62", "#e07a5f"],
    backgroundColor: "transparent",
    legend: {
      position: "right",
      alignment: "center",
      textStyle: {
        color: "#3F4765",
        fontSize: 12,
        fontName: "sans-serif",
      },
    },
    pieSliceText: "percentage",
    pieSliceTextStyle: {
      color: "white",
      fontSize: 14,
      fontName: "sans-serif",
    },
    tooltip: {
      showColorCode: true,
      textStyle: {
        color: "#3F4765",
        fontSize: 12,
        fontName: "sans-serif",
      },
    },
    chartArea: {
      left: 10,
      top: 30,
      width: "80%",
      height: "80%",
    },
  };

  const portfolio_AMC_Distribution_data = [
    ["Task", "Hours per Day"],
    ["ICICI", 80.25],
    ["SBI", 19.75],
  ];

  const portfolio_AMC_Distribution_options = {
    title: "AMC Distribution",
    titleTextStyle: {
      color: "#3F4765",
      fontSize: 16,
      fontName: "sans-serif",
      bold: true,
    },
    is3D: true,
    pieHole: 0.4, // Creates a donut chart
    colors: ["#5C6BC0", "#EC407A"], // More professional color scheme
    backgroundColor: "transparent",
    legend: {
      position: "right",
      alignment: "center",
      textStyle: {
        color: "#3F4765",
        fontSize: 12,
        fontName: "sans-serif",
      },
    },
    pieSliceText: "percentage",
    pieSliceTextStyle: {
      color: "white",
      fontSize: 14,
      fontName: "sans-serif",
    },
    tooltip: {
      showColorCode: true,
      textStyle: {
        color: "#3F4765",
        fontSize: 12,
        fontName: "sans-serif",
      },
    },
    chartArea: {
      left: 10,
      top: 30,
      width: "80%",
      height: "80%",
    },
  };

  // Get active data based on button selection
  const getActiveData = () => {
    // If risk button is active and we have API data, use it
    if (activeButton === "risk" && riskRatiosData.length > 0) {
      return riskRatiosData;
    }
    // Otherwise use the default data
    return activeButton === "risk" ? riskRatioData : captureRatioData;
  };

  // Get chart title based on active button
  const getChartTitle = () => {
    return activeButton === "risk"
      ? "Risk Ratios over time"
      : "Capture Ratios over time";
  };

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

  const fetchPortFolioAssetAllocation = async (fundId) => {
    try {
      const response = await fetch(
        "https://dev.netrumusa.com/starkcapital/api-backend/portfolio-asset-allocation-graph",
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
        // Add a check to ensure details property exists
        setPortFolioAssetAllocation(data?.data);
      } else {
        console.error("Failed to fetch fund details", data);
        return null;
      }
    } catch (error) {
      console.error("Error fetching fund details:", error);
      return null;
    }
  };

  const GetPortfolioMarketCapDistributionData = async (fundId) => {
    try {
      const response = await fetch(
        "https://dev.netrumusa.com/starkcapital/api-backend/portfolio-market-cap-distribution-graph",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: fundId.toString() }),
        }
      );

      if (!response?.ok) {
        throw new Error(`HTTP error! status: ${response?.status}`);
      }

      const data = await response.json();

      if (data?.status === "success") {
        // Transform the data into the required format for Google Charts
        const formattedData = [["Category", "Percentage"]];

        // Map through the received data and format it
        data?.data?.forEach((item) => {
          // Format category name to title case (e.g., "large_cap" to "Large Cap")
          const formattedCategory = item?.category
            .split("_")
            .map((word) => word?.charAt(0).toUpperCase() + word?.slice(1))
            .join(" ");

          // Add the category and percentage to the formatted data
          formattedData?.push([formattedCategory, item?.percentage]);
        });

        setPortfolioMarketCapDistributionData(formattedData);
      } else {
        console.error("Failed to fetch fund details", data);
        return null;
      }
    } catch (error) {
      console.error("Error fetching fund details:", error);
      return null;
    }
  };

  // New function to fetch risk ratios data
  const fetchRiskRatiosData = async (userId) => {
    try {
      const response = await fetch(
        "https://dev.netrumusa.com/starkcapital/api-backend/risk-ratios-graph",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: userId.toString() }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data?.status === "success") {
        // Format the API response data for the chart
        const formattedData = data.summaries
          .filter((item) => item.currentValue > 0) // Only include records with values
          .map((item) => ({
            date: item.date, // Use date as is
            "Current Value": item.currentValue,
            Sharpe: item.weightedSharpeRatio,
            Alpha: item.weightedAlpha,
            Beta: item.weightedBeta,
            "Std. Dev.": item.weightedStdDev,
          }));

        setRiskRatiosData(formattedData);
      } else {
        console.error("Failed to fetch risk ratios data", data);
      }
    } catch (error) {
      console.error("Error fetching risk ratios data:", error);
    }
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

        // Parse the user ID
        const parsedUserId = JSON.parse(userId);

        // Fetch all required data
        await Promise.all([
          fetchPortFolioAssetAllocation(parsedUserId),
          GetPortfolioMarketCapDistributionData(parsedUserId),
          fetchRiskRatiosData(parsedUserId),
        ]);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    initializeData();
  }, []);

  return (
    <>
      <div className="flex flex-col md:flex-row w-full justify-between px-4 sm:px-6 lg:px-28">
        {/* First div with 70% width on medium and larger screens */}
        <div className="w-full md:w-[70%] flex flex-wrap gap-4 justify-between">
          <div className="w-full md:w-[100%] flex flex-wrap gap-4 justify-between">
            {/* Card 1 */}
            <div className="relative flex-1 w-1/2 bg-white border border-[#D9D9D9] rounded-xl p-4 z-10">
              <div className="pt-4">
                <Chart
                  chartType="PieChart"
                  data={PortFolioAssetAllocation}
                  options={portfolio_allocation_options}
                  width={"100%"}
                  height={"220px"}
                />
              </div>
            </div>

            {/* Card 2 */}
            <div className="relative flex-1 w-1/2 bg-white border border-[#D9D9D9] rounded-xl p-4 z-10">
              <div className="pt-4">
                <Chart
                  chartType="PieChart"
                  data={PortfolioMarketCapDistributionData}
                  options={portfolio_MarketCap_options}
                  width={"100%"}
                  height={"200px"}
                />
              </div>
            </div>

            <div className="w-full flex flex-wrap gap-4 h-auto p-4 rounded-lg border-[1.5px] border-[#D9D9D9] bg-white">
              {/* Header section with title and toggle buttons */}
              <div className="justify-between w-full flex flex-wrap gap-4 h-auto">
                <div className="flex flex-col items-start space-y-2">
                  <div className="font-medium text-lg sm:text-xl md:text-2xl text-[#3F4765] font-sans">
                    {getChartTitle()}
                  </div>
                </div>

                {/* Toggle buttons */}
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

              {/* Chart container */}
              {/* Chart container */}
              {/* Chart container */}
              <div className="w-full h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={getActiveData()}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 20,
                      bottom: 30,
                    }}
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
                      // Risk Ratio view axes and lines
                      <>
                        <YAxis
                          yAxisId="left"
                          orientation="left"
                          domain={["auto", "auto"]}
                        />
                        {riskRatiosData.length > 0 && (
                          <YAxis
                            yAxisId="currentValue"
                            orientation="right"
                            domain={["auto", "auto"]}
                          />
                        )}
                        <Tooltip
                          content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="bg-white p-4 border border-gray-200 rounded shadow-md">
                                  <p className="font-bold">{label}</p>
                                  {payload.map((entry, index) => (
                                    <p
                                      key={`tooltip-${index}`}
                                      style={{ color: entry.color }}
                                    >
                                      {entry.name}: {entry.value}
                                    </p>
                                  ))}
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Legend />

                        {riskRatiosData.length > 0 ? (
                          // Use API data when available
                          <>
                            <Line
                              type="monotone"
                              dataKey="Current Value"
                              name="Current Value"
                              stroke="#4285F4"
                              activeDot={{ r: 6 }}
                              strokeWidth={2}
                              yAxisId="currentValue"
                              connectNulls={true}
                            />
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
                          // Use default data when API data is not available
                          <>
                            <Line
                              type="monotone"
                              dataKey="Expense Ratio"
                              name="Expense Ratio"
                              stroke="#4285F4"
                              activeDot={{ r: 6 }}
                              strokeWidth={2}
                              yAxisId="left"
                              connectNulls={true}
                            />
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
                        )}
                      </>
                    ) : (
                      // Capture Ratio view axes and lines
                      <>
                        <YAxis
                          yAxisId="left"
                          orientation="left"
                          domain={[0, 100]}
                          tickFormatter={(value) => `${value}%`}
                        />
                        <Tooltip
                          content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="bg-white p-4 border border-gray-200 rounded shadow-md">
                                  <p className="font-bold">{label}</p>
                                  <p style={{ color: "#4285F4" }}>
                                    Up Capture: {payload[0]?.value || 0}%
                                  </p>
                                  <p style={{ color: "#EA4335" }}>
                                    Down Capture: {payload[1]?.value || 0}%
                                  </p>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
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

          <div className="w-full md:w-[100%] flex flex-wrap gap-4 justify-between mb-5">
            {/* Card 1 */}
            <div className="relative flex-1 w-1/2 bg-white border border-[#D9D9D9] rounded-xl p-4 z-10">
              <div className="pt-4">
                <Chart
                  chartType="PieChart"
                  data={portfolio_category_data}
                  options={portfolio_CATEGORY_options}
                  width={"100%"}
                  height={"220px"}
                />
              </div>
            </div>

            {/* Card 2 */}
            <div className="relative flex-1 w-1/2 bg-white border border-[#D9D9D9] rounded-xl p-4 z-10">
              {/* Image Section */}
              <div className="pt-4">
                <Chart
                  chartType="PieChart"
                  data={portfolio_AMC_Distribution_data}
                  options={portfolio_AMC_Distribution_options}
                  width={"100%"}
                  height={"220px"}
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
                <p className="text-xs font-semibold text-[#3F4765] ">Bitcoin</p>
                <p className="text-sm font-normal text-[#3F4765]">Sell </p>
              </div>
            </div>

            {/* Second Section: Two text elements column-wise */}
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
                  Ethereum
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
                  Algorand
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
