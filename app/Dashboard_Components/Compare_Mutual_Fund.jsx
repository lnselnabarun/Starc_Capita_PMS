import React, { useState } from "react";
import { Search, X, ChevronDown, ChevronUp } from "lucide-react";

const MutualFundComparison = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFunds, setSelectedFunds] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [sectionStates, setSectionStates] = useState({
    overview: true,
    returns: true,
    portfolio: true,
    riskMeasures: true,
    fundDetails: true
  });

  // Example fund data structure based on the provided API response
  const dummyFundData = {
    id: 6,
    amc: "HDFC Mutual Fund",
    scheme: "HDFC Long Duration Debt Fund Direct Growth",
    details: [
      { name: "Asset Alloc Bond Net", details: "96.35659" },
      { name: "Asset Alloc Cash Net", details: "3.50146" },
      { name: "Asset Alloc Equity Net", details: "0" },
      { name: "Expense Ratio", details: "0.30000" },
      { name: "Category", details: "Long Duration" },
      { name: "NAV Value", details: "11.89080" },
      { name: "Trailing Return 1 Month", details: "0.48337" },
      { name: "Trailing Return 1 Year", details: "11.37358" },
      { name: "Return Since Inception", details: "9.36746" },
      { name: "AUM (in Rs.)", details: "54830678000" },
      { name: "Exit Load", details: "Nil" },
      { name: "Sharpe Ratio 1 Year", details: "1.416" },
      { name: "Standard Deviation 1 Year", details: "4.005" }
    ]
  };

  // Dummy search results based on the data structure
  const dummySearchResults = [
    {
      id: 1,
      amc: "HDFC Mutual Fund",
      scheme: "HDFC Long Duration Debt Fund Direct Growth",
      category: "Long Duration"
    },
    {
      id: 2,
      amc: "SBI Mutual Fund",
      scheme: "SBI Long Duration Debt Fund Direct Growth",
      category: "Long Duration"
    },
    {
      id: 3,
      amc: "Axis Mutual Fund",
      scheme: "Axis Long Duration Debt Fund Direct Growth",
      category: "Long Duration"
    }
  ];

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setShowSearchResults(e.target.value.length > 0);
  };

  const handleAddFund = (fund) => {
    if (selectedFunds.length < 4) {
      setSelectedFunds([...selectedFunds, fund]);
      setSearchQuery("");
      setShowSearchResults(false);
    }
  };

  const handleRemoveFund = (fundId) => {
    setSelectedFunds(selectedFunds.filter(fund => fund.id !== fundId));
  };

  const toggleSection = (section) => {
    setSectionStates(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const sections = {
    overview: {
      title: "Fund Overview",
      fields: [
        { key: "Category", label: "Category" },
        { key: "Fund Name", label: "Fund Name" },
        { key: "AUM (in Rs.)", label: "AUM" },
        { key: "NAV Value", label: "NAV" }
      ]
    },
    returns: {
      title: "Returns",
      fields: [
        { key: "Trailing Return 1 Month", label: "1 Month" },
        { key: "Trailing Return 1 Year", label: "1 Year" },
        { key: "Return Since Inception", label: "Since Inception" },
        { key: "Rolling Return Avg 1YR", label: "1 Year Avg Rolling" },
        { key: "Rolling Return Avg 3YR", label: "3 Year Avg Rolling" }
      ]
    },
    portfolio: {
      title: "Portfolio Allocation",
      fields: [
        { key: "Asset Alloc Bond Net", label: "Bonds" },
        { key: "Asset Alloc Cash Net", label: "Cash" },
        { key: "Asset Alloc Equity Net", label: "Equity" },
        { key: "Other Net", label: "Others" }
      ]
    },
    riskMeasures: {
      title: "Risk Measures",
      fields: [
        { key: "Standard Deviation 1 Year", label: "Standard Deviation (1Y)" },
        { key: "Sharpe Ratio 1 Year", label: "Sharpe Ratio (1Y)" }
      ]
    },
    fundDetails: {
      title: "Fund Details",
      fields: [
        { key: "Expense Ratio", label: "Expense Ratio" },
        { key: "Exit Load", label: "Exit Load" },
        { key: "ISIN", label: "ISIN" },
        { key: "AMFI Code", label: "AMFI Code" }
      ]
    }
  };

  const renderTable = (section) => (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          <th className="px-4 py-3 bg-gray-50 text-left text-sm font-semibold text-gray-700 border-b border-gray-200 sticky left-0 z-10">
            Metric
          </th>
          {selectedFunds.map((fund) => (
            <th key={fund.id} className="px-4 py-3 bg-gray-50 text-left text-sm font-semibold text-gray-700 border-b border-gray-200">
              {fund.scheme}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sections[section].fields.map((field, rowIndex) => (
          <tr key={field.key} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
            <td className="px-4 py-3 text-sm font-medium text-gray-700 border-b border-gray-200 sticky left-0 bg-inherit">
              {field.label}
            </td>
            {selectedFunds.map((fund) => (
              <td key={fund.id} className="px-4 py-3 text-sm text-gray-700 border-b border-gray-200 text-right">
                {field.key.includes("Return") || field.key.includes("Ratio") ? 
                  `${(Math.random() * 20).toFixed(2)}%` : 
                  field.key.includes("AUM") ? 
                    `₹${(Math.random() * 10000).toFixed(0)} Cr` :
                    `${(Math.random() * 100).toFixed(2)}`
                }
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );


  return (
    <div className="container mx-auto px-4 md:px-8 py-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-2xl font-bold text-gray-800">Compare Mutual Funds</h1>
          <div className="relative w-full md:w-96">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search mutual funds to compare"
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            
            {showSearchResults && (
              <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200">
                {dummySearchResults
                  .filter(fund => fund.scheme.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map(fund => (
                    <div
                      key={fund.id}
                      className="p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                      onClick={() => handleAddFund(fund)}
                    >
                      <div className="font-medium text-gray-800">{fund.scheme}</div>
                      <div className="text-sm text-gray-500 mt-1">
                        {fund.amc} • {fund.category}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>

        {selectedFunds.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {selectedFunds.map(fund => (
              <div key={fund.id} className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-medium text-gray-800">{fund.scheme}</h3>
                    <span className="text-sm text-gray-500">{fund.amc}</span>
                  </div>
                  <button
                    onClick={() => handleRemoveFund(fund.id)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <button
                  onClick={() => handleRemoveFund(fund.id)}
                  className="w-full bg-purple-100 hover:bg-purple-200 text-purple-700 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        {selectedFunds.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <div className="text-gray-500 mb-2">No funds selected for comparison</div>
            <div className="text-sm text-gray-400">Search and add up to 4 mutual funds to compare</div>
          </div>
        )}

        {selectedFunds.length > 0 && (
          <div className="space-y-6">
            {Object.entries(sections).map(([key, section]) => (
              <div key={key} className="bg-white rounded-lg shadow-sm border border-gray-200">
                <button
                  onClick={() => toggleSection(key)}
                  className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50"
                >
                  <h2 className="text-lg font-semibold text-gray-800">{section.title}</h2>
                  {sectionStates[key] ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                {sectionStates[key] && (
                  <div className="p-6 border-t border-gray-200">
                    <div className="overflow-x-auto">
                      {renderTable(key)}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>

  );
};

export default MutualFundComparison;