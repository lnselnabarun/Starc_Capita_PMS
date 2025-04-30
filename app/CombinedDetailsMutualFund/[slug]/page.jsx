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
import moment from "moment";

const CombinedDetailsMutualFund = ({ params }) => {
  const [activeButton, setActiveButton] = useState("capture");
  const [selectedButton, setselectedButton] = useState("Details");
  const route = useRouter();
  const [DetailsData, setDetailsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentDataName, SetcurrentDataName] = useState("");

  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const lastTransactionRef = useRef();
  const observer = useRef();
  const [pageSize] = useState(10);
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
        const response = await axios.get(
          `https://dev.netrumusa.com/starkcapital/api-backend/portfolio-details/${params?.slug}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${parsedToken}`,
            },
          }
        );
        if (response.data?.status === "success") {
          setDetailsData(response?.data?.data?.details || []);

          // const fundNameDetail = response?.data?.data?.details.find(
          //   (detail) => detail._key === "FSCBI-FundLegalName"
          // );

          // Set the fund name if found, otherwise use the scheme name as fallback
          SetcurrentDataName( response?.data?.data?.scheme);
        } else {
          throw new Error(
            response.data?.message || "Failed to fetch mutual fund data"
          );
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMutualFundDetails();
  }, [params?.slug]);

  // Simulated transaction data - replace with your actual API call

  // Simulate API call with static data
  const fetchTransactions = async (pageNo) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("myData");

      if (!token) {
        setError("No authentication token found");
        return;
      }

      const parsedToken = JSON.parse(token);
      const response = await axios.get(
        `https://dev.netrumusa.com/starkcapital/api-backend/portfolio-transactions/${params?.slug}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${parsedToken}`,
          },
        }
      );

      if (response.data?.status === "success") {
        // Append new transactions to existing ones
        setTransactions((prevTransactions) => {
          // Filter out transactions with zero units before adding
          const newTransactions = response.data.data.filter(
            (transaction) => transaction.units !== 0
          );
          return pageNo === 1
            ? newTransactions?.reverse()
            : [...prevTransactions.reverse(), ...newTransactions.reverse()];
        });

        // Check if we've reached the end of available data
        setHasMore(response.data.data.length === pageSize);
      } else {
        throw new Error(
          response.data?.message || "Failed to fetch mutual fund data"
        );
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };

    const handleObserver = (entries) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !loading) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    observer.current = new IntersectionObserver(handleObserver, options);

    const currentLastTransaction = lastTransactionRef.current;
    if (currentLastTransaction) {
      observer.current.observe(currentLastTransaction);
    }

    return () => {
      if (observer.current && currentLastTransaction) {
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

  function formatMoney(amount) {
    return new Intl.NumberFormat('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
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
                <div className="flex flex-col items-start space-y-2"></div>

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
        ) : (
          <>
            <div className="w-full">
              {/* Transaction List Container */}
              <div className="w-full space-y-4">
                <div className="overflow-x-auto bg-white rounded-lg shadow mt-5">
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
                        {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Ammount
                        </th> */}
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount (Rs)
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {transactions?.map((transaction, index) => (
                        <>
                          <tr
                            key={index}
                            ref={
                              index === transactions?.length - 1
                                ? lastTransactionRef
                                : null
                            }
                            className="hover:bg-gray-50 transition-colors duration-200"
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {moment
                                .utc(transaction?.transaction_date)
                                .format("MMM Do, YYYY")}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {transaction?.transaction_type}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {transaction?.units}
                            </td>
                            {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {transaction.nav}
                          </td> */}
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {/* {formatMoney()} */}
                              {`₹${formatMoney(transaction?.amount)}`}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800
                      `}
                              >
                               Completed
                              </span>
                            </td>
                          </tr>
                        </>
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
                {/* {!hasMore && transactions.length > 0 && (
                  <div className="text-center py-4 text-gray-500">
                    No more transactions to load
                  </div>
                )} */}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CombinedDetailsMutualFund;
