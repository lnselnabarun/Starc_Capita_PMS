import React, { useState, useEffect } from "react";
import { Search, X, Calculator, TrendingUp, Shield } from "lucide-react";
import axios from "axios";

const IntrinsicCalculation = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStocks, setSelectedStocks] = useState([null, null]); // Array to hold two stocks
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Input states for calculation parameters - separate for each stock
  const [stock1Params, setStock1Params] = useState({
    expectedReturns: "15",
    EstimatedFutureFCF: "12", // This should be 12% as shown in Excel
    terminalFCFMultiplier: "15", // This should be 15 as shown in Excel
    marginOfSafety: "20",
  });

  const [stock2Params, setStock2Params] = useState({
    expectedReturns: "15",
    EstimatedFutureFCF: "12.5",
    terminalFCFMultiplier: "20",
    marginOfSafety: "20",
  });

  // FCF data state for both stocks - Updated structure to match Excel
  const [stock1FCFData, setStock1FCFData] = useState([
    { year: 2020, fcf: 272.54, marketCap: 4720.0 },
    { year: 2021, fcf: 318.33, marketCap: 8230.0 },
    { year: 2022, fcf: 380.53, marketCap: 8840.0 },
    { year: 2023, fcf: 459.97, marketCap: 10190.0 },
    { year: 2024, fcf: 640.62, marketCap: 11820.0 },
  ]);

  const [stock2FCFData, setStock2FCFData] = useState([
    { year: 2020, fcf: 150.25, marketCap: 3200 },
    { year: 2021, fcf: 185.4, marketCap: 4100 },
    { year: 2022, fcf: 220.75, marketCap: 4800.0 },
    { year: 2023, fcf: 265.8, marketCap: 5500.0 },
    { year: 2024, fcf: 320.95, marketCap: 6200.0 },
  ]);

  // Mock search results
  const mockSearchResults = [
    { id: 1, name: "HDFC Bank", code: "NSE:HDFCBANK", provider: "HDFC" },
    { id: 2, name: "ICICI Bank", code: "NSE:ICICIBANK", provider: "ICICI" },
    {
      id: 3,
      name: "Reliance Industries",
      code: "NSE:RELIANCE",
      provider: "RIL",
    },
    { id: 4, name: "TCS", code: "NSE:TCS", provider: "TCS" },
    { id: 5, name: "Infosys", code: "NSE:INFY", provider: "INFY" },
  ];

  const handleSearch = (e) => {
    const query = e?.target?.value;
    setSearchQuery(query);
    setShowSearchResults(query.length > 0);
  };

  const handleSelectStock = (stock) => {
    // Find the first available slot
    if (!selectedStocks[0]) {
      setSelectedStocks([stock, selectedStocks[1]]);
    } else if (!selectedStocks[1]) {
      setSelectedStocks([selectedStocks[0], stock]);
    } else {
      // If both slots are filled, replace the first one
      setSelectedStocks([stock, selectedStocks[1]]);
    }
    setSearchQuery("");
    setShowSearchResults(false);
  };

  const handleRemoveStock = (index) => {
    const newSelectedStocks = [...selectedStocks];
    newSelectedStocks[index] = null;
    setSelectedStocks(newSelectedStocks);
  };

  // Calculation functions for a given stock
  const calculateStockMetrics = (fcfData, params) => {
    const calculateAverageFCF = () => {
      const total = fcfData.reduce((sum, item) => sum + item.fcf, 0);
      return (total / fcfData.length).toFixed(2);
    };

    // Calculate FCF Growth Rates using Excel formula logic
    const calculateFCFGrowthRates = () => {
      const growthRates = [];
      for (let i = 1; i < fcfData.length; i++) {
        const previousFCF = fcfData[i - 1].fcf;
        const currentFCF = fcfData[i].fcf;

        // Excel formula: =IF(C5<0,(ABS((C6-C5)/C5)*100),(((C6-C5)/C5)*100))
        let rate;
        if (previousFCF < 0) {
          rate = Math.abs((currentFCF - previousFCF) / previousFCF) * 100;
        } else {
          rate = ((currentFCF - previousFCF) / previousFCF) * 100;
        }

        growthRates.push({
          year: fcfData[i].year,
          rate: parseFloat(rate.toFixed(2)),
          previousFCF,
          currentFCF,
        });
      }
      return growthRates;
    };

    const calculateEstimatedFutureFCF = () => {
      const growthRates = calculateFCFGrowthRates();
      const avgGrowthRate =
        growthRates.reduce((sum, item) => sum + item.rate, 0) /
        growthRates.length;
      return avgGrowthRate.toFixed(2);
    };

    // Perfect Calculation

    const calculateFCFMultiples = () => {
      return fcfData.map((item) => ({
        ...item,
        multiple: (item.marketCap / item.fcf).toFixed(2),
      }));
    };

    const calculateAverageFCFMultiple = () => {
      const multiples = calculateFCFMultiples();
      const total = multiples.reduce(
        (sum, item) => sum + parseFloat(item.multiple),
        0
      );
      return (total / multiples.length).toFixed(2);
    };

    // Replace the existing generateFutureFCF function with this corrected version:

    const generateFutureFCF = () => {
      const lastFCF = fcfData[fcfData.length - 1].fcf; // 640.62 from 2024
      const growthRate = parseFloat(params.EstimatedFutureFCF) / 100; // 12%
      const discountRate = parseFloat(params.expectedReturns) / 100; // 15%

      const futureCashFlows = [];
      let currentFCF = lastFCF;

      for (let year = 1; year <= 9; year++) {
        // Excel Formula: =C9*(1+$F$7%) where C9 is previous FCF and F7 is 12%
        currentFCF = currentFCF * (1 + growthRate);

        // Excel Formula: =C12/(1+$F$2%)^E12 where F2 is 15% and E12 is year
        const discountedValue = currentFCF / Math.pow(1 + discountRate, year);

        futureCashFlows.push({
          year: 2024 + year,
          futureCF: parseFloat(currentFCF.toFixed(2)),
          discountedCF: parseFloat(discountedValue.toFixed(2)),
        });
      }
      return futureCashFlows;
    };

    // Replace the existing calculateTerminalValue function with this:

    const calculateTerminalValue = () => {
      const futureCashFlows = generateFutureFCF();
      const lastFCF = futureCashFlows[futureCashFlows.length - 1].futureCF; // FCF from 2033
      const terminalMultiplier = parseFloat(params.terminalFCFMultiplier); // 15 from K11

      // Excel Formula: =C20*K11 (FCF 2033 * Terminal FCF Multiplier)
      const terminalValue = lastFCF * terminalMultiplier;

      const discountRate = parseFloat(params.expectedReturns) / 100; // 15%

      // Excel Formula: =C21/(1+$F$2%)^E20 (Terminal Value / (1+15%)^9)
      const discountedTerminalValue =
        terminalValue / Math.pow(1 + discountRate, 9);

      return {
        terminalValue: parseFloat(terminalValue.toFixed(2)),
        discountedTerminalValue: parseFloat(discountedTerminalValue.toFixed(2)),
      };
    };

    const calculateIntrinsicValue = () => {
      const futureCashFlows = generateFutureFCF();
      const totalDiscountedCF = futureCashFlows.reduce(
        (sum, cf) => sum + parseFloat(cf.discountedCF),
        0
      );

      const terminalValue = calculateTerminalValue();
      const totalFutureCF =
        totalDiscountedCF + parseFloat(terminalValue.discountedTerminalValue);
      const withMarginOfSafety =
        totalFutureCF * (1 - parseFloat(params.marginOfSafety) / 100);
      return {
        totalFutureCF: totalFutureCF.toFixed(2),
        withMarginOfSafety: withMarginOfSafety.toFixed(2),
      };
    };

    return {
      calculateAverageFCF,
      calculateFCFGrowthRates,
      calculateEstimatedFutureFCF,
      calculateFCFMultiples,
      calculateAverageFCFMultiple,
      generateFutureFCF,
      calculateTerminalValue,
      calculateIntrinsicValue,
    };
  };

  const updateStockParams = (stockIndex, field, value) => {
    if (stockIndex === 0) {
      setStock1Params((prev) => ({ ...prev, [field]: value }));
    } else {
      setStock2Params((prev) => ({ ...prev, [field]: value }));
    }
  };

  useEffect(() => {
    if (searchQuery) {
      setSearchResults(
        mockSearchResults.filter((stock) =>
          stock.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const renderStockAnalysis = (stock, stockIndex) => {
    const fcfData = stockIndex === 0 ? stock1FCFData : stock2FCFData;
    const params = stockIndex === 0 ? stock1Params : stock2Params;
    const metrics = calculateStockMetrics(fcfData, params);

    const futureCashFlows = metrics.generateFutureFCF();
    const terminalValue = metrics.calculateTerminalValue();
    const intrinsicValue = metrics.calculateIntrinsicValue();

    return (
      <div key={stockIndex} className="space-y-6">
        {/* Stock Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {stock.name}
              </h2>
              <p className="text-gray-600">{stock.code}</p>
            </div>
            <div
              className={`mt-3 p-2 rounded-lg text-center px-4 ${
                parseFloat(intrinsicValue.withMarginOfSafety) >
                fcfData[fcfData.length - 1].marketCap
                  ? "bg-green-100"
                  : "bg-red-100"
              }`}
            >
              <span
                className={`font-bold text-sm ${
                  parseFloat(intrinsicValue.withMarginOfSafety) >
                  fcfData[fcfData.length - 1].marketCap
                    ? "text-green-800"
                    : "text-red-800"
                }`}
              >
                {parseFloat(intrinsicValue.withMarginOfSafety) >
                fcfData[fcfData.length - 1].marketCap
                  ? "BUY"
                  : "HOLD/SELL"}
              </span>
            </div>
            <button
              onClick={() => handleRemoveStock(stockIndex)}
              className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Parameters */}
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 flex items-center justify-between">
            <h4 className="text-md font-semibold text-gray-800 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              Expected Returns
            </h4>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={params.expectedReturns}
                onChange={(e) =>
                  updateStockParams(
                    stockIndex,
                    "expectedReturns",
                    e.target.value
                  )
                }
                className="w-20 p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-yellow-100"
              />
              <span className="text-gray-600 text-sm">%</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 flex items-center justify-between">
            <h4 className="text-md font-semibold text-gray-800 flex items-center gap-2">
              Estimated Future FCF
            </h4>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={params.EstimatedFutureFCF}
                onChange={(e) =>
                  updateStockParams(
                    stockIndex,
                    "EstimatedFutureFCF",
                    e.target.value
                  )
                }
                className="w-20 p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-yellow-100"
              />
              <span className="text-gray-600 text-sm">%</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 flex items-center justify-between">
            <h4 className="text-md font-semibold text-gray-800">
              Terminal FCF Multiplier
            </h4>
            <input
              type="number"
              value={params.terminalFCFMultiplier}
              onChange={(e) =>
                updateStockParams(
                  stockIndex,
                  "terminalFCFMultiplier",
                  e.target.value
                )
              }
              className="w-20 p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-yellow-100 mr-5"
            />
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 flex items-center justify-between">
            <h4 className="text-md font-semibold text-gray-800 flex items-center gap-2">
              <Shield className="w-4 h-4 text-orange-600" />
              Margin of Safety
            </h4>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={params.marginOfSafety}
                onChange={(e) =>
                  updateStockParams(
                    stockIndex,
                    "marginOfSafety",
                    e.target.value
                  )
                }
                className="w-20 p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-green-100"
              />
              <span className="text-gray-600 text-sm">%</span>
            </div>
          </div>

          <button
            type="button"
            className="mt-3 p-2 w-full bg-fuchsia-900 rounded-lg text-center hover:bg-fuchsia-700"
          >
            <span className="text-white font-bold text-sm">CALCULATE</span>
          </button>
        </div>

        {/* FCF Historical Data - Excel Structure Match */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              FCF Historical Analysis
            </h4>
          </div>
        </div>

        <div>
          <h5 className="font-semibold text-gray-800 mb-3 bg-green-100 p-2 rounded">
            FCF (in Billion INR)
          </h5>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-green-200">
                  <th className="border border-gray-300 py-2 px-3 text-left font-semibold">
                    Year
                  </th>
                  <th className="border border-gray-300 py-2 px-3 text-left font-semibold">
                    FCF
                  </th>
                  <th className="border border-gray-300 py-2 px-3 text-left font-semibold">
                    Growth %
                  </th>
                </tr>
              </thead>
              <tbody>
                {fcfData.map((item, index) => {
                  const growthRates = metrics.calculateFCFGrowthRates();
                  const growthRate = growthRates.find(
                    (g) => g.year === item.year
                  );
                  return (
                    <tr
                      key={item.year}
                      className="bg-green-50 hover:bg-green-100"
                    >
                      <td className="border border-gray-300 py-2 px-3 font-semibold">
                        {item.year}
                      </td>
                      <td className="border border-gray-300 py-2 px-3">
                        {item.fcf}
                      </td>
                      <td className="border border-gray-300 py-2 px-3 text-blue-600 font-medium">
                        {growthRate ? `${growthRate.rate}%` : "-"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="bg-yellow-100 p-3 rounded border mt-4 flex items-center justify-between">
            <div className="text-sm font-medium text-gray-700">Avg. FCF</div>
            <div className="text-lg font-bold text-gray-800">
              {metrics.calculateEstimatedFutureFCF()}
            </div>
          </div>
        </div>

        <div>
          <h5 className="font-semibold text-gray-800 mb-3 bg-blue-100 p-2 rounded">
            Market Analysis
          </h5>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-blue-200">
                  <th className="border border-gray-300 py-2 px-3 text-left font-semibold">
                    Year
                  </th>
                  {/* <th className="border border-gray-300 py-2 px-3 text-left font-semibold">FCF</th> */}
                  <th className="border border-gray-300 py-2 px-3 text-left font-semibold">
                    Market Cap
                  </th>
                  <th className="border border-gray-300 py-2 px-3 text-left font-semibold">
                    FCF Multiple
                  </th>
                </tr>
              </thead>
              <tbody>
                {metrics.calculateFCFMultiples().map((item, index) => (
                  <tr key={item.year} className="bg-blue-50 hover:bg-blue-100">
                    <td className="border border-gray-300 py-2 px-3 font-semibold">
                      {item.year}
                    </td>
                    {/* <td className="border border-gray-300 py-2 px-3">{item.fcf}</td> */}
                    <td className="border border-gray-300 py-2 px-3">
                      {item.marketCap.toFixed(2)}
                    </td>
                    <td className="border border-gray-300 py-2 px-3 text-purple-600 font-medium">
                      {item.multiple}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* FCF Multiple Summary */}
          <div className="mt-4">
            <div className="bg-purple-100 p-3 rounded border flex items-center justify-between">
              <div className="text-sm font-medium text-gray-700">
                Average FCF Multiple
              </div>
              <div className="text-lg font-bold text-gray-800">
                {metrics.calculateAverageFCFMultiple()}
              </div>
            </div>
          </div>
        </div>

        {/* Future Cash Flow Projections - FIXED DESIGN */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-green-600" />
              Future Cash Flow Projections
            </h4>
            <p className="text-sm text-gray-600 mt-1">
              Discounted at {params.expectedReturns}% expected return rate
            </p>
          </div>

          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-green-100 to-green-200 border-b-2 border-green-300">
                    <th className="text-left py-3 px-4 font-semibold text-gray-800 border-r border-green-300">
                      Year
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-800 border-r border-green-300">
                      Future Cash Flow (B)
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-800 border-r border-green-300">
                      Discounted CF (B)
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-800">
                      Period
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {futureCashFlows.map((cf, index) => (
                    <tr
                      key={cf.year}
                      className={`border-b border-gray-200 hover:bg-green-50 transition-all duration-150 ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="py-3 px-4 font-semibold text-gray-800 border-r border-gray-200">
                        {cf.year}
                      </td>
                      <td className="py-3 px-4 text-gray-700 border-r border-gray-200">
                        ₹{cf.futureCF}
                      </td>
                      <td className="py-3 px-4 text-green-600 font-medium border-r border-gray-200">
                        ₹{cf.discountedCF}
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        Year {index + 1}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-t-2 border-yellow-300">
                    <td className="py-4 px-4 font-bold text-gray-800 border-r border-yellow-300">
                      Terminal Value (2033)
                    </td>
                    <td className="py-4 px-4 font-bold text-yellow-800 border-r border-yellow-300">
                      ₹{terminalValue.terminalValue} B
                    </td>
                    <td className="py-4 px-4 font-bold text-yellow-600 border-r border-yellow-300">
                      ₹{terminalValue.discountedTerminalValue} B
                    </td>
                    <td className="py-4 px-4 text-gray-600 font-medium">
                      Terminal
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Summary Results */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-sm p-4 border border-blue-200">
          <h4 className="text-md font-semibold text-gray-800 mb-3">
            Calculation Summary
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Future CF:</span>
              <span className="font-semibold">
                {intrinsicValue.totalFutureCF}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">With Margin of Safety:</span>
              <span className="font-semibold text-green-600">
                {intrinsicValue.withMarginOfSafety}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Current Market Cap:</span>
              <span className="font-semibold">
                {fcfData[fcfData.length - 1].marketCap.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const hasAnyStock = selectedStocks[0] || selectedStocks[1];
  const availableSlots =
    2 - selectedStocks.filter((stock) => stock !== null).length;

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              Stock Comparison Calculator
            </h1>
            <div className="relative w-full md:w-96">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder={`Search stocks for comparison (${availableSlots} slots available)`}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                disabled={availableSlots === 0}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />

              {showSearchResults && availableSlots > 0 && (
                <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-80 overflow-y-auto">
                  {searchResults.length > 0 ? (
                    searchResults
                      .filter(
                        (stock) =>
                          !selectedStocks.some(
                            (selected) => selected?.id === stock.id
                          )
                      )
                      .map((stock) => (
                        <div
                          key={stock.id}
                          className="p-3 hover:bg-blue-50 cursor-pointer border-b last:border-b-0 transition-colors"
                          onClick={() => handleSelectStock(stock)}
                        >
                          <div className="font-medium text-gray-800">
                            {stock.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {stock.code}
                          </div>
                        </div>
                      ))
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      No stocks found
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {hasAnyStock ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {selectedStocks.map((stock, index) =>
                stock ? (
                  <div key={index} className="space-y-6">
                    {renderStockAnalysis(stock, index)}
                  </div>
                ) : (
                  <div
                    key={index}
                    className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-8 text-center"
                  >
                    <Calculator className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <div className="text-gray-500 mb-2">
                      Stock Slot {index + 1}
                    </div>
                    <div className="text-sm text-gray-400">
                      Search and select a stock to compare
                    </div>
                  </div>
                )
              )}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-lg border border-gray-200">
              <Calculator className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <div className="text-gray-500 mb-2 text-lg">
                No stocks selected for comparison
              </div>
              <div className="text-sm text-gray-400">
                Search and select up to 2 stocks to compare their intrinsic
                values
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IntrinsicCalculation;