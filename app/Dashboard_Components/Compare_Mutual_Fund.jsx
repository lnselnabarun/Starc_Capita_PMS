import React, { useState, useEffect } from "react";
import { Search, X, ChevronDown, ChevronUp } from "lucide-react";
import { useRouter } from "next/navigation";

const MutualFundComparison = () => {
  const router = useRouter();
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
  const isAlreadySelected = selectedFunds?.some(
    (selectedFund) => selectedFund?.id === fund?.id
  );

  if (!isAlreadySelected && selectedFunds?.length < 4) {
    setIsLoading(true);

    try {
      const fundDetails = await fetchFundDetails(fund);

      if (fundDetails) {
        setSelectedFunds((prevFunds) => [
          ...prevFunds,
          {
            ...fund,
            details: fundDetails.details || [],
            folio: fundDetails.folio,
            currentValue: fundDetails.currentValue,
            currentXIRR: fundDetails.currentXIRR,
          },
        ]);
      }
    } catch (error) {
      console.error("Error adding fund:", error);
    } finally {
      setSearchQuery("");
      setShowSearchResults(false);
      setIsLoading(false);
    }
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

  const transformApiResponseToDetails = (apiData, fullData) => {
    console.log(apiData, "apiDataapiData");
    console.log(fullData, "fullData with rolling returns");
    
    const detailsArray = [];
    
    // Fund Overview
    detailsArray.push({ name: "Fund Name", details: apiData["FSCBI-FundLegalName"] || "N/A" });
    detailsArray.push({ name: "AUM (in Rs.)", details: apiData["FNA-AsOfOriginalReported"] || "N/A" });
    detailsArray.push({ name: "NAV Value", details: apiData["TS-DayEndNAV"] || "N/A" });
    
    // Returns
    detailsArray.push({ name: "Trailing Return 1 Month", details: apiData["TTR-Return1Mth"] || "N/A" });
    detailsArray.push({ name: "Trailing Return 1 Year", details: apiData["TTR-Return1Yr"] || "N/A" });
    detailsArray.push({ name: "Trailing Return 3 Year", details: apiData["TTR-Return3Yr"] || "N/A" });
    detailsArray.push({ name: "Trailing Return 5 Year", details: apiData["TTR-Return5Yr"] || "N/A" });
    detailsArray.push({ name: "Return Since Inception", details: apiData["TTR-ReturnSinceInception"] || "N/A" });
    
    // Rolling Returns - Now accessing from fullData instead of apiData
    detailsArray.push({ name: "Rolling Return Avg 1YR", details: fullData["Rolling Return Avg 1YR"] || "N/A" });
    detailsArray.push({ name: "Rolling Return Min 1YR", details: fullData["Rolling Return Min 1YR"] || "N/A" });
    detailsArray.push({ name: "Rolling Return Max 1YR", details: fullData["Rolling Return Max 1YR"] || "N/A" });
    detailsArray.push({ name: "Rolling Return Avg 3YR", details: fullData["Rolling Return Avg 3YR"] || "N/A" });
    detailsArray.push({ name: "Rolling Return Min 3YR", details: fullData["Rolling Return Min 3YR"] || "N/A" });
    detailsArray.push({ name: "Rolling Return Max 3YR", details: fullData["Rolling Return Max 3YR"] || "N/A" });
    detailsArray.push({ name: "Rolling Return Avg 5YR", details: fullData["Rolling Return Avg 5YR"] || "N/A" });
    detailsArray.push({ name: "Rolling Return Min 5YR", details: fullData["Rolling Return Min 5YR"] || "N/A" });
    detailsArray.push({ name: "Rolling Return Max 5YR", details: fullData["Rolling Return Max 5YR"] || "N/A" });
    
    // Portfolio Allocation
    detailsArray.push({ name: "Asset Alloc Bond Net", details: apiData["AABRP-AssetAllocBondNet"] || "N/A" });
    detailsArray.push({ name: "Asset Alloc Cash Net", details: apiData["AABRP-AssetAllocCashNet"] || "N/A" });
    detailsArray.push({ name: "Asset Alloc Equity Net", details: apiData["AABRP-AssetAllocEquityNet"] || "N/A" });
    detailsArray.push({ name: "Other Net", details: "N/A" }); // Not available in new API
    
    // Risk Measures
    detailsArray.push({ name: "Standard Deviation 1 Year", details: apiData["RM-StdDev1Yr"] || "N/A" });
    detailsArray.push({ name: "Sharpe Ratio 1 Year", details: apiData["RM-SharpeRatio1Yr"] || "N/A" });
    
    // Fund Details
    detailsArray.push({ name: "Expense Ratio", details: apiData["ARF-InterimNetExpenseRatio"] || "N/A" });
    detailsArray.push({ name: "Exit Load", details: apiData["PF-deferred_load_additional_details"] || "N/A" });
    detailsArray.push({ name: "ISIN", details: apiData["FSCBI-ISIN"] || "N/A" });
    detailsArray.push({ name: "AMFI Code", details: apiData["FSCBI-AMFICode"] || "N/A" });
    
    return detailsArray;
  };

 // 1. Update the fetchFundDetails function
 const fetchFundDetails = async (fundId) => {
  try {
    const response = await fetch(
      "https://dev.netrumusa.com/starkcapital/api-backend/get-isindetails-forcombinedsreach",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isin: fundId?.FSCBI_ISIN.toString() }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (data?.status === "success" && data?.data) {
      // Pass both api data and rolling returns data to transform function
      const transformedDetails = transformApiResponseToDetails(data?.data?.api, data?.data);
      
      return {
        details: transformedDetails,
        folio: data.data.folio || null,
        currentValue: data.data.currentValue || null,
        currentXIRR: data.data.currentXIRR || null,
      };
    } else {
      // localStorage.clear();
      // router.push("/");
    }
  } catch (error) {
    console.error("Error fetching fund details:", error);
    // localStorage.clear();
    //     router.push("/");
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

      console.log(data?.data, "formattedResultsformattedResults")
      if (data?.status === "success") {
  

        setSearchResults(data?.data);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Search API Error:", error);
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
    }, 500); // 300ms debounce time

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
        // Uncomment these to show rolling returns
        { key: "Rolling Return Avg 1YR", label: "1 Year Avg Rolling" },
        { key: "Rolling Return Min 1YR", label: "1 Year Min Rolling" },
        { key: "Rolling Return Max 1YR", label: "1 Year Max Rolling" },
        { key: "Rolling Return Avg 3YR", label: "3 Year Avg Rolling" },
        { key: "Rolling Return Min 3YR", label: "3 Year Min Rolling" },
        { key: "Rolling Return Max 3YR", label: "3 Year Max Rolling" },
        { key: "Rolling Return Avg 5YR", label: "5 Year Avg Rolling" },
        { key: "Rolling Return Min 5YR", label: "5 Year Min Rolling" },
        { key: "Rolling Return Max 5YR", label: "5 Year Max Rolling" },
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
              {fund?.['FSCBI_LegalName'] || "Unknown Fund"}
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

                      {fund?.FSCBI_ISIN !== null ? <div
                        key={fund.id}
                        className="p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                        onClick={() => {
                          handleAddFund(fund);
                        }}
                      >
                        <div className="font-medium text-gray-800">
                          {fund.FSCBI_LegalName}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          {fund.FSCBI_ProviderCompanyName}
                        </div>

                      </div> : null}


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
                    <h3 className="font-medium text-gray-800">  {fund?.['FSCBI_LegalName'] || "Unknown Fund"}</h3>
                    <span className="text-sm text-gray-500">{fund?.['FSCBI_ProviderCompanyName'] || "Unknown Fund"}</span>
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
