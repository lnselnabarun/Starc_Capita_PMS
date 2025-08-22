import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { BarChart3, Eye, AlertCircle, Loader2 } from "lucide-react";

export default function DirectStockDashboard() {
  const [stockData, setStockData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const headers = [
    "Stock Symbol",
    "Total Qty",
    "Market Price (₹)",
    "Net Rate (₹)",
  ];

  useEffect(() => {
    getStockTransactionSummary();
  }, []);

  async function getStockTransactionSummary() {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("myData");
      const UserId = localStorage.getItem("UserId");
      if (!token) {
        setError("No authentication token found");
        return;
      }

      const response = await axios.post(
        "https://dev.netrumusa.com/starkcapital/api-backend/getStockTransactionSummary",
        { user_id: UserId },
        {
          headers: {
            "Cache-Control": "no-cache",
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        }
      );

      if (response.data?.status === "success") {
        setStockData(response.data.data);
      } else {
        throw new Error(
          response.data?.message || "API returned unsuccessful status"
        );
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

  const formatMoney = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  // Calculate portfolio metrics
  // const totalPortfolioValue = stockData?.reduce((sum, stock) => sum + (stock.market * stock.qty), 0) || 0;
  // const totalInvestment = stockData?.reduce((sum, stock) => sum + (stock.net_rate * stock.qty), 0) || 0;
  // const totalGainLoss = totalPortfolioValue - totalInvestment;
  // const totalGainLossPercent = totalInvestment > 0 ? ((totalGainLoss / totalInvestment) * 100) : 0;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl p-8 flex items-center space-x-4">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <div className="text-slate-700 font-medium">Loading stock data...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl p-8 flex items-center space-x-4 border-l-4 border-red-500">
          <AlertCircle className="w-8 h-8 text-red-600" />
          <div className="text-red-600 font-medium">Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className=" rounded-2xl shadow-xl p-8 mb-8 border border-slate-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
             
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  Stock Summary
                </h1>
                {/* <p className="text-slate-600 mt-1">Monitor your investment performance</p> */}
              </div>
            </div>
          </div>
        </div>

        {/* Stock Table */}
        {stockData?.length !== 0 ? (
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100">
              <h2 className="text-xl font-semibold text-slate-800">Holdings Overview</h2>
              <p className="text-slate-600 text-sm mt-1">{stockData.length} stocks in your portfolio</p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    {headers.map((header, index) => (
                      <th
                        key={index}
                        className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap"
                        style={{ minWidth: "120px" }}
                      >
                        {header}
                      </th>
                    ))}
                    {/* <th className="px-6 py-4 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap">
                      P&L
                    </th> */}
                    <th className="px-6 py-4 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-100">
                  {stockData?.map((stock, index) => {
                    const currentValue = stock.market * stock.qty;
                    const investedValue = stock.net_rate * stock.qty;
                    const pnl = currentValue - investedValue;
                    const pnlPercent = investedValue > 0 ? ((pnl / investedValue) * 100) : 0;
                    
                    return (
                      <tr key={stock.trading_symbol || index} className="hover:bg-slate-50 transition-colors duration-200">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {/* <div className="w-10 h-10 bg-gradient-to-r from-fuchsia-500 to-fuchsia-700 rounded-lg flex items-center justify-center mr-3">
                              <span className="text-white font-bold text-sm">
                                {stock.trading_symbol?.slice(0, 2)}
                              </span>
                            </div> */}
                            <div className="text-sm font-semibold text-slate-900">
                              {stock.trading_symbol}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-slate-900">{stock.qty}</div>
                          {/* <div className="text-xs text-slate-500">shares</div> */}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-slate-900">
                            ₹{formatMoney(stock.market)}
                          </div>
                          {/* <div className="text-xs text-slate-500">per share</div> */}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-slate-900">
                            ₹{formatMoney(stock.net_rate)}
                          </div>
                          {/* <div className="text-xs text-slate-500">avg. cost</div> */}
                        </td>
                        {/* <td className="px-6 py-4 whitespace-nowrap text-center">
                          <div className={`text-sm font-semibold ${pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            ₹{formatMoney(pnl)}
                          </div>
                          <div className={`text-xs ${pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            ({pnlPercent >= 0 ? '+' : ''}{pnlPercent.toFixed(2)}%)
                          </div>
                        </td> */}
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <button 
                            onClick={() => router.push(`/StockTransactionsPage/${stock?.trading_symbol}`)}
                            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-fuchsia-500 to-fuchsia-700 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-105 transition-all duration-200 shadow-lg"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            Details
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center border border-slate-200">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No Stocks Found</h3>
            <p className="text-slate-600 max-w-md mx-auto">
              Your portfolio is empty. Start investing to see your stocks here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}