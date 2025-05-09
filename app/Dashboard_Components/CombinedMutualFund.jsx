"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Filter, Minus, Plus } from "lucide-react";
import Image from "next/image";

export default function CombinedMutualFund() {
  const router = useRouter();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [familyData, setFamilyData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter states
  const [costRange, setCostRange] = useState([0, 100000]);
  const [rollingReturns, setRollingReturns] = useState([0, 100]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedMarketCaps, setSelectedMarketCaps] = useState([]);
  const [selectedReturnPeriods, setSelectedReturnPeriods] = useState([]);
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    cost: true,
    riskRatios: true,
    netRollingReturns: false,
    filterMFName: true,
  });
  const [selectedMarketCap, setSelectedMarketCap] = useState("All");
  const [selectedRollingReturn, setSelectedRollingReturn] = useState("1 Year");

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const categories = [
    "Large-Cap",
    "Mid-Cap",
    "Equity - Other",
    "Flexi Cap",
    "Focused Fund",
    "Long Duration",
    "Fund of Funds",
    "Equity - Infrastructure",
    "Large & Mid-Cap",
    "Equity Savings",
    "Contra",
    "Arbitrage Fund",
    "Dynamic Asset Allocation",
    "Value",
    "Money Market",
    "Dynamic Bond",
    "Floating Rate",
    "Sector - Precious Metals",
    "Conservative Allocation",
    "Aggressive Allocation",
    "Liquid",
    "Low Duration",
    "Index Funds",
    "Small-Cap",
    "Multi Asset Allocation"
   ];

  // const riskRatios = ["LargeCap", "MidCap", "SmallCap", "SemiCap"];

  // const returnPeriods = ["1 Year", "3 Years", "5 Years"];

  const headers = [
    "Name",
    "Category",
    "Current Cost (₹)",
    "Current XIRR",
    "Current VALUE (₹)",
    "Expense Ratio",
    "Action",
  ];

  useEffect(() => {
    const initializeData = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("myData");

        if (!token) {
          setError("No authentication token found");
          return;
        }

        await GetCombindMutualFund(JSON.parse(token));
      } catch (err) {
        setError(err?.message);
      } finally {
        setIsLoading(false);
      }
    };

    initializeData();
  }, []);

  // Apply filters whenever filter states change
  useEffect(() => {
    if (familyData?.length > 0) {
      applyFilters();
    }
  }, [
    familyData, 
    searchTerm, 
    costRange, 
    selectedCategories, 
    selectedMarketCaps, 
    rollingReturns,
    selectedReturnPeriods,
    selectedMarketCap,
    selectedRollingReturn
  ]);

  const applyFilters = () => {
    let filtered = [...familyData];
  
    // Enhanced search filter
    if (searchTerm) {
      const searchLower = searchTerm?.toLowerCase();
      filtered = filtered?.filter(item => {
        // Search in fund name
        const fundName = item["FSCBI-FundLegalName"]?.toLowerCase() || "";
        // Also search in category
        const category = item["AT-FundLevelCategoryName"]?.toLowerCase() || "";
        
        return fundName.includes(searchLower) || category.includes(searchLower);
      });
    }
  
    // Rest of the filter logic remains the same
    // Filter by cost range
    filtered = filtered?.filter(item => 
      item?.close_calculated >= costRange[0] && 
      item?.close_calculated <= costRange[1]
    );
  
    // Filter by selected categories
    if (selectedCategories.length > 0) {
      filtered = filtered?.filter(item => 
        selectedCategories?.includes(item["AT-FundLevelCategoryName"])
      );
    }
  
    // The rest of your filtering code...
  
    setFilteredData(filtered);
  };

  async function GetCombindMutualFund(token) {
    try {
      const response = await axios({
        method: "post",
        url: "https://dev.netrumusa.com/starkcapital/api-backend/get-usermf-data",
        headers: {
          "Cache-Control": "no-cache",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {},
      });
      
      if (response.data?.status === "success") {
        const uniqueData = (response?.data?.data || []).filter(
          (item, index, self) =>
            index === self.findIndex((t) => t?.id === item?.id)
        );

        // Save the filtered data
        setFamilyData(uniqueData);
        setFilteredData(uniqueData); // Initialize filtered data with all data
      } else {
        throw new Error(
          response?.data?.message || "Failed to fetch mutual fund data"
        );
      }
    } catch (error) {
      throw error;
    }
  }

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  // const handleMarketCapChange = (marketCap) => {
  //   setSelectedMarketCaps(prev => {
  //     if (prev.includes(marketCap)) {
  //       return prev.filter(m => m !== marketCap);
  //     } else {
  //       return [...prev, marketCap];
  //     }
  //   });
  // };

  // const handleReturnPeriodChange = (period) => {
  //   setSelectedReturnPeriods(prev => {
  //     if (prev.includes(period)) {
  //       return prev.filter(p => p !== period);
  //     } else {
  //       return [...prev, period];
  //     }
  //   });
  // };

  const handleApplyFilters = () => {
    applyFilters();
    setIsFilterOpen(false);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setCostRange([0, 100000]);
    setSelectedCategories([]);
    setSelectedMarketCaps([]);
    setRollingReturns([0, 100]);
    setSelectedReturnPeriods([]);
    setSelectedMarketCap("All");
    setSelectedRollingReturn("1 Year");
    setFilteredData(familyData);
    setIsFilterOpen(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  function formatMoney(amount) {
    return new Intl.NumberFormat("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="space-y-6">
            {/* Title and Filter Row */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <h1 className="text-2xl font-bold text-gray-900">Fund List</h1>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="p-2 rounded-md hover:bg-gray-100"
                >
                  <Filter className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Filter Controls */}
            {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4 sm:items-center">
                <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                  Market Cap:
                </span>
                <select 
                  className="mt-1 block w-full sm:w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
                  value={selectedMarketCap}
                  onChange={(e) => setSelectedMarketCap(e.target.value)}
                >
                  <option value="All">All</option>
                  <option value="LargeCap">LargeCap</option>
                  <option value="MidCap">MidCap</option>
                  <option value="SmallCap">SmallCap</option>
                </select>
              </div>

              <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4 sm:items-center">
                <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                  Rolling Returns:
                </span>
                <select 
                  className="mt-1 block w-full sm:w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
                  value={selectedRollingReturn}
                  onChange={(e) => setSelectedRollingReturn(e.target.value)}
                >
                  <option value="1 Year">1 Year</option>
                  <option value="2 Years">2 Years</option>
                  <option value="3 Years">3 Years</option>
                </select>
              </div>
            </div> */}
          </div>
        </div>

        {/* Table Section */}
        {filteredData?.length !== 0 ? (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {headers?.map((header, index) => (
                      <th
                        key={index}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredData?.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-normal">
                        <div className="text-sm font-medium text-gray-900 max-w-xs line-clamp-2">
                          {item?.scheme}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-normal">
                        <div className="text-sm text-gray-900">
                          {item?.["AT-FundLevelCategoryName"]}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {`₹${formatMoney(
                            item?.close_calculated?.toFixed(2)
                          )}`}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {item?.currentXIRR}%
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {`${formatMoney(item?.currentValue?.toFixed(2))}`}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {item?.["ARF-InterimNetExpenseRatio"]}%
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() =>
                            router.push(`/CombinedDetailsMutualFund/${item.id}`)
                          }
                          className="text-green-600 hover:text-green-900 px-3 py-1 border border-green-600 rounded-md hover:bg-green-50"
                        >
                          Detail
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600">No mutual funds match your filters. Try adjusting your criteria.</p>
            <button 
              onClick={resetFilters}
              className="mt-4 px-4 py-2 bg-fuchsia-950 text-white rounded-md hover:bg-fuchsia-800"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {isFilterOpen === true ? (
        <div
          className={`fixed inset-y-0 left-0 w-full sm:w-80 bg-gray-100 shadow-lg transform ${
            isFilterOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out z-50 overflow-y-auto`}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Filter</h2>
              <div
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                aria-label="Close filter"
              >
                <Image
                  src={require("../assets/logo/CloseModal.png")}
                  alt="Close"
                  width={24}
                  height={24}
                />
              </div>
            </div>
            {/* Filter MF Name Section */}
            {/* <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium">Filter MF Name</h3>
                <button onClick={() => toggleSection("filterMFName")}>
                  {expandedSections.filterMFName ? (
                    <Minus size={20} />
                  ) : (
                    <Plus size={20} />
                  )}
                </button>
              </div>
              {expandedSections?.filterMFName && (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search mutual funds..."
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              )}
            </div> */}

            {/* Category Section */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium">Category</h3>
                <button onClick={() => toggleSection("category")}>
                  {expandedSections?.category ? (
                    <Minus size={20} />
                  ) : (
                    <Plus size={20} />
                  )}
                </button>
              </div>
              {expandedSections?.category && (
                <div className="space-y-2">
                  {categories?.map((category) => (
                    <div key={category} className="flex items-center">
                      <input
                        type="checkbox"
                        id={category}
                        className="mr-2 h-5 w-5"
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                      />
                      <label htmlFor={category} className="text-gray-600">
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cost Section */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium">Cost</h3>
                <button onClick={() => toggleSection("cost")}>
                  {expandedSections.cost ? (
                    <Minus size={20} />
                  ) : (
                    <Plus size={20} />
                  )}
                </button>
              </div>
              {expandedSections?.cost && (
                <div>
                  <input
                    type="range"
                    min="0"
                    max="100000"
                    value={costRange[1]}
                    onChange={(e) =>
                      setCostRange([costRange[0], parseInt(e?.target?.value)])
                    }
                    className="w-full"
                  />
                  <div className="flex justify-between">
                    <span>₹{costRange[0]}</span>
                    <span>₹{costRange[1]}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Risk Ratios Section */}
            {/* <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium">Market Cap</h3>
                <button onClick={() => toggleSection("riskRatios")}>
                  {expandedSections.riskRatios ? (
                    <Minus size={20} />
                  ) : (
                    <Plus size={20} />
                  )}
                </button>
              </div>
              {expandedSections.riskRatios && (
                <div className="space-y-2">
                  {riskRatios.map((ratio) => (
                    <div key={ratio} className="flex items-center">
                      <input
                        type="checkbox"
                        id={ratio}
                        className="mr-2 h-5 w-5"
                        checked={selectedMarketCaps.includes(ratio)}
                        onChange={() => handleMarketCapChange(ratio)}
                      />
                      <label htmlFor={ratio} className="text-gray-600">
                        {ratio}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div> */}

            {/* Net Rolling Returns Section */}
            {/* <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium">Net Rolling Returns</h3>
                <button onClick={() => toggleSection("netRollingReturns")}>
                  {expandedSections.netRollingReturns ? (
                    <Minus size={20} />
                  ) : (
                    <Plus size={20} />
                  )}
                </button>
              </div>
              {expandedSections.netRollingReturns && (
                <div className="space-y-4">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={rollingReturns[1]}
                    onChange={(e) =>
                      setRollingReturns([
                        rollingReturns[0],
                        parseInt(e.target.value),
                      ])
                    }
                    className="w-full"
                  />
                  <div className="flex justify-between mb-2">
                    <span>{rollingReturns[0]}%</span>
                    <span>{rollingReturns[1]}%</span>
                  </div>
                  <div className="space-y-2">
                    {returnPeriods.map((period) => (
                      <div key={period} className="flex items-center">
                        <input
                          type="checkbox"
                          id={period}
                          className="mr-2 h-5 w-5"
                          checked={selectedReturnPeriods.includes(period)}
                          onChange={() => handleReturnPeriodChange(period)}
                        />
                        <label htmlFor={period} className="text-gray-600">
                          {period}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div> */}

            <div className="p-4 border-t flex space-x-4">
              <button
                onClick={handleApplyFilters}
                className="flex-1 bg-fuchsia-950 text-white py-2 px-4 rounded-md hover:bg-fuchsia-800 transition duration-200"
              >
                Apply Filters
              </button>
              <button
                onClick={resetFilters}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-200"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}