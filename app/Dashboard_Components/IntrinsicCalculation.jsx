import React, { useState, useEffect } from "react";
import { Search, X, Calculator, TrendingUp, Shield } from "lucide-react";

const IntrinsicCalculation = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFund, setSelectedFund] = useState(null);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Input states for calculation parameters
  const [expectedReturns, setExpectedReturns] = useState("15");
  const [terminalFCFMultiplier, setTerminalFCFMultiplier] = useState("20");
  const [marginOfSafety, setMarginOfSafety] = useState("20");

  // FCF data state
  const [fcfData, setFcfData] = useState([
    { year: 2020, fcf: 272.54, marketCap: 4720.0 },
    { year: 2021, fcf: 318.33, marketCap: 8230.0 },
    { year: 2022, fcf: 380.53, marketCap: 8840.0 },
    { year: 2023, fcf: 459.97, marketCap: 10190.0 },
    { year: 2024, fcf: 640.62, marketCap: 11820.0 },
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
  ];

  const handleSearch = (e) => {
    const query = e?.target?.value;
    setSearchQuery(query);
    setShowSearchResults(query.length > 0);
  };

  const handleSelectFund = (fund) => {
    setSelectedFund(fund);
    setSearchQuery("");
    setShowSearchResults(false);
  };

  const handleRemoveFund = () => {
    setSelectedFund(null);
  };

  // Calculations
  const calculateAverageFCF = () => {
    const total = fcfData.reduce((sum, item) => sum + item.fcf, 0);
    return (total / fcfData.length).toFixed(2);
  };

  const calculateFCFGrowthRates = () => {
    const growthRates = [];
    for (let i = 1; i < fcfData.length; i++) {
      const rate =
        ((fcfData[i].fcf - fcfData[i - 1].fcf) / fcfData[i - 1].fcf) * 100;
      growthRates.push(rate);
    }
    return growthRates;
  };

  const calculateEstimatedFutureFCF = () => {
    const avgGrowthRate =
      calculateFCFGrowthRates().reduce((sum, rate) => sum + rate, 0) /
      calculateFCFGrowthRates().length;
    return avgGrowthRate.toFixed(2);
  };

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

  const generateFutureFCF = () => {
    const lastFCF = fcfData[fcfData.length - 1].fcf;
    const growthRate = parseFloat(calculateEstimatedFutureFCF()) / 100;
    const discountRate = parseFloat(expectedReturns) / 100;

    const futureCashFlows = [];
    let currentFCF = lastFCF;

    for (let year = 1; year <= 9; year++) {
      currentFCF = currentFCF * (1 + growthRate);
      const discountedValue = currentFCF / Math.pow(1 + discountRate, year);
      futureCashFlows.push({
        year: 2024 + year,
        futureCF: currentFCF.toFixed(2),
        discountedCF: discountedValue.toFixed(2),
      });
    }

    return futureCashFlows;
  };

  const calculateTerminalValue = () => {
    const futureCashFlows = generateFutureFCF();
    const lastFCF = parseFloat(
      futureCashFlows[futureCashFlows.length - 1].futureCF
    );
    const terminalValue = lastFCF * parseFloat(terminalFCFMultiplier);
    const discountRate = parseFloat(expectedReturns) / 100;
    const discountedTerminalValue =
      terminalValue / Math.pow(1 + discountRate, 9);

    return {
      terminalValue: terminalValue.toFixed(2),
      discountedTerminalValue: discountedTerminalValue.toFixed(2),
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
      totalFutureCF * (1 - parseFloat(marginOfSafety) / 100);

    return {
      totalFutureCF: totalFutureCF.toFixed(2),
      withMarginOfSafety: withMarginOfSafety.toFixed(2),
    };
  };

  useEffect(() => {
    if (searchQuery) {
      setSearchResults(
        mockSearchResults.filter((fund) =>
          fund.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const futureCashFlows = generateFutureFCF();
  const terminalValue = calculateTerminalValue();
  const intrinsicValue = calculateIntrinsicValue();

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              {/* <Calculator className="text-blue-600" /> */}
              Stock Intrinsic Value Calculator
            </h1>
            <div className="relative w-full md:w-96">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search stocks for calculation"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />

              {showSearchResults && (
                <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-80 overflow-y-auto">
                  {searchResults.length > 0 ? (
                    searchResults.map((fund) => (
                      <div
                        key={fund.id}
                        className="p-3 hover:bg-blue-50 cursor-pointer border-b last:border-b-0 transition-colors"
                        onClick={() => handleSelectFund(fund)}
                      >
                        <div className="font-medium text-gray-800">
                          {fund.name}
                        </div>
                        <div className="text-sm text-gray-500">{fund.code}</div>
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

          {/* Selected Stock */}
          {selectedFund && (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {selectedFund.name}
                  </h2>
                  <p className="text-gray-600">{selectedFund.code}</p>
                </div>
                <button
                  onClick={handleRemoveFund}
                  className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {selectedFund ? (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Left Column - Input Parameters */}
              <div className="xl:col-span-1 space-y-6">
                {/* Expected Returns */}
                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    Expected Returns
                  </h3>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={expectedReturns}
                      onChange={(e) => setExpectedReturns(e.target.value)}
                      className="w-20 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-gray-600">%</span>
                  </div>
                </div>

                {/* Terminal FCF Multiplier */}
                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Terminal FCF Multiplier
                  </h3>
                  <input
                    type="number"
                    value={terminalFCFMultiplier}
                    onChange={(e) => setTerminalFCFMultiplier(e.target.value)}
                    className="w-20 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Margin of Safety */}
                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-orange-600" />
                    Margin of Safety
                  </h3>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={marginOfSafety}
                      onChange={(e) => setMarginOfSafety(e.target.value)}
                      className="w-20 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-gray-600">%</span>
                  </div>
                </div>
                <button
                  type="button"
                  className="mt-4 p-3 bg-fuchsia-800 rounded-lg text-center w-full hover:bg-fuchsia-700 transition-colors"
                >
                  <span className="text-white font-bold text-lg">
                    Calculate
                  </span>
                </button>

                {/* Summary Results */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-sm p-6 border border-blue-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Calculation Summary
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Future CF:</span>
                      <span className="font-semibold">
                        {intrinsicValue.totalFutureCF}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        With Margin of Safety:
                      </span>
                      <span className="font-semibold text-green-600">
                        {intrinsicValue.withMarginOfSafety}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Current Market Cap:</span>
                      <span className="font-semibold">7,440.57</span>
                    </div>
                    <div className="mt-4 p-3 bg-green-100 rounded-lg text-center">
                      <span className="text-green-800 font-bold text-lg">
                        BUY
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Data Tables */}
              <div className="xl:col-span-2 space-y-6">
                {/* FCF Historical Data */}
                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    FCF (in Billion INR)
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left p-2">Year</th>
                          <th className="text-left p-2">FCF</th>
                          <th className="text-left p-2">Market Cap</th>
                          <th className="text-left p-2">FCF Multiple</th>
                        </tr>
                      </thead>
                      <tbody>
                        {calculateFCFMultiples().map((item) => (
                          <tr
                            key={item.year}
                            className="border-b border-gray-100"
                          >
                            <td className="p-2 font-medium">{item.year}</td>
                            <td className="p-2">{item.fcf}</td>
                            <td className="p-2">{item.marketCap.toFixed(2)}</td>
                            <td className="p-2">{item.multiple}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 p-4 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <div className="text-sm text-gray-600">Avg. FCF</div>
                      <div className="font-semibold text-blue-600">
                        {calculateAverageFCF()}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600">
                        Est. Future FCF
                      </div>
                      <div className="font-semibold text-green-600">
                        {calculateEstimatedFutureFCF()}%
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600">
                        Avg. FCF Multiple
                      </div>
                      <div className="font-semibold text-purple-600">
                        {calculateAverageFCFMultiple()}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600">
                        Est. Terminal Multiplier
                      </div>
                      <div className="font-semibold text-orange-600">
                        {terminalFCFMultiplier}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Future Cash Flow Projections */}
                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Future Cash Flow Projections
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left p-2">Year</th>
                          <th className="text-left p-2">Future CF</th>
                          <th className="text-left p-2">Discounted CF</th>
                          <th className="text-left p-2">Period</th>
                        </tr>
                      </thead>
                      <tbody>
                        {futureCashFlows.map((cf, index) => (
                          <tr
                            key={cf.year}
                            className="border-b border-gray-100"
                          >
                            <td className="p-2 font-medium">FCF ({cf.year})</td>
                            <td className="p-2">{cf.futureCF}</td>
                            <td className="p-2">{cf.discountedCF}</td>
                            <td className="p-2">{index + 1}</td>
                          </tr>
                        ))}
                        <tr className="border-b-2 border-gray-300 bg-yellow-50">
                          <td className="p-2 font-medium">
                            Terminal Value (2033)
                          </td>
                          <td className="p-2 font-semibold">
                            {terminalValue.terminalValue}
                          </td>
                          <td className="p-2 font-semibold">
                            {terminalValue.discountedTerminalValue}
                          </td>
                          <td className="p-2">-</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-lg border border-gray-200">
              <Calculator className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <div className="text-gray-500 mb-2 text-lg">
                No stock selected for calculation
              </div>
              <div className="text-sm text-gray-400">
                Search and select a stock to begin intrinsic value calculation
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IntrinsicCalculation;
