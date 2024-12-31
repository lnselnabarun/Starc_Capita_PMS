"use client";
import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft } from "lucide-react";
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
import { useRouter } from "next/navigation";
import axios from "axios";

const CombinedDetailsMutualFund = ({ params }) => {
  const [activeButton, setActiveButton] = useState("capture");
  const [selectedButton, setselectedButton] = useState("Details");
  const route = useRouter();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [DetailsData, setDetailsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentDataName, SetcurrentDataName] = useState("");
  
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [dateFilter, setDateFilter] = useState('Last 30 days');
  const lastTransactionRef = useRef();
  const observer = useRef();
  const data = [
    {
      name: "JAN",
      uv: 4000,
      pv: 2400,
      tv: 3200,
      wv: 1500,
      xv: 2800,
      yv: 3300,
      zv: 4100,
    },
    {
      name: "FEB",
      uv: 3000,
      pv: 1398,
      tv: 2100,
      wv: 2300,
      xv: 2100,
      yv: 2500,
      zv: 3700,
    },
    {
      name: "MAR",
      uv: 2000,
      pv: 9800,
      tv: 2900,
      wv: 2400,
      xv: 3200,
      yv: 4000,
      zv: 4500,
    },
    {
      name: "APR",
      uv: 2780,
      pv: 3908,
      tv: 3500,
      wv: 2600,
      xv: 3000,
      yv: 2900,
      zv: 3800,
    },
    {
      name: "MAY",
      uv: 7090,
      pv: 4800,
      tv: 4700,
      wv: 3100,
      xv: 4100,
      yv: 5000,
      zv: 5300,
    },
    {
      name: "JUN",
      uv: 2390,
      pv: 3800,
      tv: 3600,
      wv: 2200,
      xv: 2700,
      yv: 3400,
      zv: 4100,
    },
    {
      name: "JUL",
      uv: 3490,
      pv: 4300,
      tv: 3900,
      wv: 2500,
      xv: 3000,
      yv: 3700,
      zv: 4200,
    },
  ];

  const handleBack = () => {
    // Implement your back navigation logic here
    route.back();
  };

  useEffect(() => {
    const fetchMutualFundDetails = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("myData");

        if (!token) {
          setError("No authentication token found");
          return;
        }

        const parsedToken = JSON.parse(token);
        console.log(`Bearer ${parsedToken}`, "`Bearer ${parsedToken}`");

        const response = await axios.get(
          `https://dev.netrumusa.com/starkcapital/api-backend/portfolio-details/${params?.slug}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${parsedToken}`,
            },
          }
        );
        console.log(response, "ggggggggggggg");
        if (response.data?.status === "success") {
          setDetailsData(response?.data?.data?.details || []);

          const fundNameDetail = response?.data?.data?.details.find(
            (detail) => detail._key === "FSCBI-FundLegalName"
          );

          // Set the fund name if found, otherwise use the scheme name as fallback
          SetcurrentDataName(
            fundNameDetail?.details || response?.data?.data?.scheme
          );
        } else {
          throw new Error(
            response.data?.message || "Failed to fetch mutual fund data"
          );
        }
      } catch (err) {
        console.error("Error fetching mutual fund data:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMutualFundDetails();
  }, [params?.slug]);


  // Simulated transaction data - replace with your actual API call
  const staticTransactions = [
    {
      date: "2024-12-30",
      type: "Purchase",
      units: "235.457",
      nav: "₹32.45",
      amount: "₹7,640.58",
      status: "Completed"
    },
    {
      date: "2024-12-28",
      type: "Redemption",
      units: "100.000",
      nav: "₹32.40",
      amount: "₹3,240.00",
      status: "Completed"
    },
    {
      date: "2024-12-25",
      type: "Switch In",
      units: "150.235",
      nav: "₹32.38",
      amount: "₹4,864.61",
      status: "Completed"
    },
    {
      date: "2024-12-20",
      type: "Purchase",
      units: "310.125",
      nav: "₹32.35",
      amount: "₹10,032.54",
      status: "Pending"
    },
    {
      date: "2024-12-15",
      type: "Switch Out",
      units: "75.500",
      nav: "₹32.30",
      amount: "₹2,438.65",
      status: "Completed"
    },
    {
      date: "2024-12-10",
      type: "Purchase",
      units: "155.750",
      nav: "₹32.25",
      amount: "₹5,022.94",
      status: "Failed"
    },
    {
      date: "2024-12-05",
      type: "Redemption",
      units: "200.000",
      nav: "₹32.20",
      amount: "₹6,440.00",
      status: "Completed"
    },
    {
      date: "2024-12-01",
      type: "Purchase",
      units: "465.890",
      nav: "₹32.15",
      amount: "₹14,978.36",
      status: "Completed"
    },
    {
      date: "2024-11-28",
      type: "Switch In",
      units: "125.450",
      nav: "₹32.10",
      amount: "₹4,026.95",
      status: "Pending"
    },
    {
      date: "2024-11-25",
      type: "Purchase",
      units: "290.675",
      nav: "₹32.05",
      amount: "₹9,316.13",
      status: "Completed"
    }
  ];



  // Simulate API call with static data
  const fetchTransactions = async (pageNumber) => {
    setLoading(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const startIndex = (pageNumber - 1) * 5;
    const endIndex = startIndex + 5;
    const newTransactions = staticTransactions.slice(startIndex, endIndex);
    
    setTransactions(prev => [...prev, ...newTransactions]);
    setHasMore(endIndex < staticTransactions.length);
    setLoading(false);
  };

  // Filter transactions based on search term and filters
  // const filteredTransactions = transactions.filter(transaction => {
  //   const matchesSearch = Object.values(transaction).some(value => 
  //     value.toString().toLowerCase().includes(searchTerm.toLowerCase())
  //   );
    
  //   const matchesType = typeFilter === 'All Types' || transaction.type === typeFilter;
    
  //   // Simple date filter logic - could be enhanced based on needs
  //   const transactionDate = new Date(transaction.date);
  //   const today = new Date();
  //   const daysDifference = (today - transactionDate) / (1000 * 60 * 60 * 24);
    
  //   let matchesDate = true;
  //   if (dateFilter === 'Last 30 days') {
  //     matchesDate = daysDifference <= 30;
  //   } else if (dateFilter === 'Last 90 days') {
  //     matchesDate = daysDifference <= 90;
  //   } else if (dateFilter === 'Last year') {
  //     matchesDate = daysDifference <= 365;
  //   }
    
  //   return matchesSearch && matchesType && matchesDate;
  // });

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0
    };

    const handleObserver = (entries) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !loading) {
        setPage(prev => prev + 1);
      }
    };

    observer.current = new IntersectionObserver(handleObserver, options);

    if (lastTransactionRef.current) {
      observer.current.observe(lastTransactionRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [hasMore, loading]);

  useEffect(() => {
    fetchTransactions(page);
  }, [page]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen  bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="px-4 sm:px-8 md:px-16 lg:px-28">
        {/* Fund Title */}
        <div className="flex items-center font-medium text-lg sm:text-xl md:text-2xl text-[#25282C] font-sans pb-10">
          <button
            onClick={handleBack}
            className=" mr-5 bg-white text-gray-800 p-2 rounded-full shadow-md flex items-center z-10 hover:bg-white transition duration-300"
            aria-label="Go back"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="text-black">
            {currentDataName !== "" ? currentDataName : ""}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 items-center justify-center mb-4  ">
          {/* Capture Ratio Button */}
          <button
            onClick={() => setselectedButton("Details")}
            className={`text-[#9FA8C7] px-4 py-2 rounded-2xl border text-xs sm:text-sm ${
              selectedButton === "Details"
                ? "bg-[#ECEFF9] border-[#E5EBEF]"
                : "border-[#E5EBEF]"
            }`}
          >
            Mutual Fund Details
          </button>

          {/* Risk Ratio Button */}
          <button
            onClick={() => setselectedButton("transduction")}
            className={`text-[#9FA8C7] px-4 py-2 rounded-2xl border text-xs sm:text-sm ${
              selectedButton === "transduction"
                ? "bg-[#ECEFF9] border-[#E5EBEF]"
                : "border-[#E5EBEF]"
            }`}
          >
            Transduction List
          </button>
        </div>
        {selectedButton === "Details" ? (
          <>
            {/* Main Container */}
            <div className="w-full flex flex-wrap gap-4 p-4 rounded-lg border-[1.5px] border-[#D9D9D9] bg-white">
              {/* First Content: Bold Text */}
              <div className="w-full flex flex-wrap justify-between gap-4 h-auto">
                <div className="flex flex-col items-start space-y-2">
                  {/* <div className="font-medium text-lg sm:text-xl md:text-2xl text-[#3F4765] font-sans">
            Chart Data
          </div> */}
                </div>

                {/* Second Content: Four Pressable Divs */}
                <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  {/* Capture Ratio Button */}
                  <button
                    onClick={() => setActiveButton("capture")}
                    className={`text-[#9FA8C7] px-4 py-2 rounded-2xl border text-xs sm:text-sm ${
                      activeButton === "capture"
                        ? "bg-[#ECEFF9] border-[#E5EBEF]"
                        : "border-[#E5EBEF]"
                    }`}
                  >
                    Capture Ratio
                  </button>

                  {/* Risk Ratio Button */}
                  <button
                    onClick={() => setActiveButton("risk")}
                    className={`text-[#9FA8C7] px-4 py-2 rounded-2xl border text-xs sm:text-sm ${
                      activeButton === "risk"
                        ? "bg-[#ECEFF9] border-[#E5EBEF]"
                        : "border-[#E5EBEF]"
                    }`}
                  >
                    Risk Ratio
                  </button>

                  {/* Select Time Period Dropdown */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-2 space-y-2 sm:space-y-0">
                    <span className="font-medium text-xs sm:text-sm text-[#848CA9] text-left">
                      Select Time Period:
                    </span>
                    <select className="border bg-gray-100 text-[#848CA9] rounded-3xl px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-700">
                      <option className="bg-white text-black">1 Year</option>
                      <option className="bg-white text-black">2 Year</option>
                      <option className="bg-white text-black">3 Year</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Line Chart Section */}
              <div className="w-full h-48 sm:h-64 md:h-80 lg:h-96 transition-all duration-300 ease-in-out hover:transform hover:scale-[1.02] hover:shadow-lg rounded-lg">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={data}
                    margin={{
                      top: 5,
                      right: 10,
                      left: 5,
                      bottom: 10,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />

                    <Line
                      type="monotone"
                      dataKey="tv"
                      stroke="#FF5733"
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="wv"
                      stroke="#33FF57"
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="xv"
                      stroke="#3357FF"
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="yv"
                      stroke="#FF33C1"
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="zv"
                      stroke="#FFC733"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="font-medium text-lg sm:text-xl md:text-2xl text-[#25282C] font-sans py-4">
              All Details
            </div>
            <div className="flex flex-wrap justify-between">
              {DetailsData?.map((detail, index) => (
                <div
                  key={index}
                  className="w-full md:w-[48%] mb-4 p-4 rounded-lg bg-[#F5F5F5] shadow-lg transition-all duration-300 ease-in-out hover:transform hover:scale-105 hover:shadow-xl"
                >
                  <div className="flex justify-between items-center">
                    <div className="text-[12px] font-semibold text-left text-black">
                      {detail.name}
                    </div>
                    <div className="text-[12px] font-medium text-left text-gray-600 ml-2">
                      {detail.details}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : <>
        <div className="w-full">
      {/* Transaction List Container */}
      <div className="w-full space-y-4">
        {/* Filters and Search */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search transactions..."
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2">
            <select className="px-4 py-2 rounded-lg border border-gray-200 bg-white">
              <option>All Types</option>
              <option>Purchase</option>
              <option>Redemption</option>
              <option>Switch</option>
            </select>
            <select className="px-4 py-2 rounded-lg border border-gray-200 bg-white">
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>Last year</option>
              <option>All List</option>
            </select>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Units
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  NAV
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map((transaction, index) => (
                <tr
                  key={index}
                  ref={index === transactions.length - 1 ? lastTransactionRef : null}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.units}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.nav}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${transaction.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                      transaction.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'}`}>
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="w-full text-center py-4">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
          </div>
        )}

        {/* No More Data Message */}
        {!hasMore && transactions.length > 0 && (
          <div className="text-center py-4 text-gray-500">
            No more transactions to load
          </div>
        )}
      </div>
    </div>
        
        </>}
      </div>
    </div>
  );
};

export default CombinedDetailsMutualFund;
