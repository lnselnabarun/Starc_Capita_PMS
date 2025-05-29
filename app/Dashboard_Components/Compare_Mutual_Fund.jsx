import React, { useState, useEffect } from "react";
import { Search, X, ChevronDown, ChevronUp } from "lucide-react";

const MutualFundComparison = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFunds, setSelectedFunds] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sectionStates, setSectionStates] = useState({
    overview: true,
    returns: true,
    portfolio: true,
    riskMeasures: true,
    fundDetails: true,
  });

  const handleSearch = (e) => {
    const query = e?.target?.value;
    setSearchQuery(query);
    setShowSearchResults(query.length > 0);
  };

  const handleAddFund = async (fund) => {
    // Check if the fund is already selected by comparing IDs
    const isAlreadySelected = selectedFunds?.some(
      (selectedFund) => selectedFund?.id === fund?.id
    );

    // Only add if not already selected and we have fewer than 4 funds
    if (!isAlreadySelected && selectedFunds?.length < 4) {
      // Set loading state
      setIsLoading(true);

      try {
        // Fetch detailed fund data
        const fundDetails = await fetchFundDetails(fund.id);

        if (fundDetails) {
          // Add full fund details to selected funds
          setSelectedFunds((prevFunds) => [
            ...prevFunds,
            {
              ...fund,
              details: fundDetails.details || [], // Ensure details exists
              folio: fundDetails.folio,
              currentValue: fundDetails.currentValue,
              currentXIRR: fundDetails.currentXIRR,
            },
          ]);
        } else {
          // Could add user notification here
        }
      } catch (error) {
      } finally {
        setSearchQuery("");
        setShowSearchResults(false);
        setIsLoading(false);
      }
    } else if (isAlreadySelected) {
    }
  };

  const findDetailValue = (fund, keyName) => {
    if (!fund || !Array.isArray(fund.details)) return "N/A";

    const detail = fund.details.find((item) => item.name === keyName);
    return detail ? detail.details : "N/A";
  };

  const handleRemoveFund = (fundId) => {
    setSelectedFunds(selectedFunds?.filter((fund) => fund?.id !== fundId));
  };

  const fetchFundDetails = async (fundId) => {
    // Note: We no longer set isLoading here since it's handled in handleAddFund
    try {
      const response = await fetch(
        "https://dev.netrumusa.com/starkcapital/api-backend/portfolio-detailswithid",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: fundId.toString() }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data?.status === "success" && data?.data) {
        // Add a check to ensure details property exists
        if (!data.data.details) {
          data.data.details = []; // Initialize with empty array to prevent errors
        }
        return data.data;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  };

  const fetchSearchResults = async (query) => {
    if (!query || query.length < 2) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        "https://dev.netrumusa.com/starkcapital/api-backend/sreach-fund-categories",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ search: query }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data?.status === "success" && Array.isArray(data?.data)) {
        // Transform API response to match our application's expected format
        const formattedResults = data.data.map((fund) => ({
          id: fund["portfolio_summary"],
          amc: fund["FSCBI-FundLegalName"]?.split(" ")[0] || "Unknown", // Extract first word as AMC with fallback
          scheme: fund["FSCBI-FundLegalName"] || "Unknown Fund",
          category: fund["AT-FundLevelCategoryName"] || "Uncategorized",
          nav: fund["DP-DayEndNAV"],
          amfiCode: fund["FSCBI-AMFICode"],
          isin: fund["FSCBI-ISIN"],
          expenseRatio: fund["ARF-InterimNetExpenseRatio"],
          currency: fund["DP-Currency"],
          aum: fund["FNA-AsOfOriginalReported"],
        }));

        setSearchResults(formattedResults);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchQuery) {
        fetchSearchResults(searchQuery);
      } else {
        setSearchResults([]);
      }
    }, 300); // 300ms debounce time

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const toggleSection = (section) => {
    setSectionStates((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const sections = {
    overview: {
      title: "Fund Overview",
      fields: [
        { key: "Category", label: "Category" },
        { key: "Fund Name", label: "Fund Name" },
        { key: "AUM (in Rs.)", label: "AUM" },
        { key: "NAV Value", label: "NAV" },
      ],
    },
    returns: {
      title: "Returns",
      fields: [
        { key: "Trailing Return 1 Month", label: "1 Month Trailing" },
        { key: "Trailing Return 1 Year", label: "1 Year Trailing" },
        { key: "Trailing Return 3 Year", label: "3 Year Trailing" },
        { key: "Trailing Return 5 Year", label: "5 Year Trailing" },
        { key: "Return Since Inception", label: "Since Inception" },
        {
          key: "Rolling Return Avg 0.08333333333333333YR",
          label: "1 Year Avg Rolling",
        },
        {
          key: "Rolling Return Max 0.08333333333333333YR",
          label: "1 Year Max Rolling",
        },
        {
          key: "Rolling Return Min 0.08333333333333333YR",
          label: "1 Year Min Rolling",
        },
        { key: "Rolling Return Avg 0.25YR", label: "3 Year Avg Rolling" },
        { key: "Rolling Return Max 0.25YR", label: "3 Year Max Rolling" },
        { key: "Rolling Return Min 0.25YR", label: "3 Year Min Rolling" },
        {
          key: "Rolling Return Avg 0.4166666666666667YR",
          label: "5 Year Avg Rolling",
        },
        {
          key: "Rolling Return Max 0.4166666666666667YR",
          label: "5 Year Max Rolling",
        },
        {
          key: "Rolling Return Min 0.4166666666666667YR",
          label: "5 Year Min Rolling",
        },
      ],
    },
    portfolio: {
      title: "Portfolio Allocation",
      fields: [
        { key: "Asset Alloc Bond Net", label: "Bonds" },
        { key: "Asset Alloc Cash Net", label: "Cash" },
        { key: "Asset Alloc Equity Net", label: "Equity" },
        { key: "Other Net", label: "Others" },
      ],
    },
    riskMeasures: {
      title: "Risk Measures",
      fields: [
        { key: "Standard Deviation 1 Year", label: "Standard Deviation (1Y)" },
        { key: "Sharpe Ratio 1 Year", label: "Sharpe Ratio (1Y)" },
      ],
    },
    fundDetails: {
      title: "Fund Details",
      fields: [
        { key: "Expense Ratio", label: "Expense Ratio" },
        { key: "Exit Load", label: "Exit Load" },
        { key: "ISIN", label: "ISIN" },
        { key: "AMFI Code", label: "AMFI Code" },
      ],
    },
  };

  const formatValue = (value, fieldKey) => {
    if (value === "N/A" || value === undefined || value === null) return "N/A";

    try {
      const numValue = parseFloat(value);

      if (isNaN(numValue)) return value;

      if (
        fieldKey.includes("Return") ||
        fieldKey.includes("XIRR") ||
        fieldKey === "Expense Ratio"
      ) {
        return `${numValue.toFixed(2)}%`;
      } else if (fieldKey === "AUM (in Rs.)") {
        return `₹${(numValue / 10000000).toFixed(2)} Cr`;
      }

      return value;
    } catch (error) {
      return value;
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
            <th
              key={fund.id}
              className="px-4 py-3 bg-gray-50 text-left text-sm font-semibold text-gray-700 border-b border-gray-200"
            >
              {fund?.scheme || "Unknown Fund"}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sections[section].fields?.map((field, rowIndex) => (
          <tr
            key={field?.key}
            className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}
          >
            <td className="px-4 py-3 text-sm font-medium text-gray-700 border-b border-gray-200 sticky left-0 bg-inherit">
              {field?.label}
            </td>
            {selectedFunds.map((fund) => {
              const value = findDetailValue(fund, field?.key);
              const displayValue = formatValue(value, field?.key);

              return (
                <td
                  key={fund?.id}
                  className="px-4 py-3 text-sm text-gray-700 border-b border-gray-200 text-right"
                >
                  {displayValue}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="container mx-auto px-4 md:px-8 py-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-2xl font-bold text-gray-800">
            Compare Mutual Funds
          </h1>
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
              <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-80 overflow-y-auto">
                {isLoading ? (
                  <div className="p-4 text-center text-gray-500">
                    Loading...
                  </div>
                ) : searchResults.length > 0 ? (
                  searchResults.map((fund) => (
                    <>
                      {fund?.id !== null ? (
                        <div
                          key={fund.id}
                          className="p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                          onClick={() => {
                            handleAddFund(fund);
                          }}
                        >
                          <div className="font-medium text-gray-800">
                            {fund.scheme}
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            {fund.amc} • {fund.category}
                          </div>
                        </div>
                      ) : null}
                    </>
                  ))
                ) : searchQuery.length > 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    No funds found
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </div>

        {selectedFunds.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {selectedFunds?.map((fund) => (
              <div
                key={fund.id}
                className="bg-white rounded-lg shadow-sm p-4 border border-gray-200"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-medium text-gray-800">{fund.scheme}</h3>
                    <span className="text-sm text-gray-500">{fund.amc}</span>
                  </div>
                  <button
                    onClick={() => handleRemoveFund(fund?.id)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <button
                  onClick={() => handleRemoveFund(fund?.id)}
                  className="w-full bg-purple-100 hover:bg-purple-200 text-purple-700 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <div className="text-gray-500 mb-2">
              No funds selected for comparison
            </div>
            <div className="text-sm text-gray-400">
              Search and add up to 4 mutual funds to compare
            </div>
          </div>
        )}

        {selectedFunds.length > 0 && (
          <div className="space-y-6">
            {Object.entries(sections).map(([key, section]) => (
              <div
                key={key}
                className="bg-white rounded-lg shadow-sm border border-gray-200"
              >
                <button
                  onClick={() => toggleSection(key)}
                  className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50"
                >
                  <h2 className="text-lg font-semibold text-gray-800">
                    {section.title}
                  </h2>
                  {sectionStates[key] ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                {sectionStates[key] && (
                  <div className="p-6 border-t border-gray-200">
                    <div className="overflow-x-auto">{renderTable(key)}</div>
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
