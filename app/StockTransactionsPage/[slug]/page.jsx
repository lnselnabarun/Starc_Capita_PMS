"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Calendar,
  Activity,
  BarChart3,
  Filter,
  IndianRupee,
} from "lucide-react";
import { useRouter } from "next/navigation";

const CombinedDetailsMutualFund = ({ params }) => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const formattedText = decodeURIComponent(params?.slug).replace(/%20/g, " ");
  const handleBack = () => {
    router.back();
  };

  useEffect(() => {
    async function getStockTransactionSummary() {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("myData");
        const user_id = localStorage.getItem("UserId");
        if (!token) {
          setError("No authentication token found");
          return;
        }

        const response = await fetch(
          "https://dev.netrumusa.com/starkcapital/api-backend/getStockTransactionSummary",
          {
            method: "POST",
            headers: {
              "Cache-Control": "no-cache",
              "Content-Type": "application/json",
              Authorization: `Bearer ${JSON.parse(token)}`,
            },
            body: JSON.stringify({ user_id: JSON.parse(user_id) }),
          }
        );

        const data = await response.json();
        if (data?.status === "success") {
          setTransactions(data.data);
        } else {
          throw new Error(data?.message || "API returned unsuccessful status");
        }
      } catch (error) {
        if (error.response) {
          setError(
            `API Error (${error.response.status}): ${
              error.response.data?.message ||
              error.response.statusText ||
              error.message
            }`
          );
        } else if (error.request) {
          setError("Network Error: No response from server");
        } else {
          setError(`Request Error: ${error.message}`);
        }
      } finally {
        setIsLoading(false);
      }
    }

    getStockTransactionSummary();
  }, [params?.slug]);

  console.log(transactions, "transactionstransactions");
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-3xl shadow-2xl border border-gray-100">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent mb-4"></div>
          <p className="text-gray-700 font-semibold text-lg">
            Loading fund details...
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Please wait while we fetch your data
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-rose-50 flex items-center justify-center p-4">
        <div className="text-center bg-white p-8 rounded-3xl shadow-2xl border border-red-100 max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Error Loading Data
          </h2>
          <p className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200">
            {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  function formatMoney(amount) {
    return new Intl.NumberFormat("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  }

  // Calculate summary statistics
  const currentFundTransactions =
    transactions.find((t) => t.trading_symbol === formattedText)?.transaction ||
    [];
  const totalInvestment = currentFundTransactions.reduce(
    (sum, t) => (t.buy_sell === "B" ? sum + t.amount : sum),
    0
  );
  const totalReturns = currentFundTransactions.reduce(
    (sum, t) => (t.buy_sell === "S" ? sum + t.amount : sum),
    0
  );
  const totalTransactions = currentFundTransactions.length;
  // const avgPrice =
  //   totalTransactions > 0
  //     ? currentFundTransactions.reduce((sum, t) => sum + t.net_rate, 0) /
  //       totalTransactions
  //     : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center mb-8">
            <button
              onClick={handleBack}
              className="mr-6 bg-white hover:bg-gray-50 text-gray-700 p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group border border-gray-100"
              aria-label="Go back"
            >
              <ArrowLeft
                size={24}
                className="group-hover:-translate-x-1 transition-transform duration-200"
              />
            </button>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent mb-2">
                {formattedText !== "" ? formattedText : "Fund Details"}
              </h1>
              <p className="text-gray-600 text-lg">
                Performance Overview & Transaction History
              </p>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="flex flex-wrap justify-between gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl hover:border-green-200 transition-all duration-300 group w-full md:w-[48%] lg:w-[32%]">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-100 rounded-xl group-hover:bg-green-200 transition-colors duration-200">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                  Total Ammount
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                ₹{formatMoney(totalInvestment)}
              </div>
              <div className="text-sm text-green-600 font-medium">
                Invested Amount
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl hover:border-blue-200 transition-all duration-300 group w-full md:w-[48%] lg:w-[32%]">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-100 rounded-xl group-hover:bg-blue-200 transition-colors duration-200">
                  <IndianRupee className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                  Returns
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {formatMoney(totalReturns)}
              </div>
              <div className="text-sm text-blue-600 font-medium">
                Total Returns
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl hover:border-purple-200 transition-all duration-300 group w-full md:w-[48%] lg:w-[32%]">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-100 rounded-xl group-hover:bg-purple-200 transition-colors duration-200">
                  <Activity className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                  Transactions
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {totalTransactions}
              </div>
              <div className="text-sm text-purple-600 font-medium">XIRR</div>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-fuchsia-100 via-fuchsia-200 to-fuchsia-300 px-8 py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center text-gray-600 mb-4 sm:mb-0">
                <div>
                  <h2 className="text-2xl font-bold text-gray-600">
                    Transaction History
                  </h2>
                  <p className="text-gray-600 text-sm ">
                    Complete record of all your transactions
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-8 py-5 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                      Date
                    </div>
                  </th>
                  <th className="px-8 py-5 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                    <div className="flex items-center">
                      <BarChart3 className="w-4 h-4 mr-2 text-gray-500" />
                      Net Rate (₹)
                    </div>
                  </th>
                  <th className="px-8 py-5 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                    <div className="flex items-center">
                      <Activity className="w-4 h-4 mr-2 text-gray-500" />
                      Units
                    </div>
                  </th>
                  <th className="px-8 py-5 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                    <div className="flex items-center">
                      <IndianRupee className="w-4 h-4 mr-2 text-gray-500" />
                      Amount (₹)
                    </div>
                  </th>
                  <th className="px-8 py-5 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                    <div className="flex items-center">
                      <Filter className="w-4 h-4 mr-2 text-gray-500" />
                      Status
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {transactions?.map((transaction, index) => (
                  <>
                    {transaction?.trading_symbol == formattedText ? (
                      <>
                        {transaction?.transaction?.map((item, itemIndex) => {
                          return (
                            <tr
                              key={itemIndex}
                              className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 group"
                            >
                              <td className="px-8 py-6 whitespace-nowrap">
                                <div className="text-sm font-semibold text-gray-900">
                                  {new Date(item?.date).toLocaleDateString(
                                    "en-US",
                                    {
                                      month: "short",
                                      day: "numeric",
                                      year: "numeric",
                                    }
                                  )}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {new Date(item?.date).toLocaleDateString(
                                    "en-US",
                                    { weekday: "long" }
                                  )}
                                </div>
                              </td>
                              <td className="px-8 py-6 whitespace-nowrap">
                                <div className="text-lg font-medium text-gray-900">
                                  {item?.net_rate}
                                </div>
                              </td>
                              <td className="px-8 py-6 whitespace-nowrap">
                                <div className="text-lg font-medium text-gray-900">
                                  {item?.qty}
                                </div>
                              </td>
                              <td className="px-8 py-6 whitespace-nowrap">
                                <div className="text-lg font-medium text-gray-900">
                                  {formatMoney(item?.amount)}
                                </div>
                              </td>
                              <td className="px-8 py-6 whitespace-nowrap">
                                <span
                                  className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold shadow-sm border-2 transition-all duration-200 ${
                                    item?.buy_sell == "B"
                                      ? "bg-green-50 text-green-800 border-green-200 hover:bg-green-100 hover:shadow-green-200/50"
                                      : "bg-red-50 text-red-800 border-red-200 hover:bg-red-100 hover:shadow-red-200/50"
                                  }`}
                                >
                                  {item?.buy_sell == "B" ? (
                                    <>
                                      <TrendingUp className="w-4 h-4 mr-2" />
                                      BUY
                                    </>
                                  ) : (
                                    <>
                                      <TrendingDown className="w-4 h-4 mr-2" />
                                      SELL
                                    </>
                                  )}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </>
                    ) : null}
                  </>
                ))}
              </tbody>
            </table>
          </div>

          {currentFundTransactions.length === 0 && !isLoading && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No transactions found
              </h3>
              <p className="text-gray-500 max-w-sm mx-auto">
                There are no transactions available for this mutual fund at the
                moment.
              </p>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-16">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent mb-4" />
              <p className="text-gray-600 font-semibold text-lg">
                Loading transactions...
              </p>
              <p className="text-gray-500 text-sm mt-1">
                Please wait while we fetch your data
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CombinedDetailsMutualFund;
