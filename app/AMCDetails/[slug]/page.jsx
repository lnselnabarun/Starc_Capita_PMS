"use client";
import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

const AMCDetails = ({ params }) => {
  const route = useRouter();
  const [error, setError] = useState(null);
  const [DetailsData, setDetailsData] = useState([]);
  // const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const lastTransactionRef = useRef();
  const observer = useRef();
  // const params = useParams();
  const searchParams = useSearchParams();

  // const id = params.id;
  const userId = searchParams.get("userid");

  const headers = [
    "Name",
    "Category",
    "ISIN",
    "Current Cost (₹)",
    "Current XIRR",
    "Current VALUE (₹)",
    "Expense Ratio",
    "Exit Load",
    "LargeCap %",
    "LargeCap AUM",
    "MidCap %",
    "MidCap AUM",
    "SmallCap %",
    "SmallCap AUM",
    "Others %",
    "Others AUM",
    "Std. Dev.",
    "Sharpe Ratio",
    "Caputure Ratios (UP)",
    "Caputure Ratios (DOWN)",
    "Beta",
    "Alpha",
    "Net Rolling (1 Year Max)",
    "Net Rolling (1 Year Avg)",
    "Net Rolling (1 Year Min)",
    "Net Rolling (3 Year Max)",
    "Net Rolling (3 Year Avg)",
    "Net Rolling (3 Year Min)",
    "Net Tailing (1 Year)",
    "Net Tailing (3 Year)",
    "Action",
  ];

  const handleBack = () => {
    route.back();
  };

  function formatMoney(amount) {
    return new Intl.NumberFormat("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  }

  // useEffect(() => {
  //   const options = {
  //     root: null,
  //     rootMargin: "20px",
  //     threshold: 1.0,
  //   };

  //   const handleObserver = (entries) => {
  //     const target = entries[0];
  //     if (target.isIntersecting  && !loading) {
  //       // setPage((prevPage) => prevPage + 1);
  //     }
  //   };

  //   observer.current = new IntersectionObserver(handleObserver, options);

  //   const currentLastTransaction = lastTransactionRef.current;
  //   if (currentLastTransaction) {
  //     observer.current.observe(currentLastTransaction);
  //   }

  //   return () => {
  //     if (observer.current && currentLastTransaction) {
  //       observer.current.disconnect();
  //     }
  //   };
  // }, [ loading]);

  useEffect(() => {
    const fetchMutualFundDetails = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("myData");

        if (!token) {
          setError("No authentication token found");
          return;
        }
        const parsedToken = JSON.parse(token);

        // POST API call to get user MF data for particular AMC
        const response = await axios.post(
          `https://dev.netrumusa.com/starkcapital/api-backend/get-usermf-data-forparticularamc`,
          {
            amc: decodeURIComponent(params?.slug), // Using the decoded slug as AMC name
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${parsedToken}`,
            },
          }
        );
        console.log(
          response?.data?.data?.funds,
          "response?.data?.data?.fundsresponse?.data?.data?.funds"
        );
        if (response.data?.status === "success") {
          setDetailsData(response?.data?.data?.funds || []);
        } else {
          localStorage.clear();
          route.push("/");
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

    fetchMutualFundDetails();
  }, [params?.slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-white ">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-xl">
        Error: {error}
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="space-y-6">
              {/* Title and Filter Row */}
              <div className="flex items-center font-medium text-lg sm:text-xl md:text-2xl text-[#25282C] font-sans pb-10">
                <button
                  onClick={handleBack}
                  className=" mr-5 bg-white text-gray-800 p-2 rounded-full shadow-md flex items-center z-10 hover:bg-white transition duration-300"
                  aria-label="Go back"
                >
                  <ArrowLeft size={24} />
                </button>
                <div className="text-black">{"AMC Details"}</div>
              </div>
            </div>
          </div>

          {/* Table Section */}

          <div className="bg-white rounded-lg shadow">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {/* Fixed width for name column to prevent layout shifts */}
                    <th
                      className="sticky left-0 z-20 bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      style={{ minWidth: "200px", maxWidth: "250px" }}
                    >
                      {headers[0]} {/* Name column */}
                    </th>
                    {/* Fixed width for category column */}
                    <th
                      className="sticky left-[200px] z-10 bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      style={{ minWidth: "150px" }}
                    >
                      {headers[1]} {/* Category column */}
                    </th>
                    {/* Regular columns with appropriate width */}
                    {headers.slice(2).map((header, index) => (
                      <th
                        key={index + 2}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                        style={{
                          minWidth: header.includes("Current VALUE")
                            ? "150px"
                            : "120px",
                        }}
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200 ">
                  {DetailsData?.map((items, indexs) => {
                    return (
                      <tr key={items.id} className="hover:bg-gray-50">
                        {/* Fixed width for name column */}
                        <td
                          className="sticky left-0 z-20 bg-white px-6 py-4 whitespace-normal"
                          style={{
                            minWidth: "200px",
                            maxWidth: "250px",
                            boxShadow: "2px 0 5px -2px rgba(0,0,0,0.1)",
                          }}
                        >
                          <div className="text-sm font-medium text-gray-900 line-clamp-2">
                            {items?.scheme}
                          </div>
                        </td>

                        <td
                          className="sticky left-[200px] z-10 bg-white px-6 py-4 whitespace-normal"
                          style={{
                            minWidth: "150px",
                            boxShadow: "2px 0 5px -2px rgba(0,0,0,0.1)",
                          }}
                        >
                          <div className="text-sm text-gray-900">
                            {items?.["AT-FundLevelCategoryName"]}
                          </div>
                        </td>
                        {/* Current isin */}
                        <td
                          className="px-6 py-4 whitespace-nowrap"
                          style={{ minWidth: "120px" }}
                        >
                          <div className="text-sm text-gray-900">
                            {items?.["FSCBI-ISIN"]}
                          </div>
                        </td>

                        <td
                          className="px-6 py-4 whitespace-nowrap"
                          style={{ minWidth: "120px" }}
                        >
                          <div className="text-sm text-gray-900">
                            {items?.valuation_cost
                              ? `₹${formatMoney(items.valuation_cost)}`
                              : "N/A"}
                          </div>
                        </td>
                        {/* Current XIRR */}
                        <td
                          className="px-6 py-4 whitespace-nowrap"
                          style={{ minWidth: "120px" }}
                        >
                          <div className="text-sm text-gray-900">
                            {items?.currentXIRR ? `${items.currentXIRR}%` : "0%"}
                          </div>
                        </td>
                        {/* Current Value */}
                        <td
                          className="px-6 py-4 whitespace-nowrap"
                          style={{ minWidth: "150px" }}
                        >
                          <div className="text-sm text-gray-900">
                            {items?.currentValue
                              ? `₹${formatMoney(items.currentValue)}`
                              : "N/A"}
                          </div>
                        </td>

                        <td
                          className="px-6 py-4 whitespace-nowrap"
                          style={{ minWidth: "120px" }}
                        >
                          <div className="text-sm text-gray-900">
                            {items?.["ARF-InterimNetExpenseRatio"]}
                          </div>
                        </td>
                        {/* Current XIRR */}
                        <td
                          className="px-6 py-4 whitespace-nowrap"
                          style={{ minWidth: "120px" }}
                        >
                          <div className="text-sm text-gray-900">
                            {items?.["LS-DeferLoads"]}
                          </div>
                        </td>
                        {/* Current Value */}
                        <td
                          className="px-6 py-4 whitespace-nowrap"
                          style={{ minWidth: "150px" }}
                        >
                          <div className="text-sm text-gray-900">
                            {items?.capPercentage?.largeCap}
                          </div>
                        </td>
                        {/* Expense Ratio */}
                        <td
                          className="px-6 py-4 whitespace-nowrap"
                          style={{ minWidth: "120px" }}
                        >
                          <div className="text-sm text-gray-900">
                            {items?.largeCapAUM}
                          </div>
                        </td>

                        <td
                          className="px-6 py-4 whitespace-nowrap"
                          style={{ minWidth: "120px" }}
                        >
                          <div className="text-sm text-gray-900">
                            {items?.capPercentage?.midCap}
                          </div>
                        </td>
                        <td
                          className="px-6 py-4 whitespace-nowrap"
                          style={{ minWidth: "120px" }}
                        >
                          <div className="text-sm text-gray-900">
                            {items?.midCapAUM}
                          </div>
                        </td>
                        <td
                          className="px-6 py-4 whitespace-nowrap"
                          style={{ minWidth: "120px" }}
                        >
                          <div className="text-sm text-gray-900">
                            {items?.capPercentage?.smallCap}
                          </div>
                        </td>
                        <td
                          className="px-6 py-4 whitespace-nowrap"
                          style={{ minWidth: "120px" }}
                        >
                          <div className="text-sm text-gray-900">
                            {items?.smallCapAUM}
                          </div>
                        </td>
                        <td
                          className="px-6 py-4 whitespace-nowrap"
                          style={{ minWidth: "120px" }}
                        >
                          <div className="text-sm text-gray-900">
                            {items?.capPercentage?.other}
                          </div>
                        </td>
                        <td
                          className="px-6 py-4 whitespace-nowrap"
                          style={{ minWidth: "120px" }}
                        >
                          <div className="text-sm text-gray-900">
                            {items?.otherAUM}
                          </div>
                        </td>
                        <td
                          className="px-6 py-4 whitespace-nowrap"
                          style={{ minWidth: "120px" }}
                        >
                          <div className="text-sm text-gray-900">
                            {items?.["RM-StdDev1Yr"]}
                          </div>
                        </td>
                        <td
                          className="px-6 py-4 whitespace-nowrap"
                          style={{ minWidth: "120px" }}
                        >
                          <div className="text-sm text-gray-900">
                            {items?.["RM-SharpeRatio1Yr"]}
                          </div>
                        </td>
                        <td
                          className="px-6 py-4 whitespace-nowrap"
                          style={{ minWidth: "120px" }}
                        >
                          <div className="text-sm text-gray-900">
                            {items?.["RMP-CaptureRatioUpside1Yr"] || "N/A"}
                          </div>
                        </td>
                        <td
                          className="px-6 py-4 whitespace-nowrap"
                          style={{ minWidth: "120px" }}
                        >
                          <div className="text-sm text-gray-900">
                            {" "}
                            {items?.["RMP-CaptureRatioDownside1Yr"] || "N/A"}
                          </div>
                        </td>
                        <td
                          className="px-6 py-4 whitespace-nowrap"
                          style={{ minWidth: "120px" }}
                        >
                          <div className="text-sm text-gray-900">
                            {" "}
                            {items?.["RMP-Beta1Yr"] || "N/A"}
                          </div>
                        </td>
                        <td
                          className="px-6 py-4 whitespace-nowrap"
                          style={{ minWidth: "120px" }}
                        >
                          <div className="text-sm text-gray-900">
                            {" "}
                            {items?.["RMP-Alpha1Yr"] || "N/A"}
                          </div>
                        </td>
                        <td
                          className="px-6 py-4 whitespace-nowrap"
                          style={{ minWidth: "120px" }}
                        >
                          <div className="text-sm text-gray-900">
                            {items?.[
                              "Rolling Return Max 0.08333333333333333YR"
                            ] || "N/A"}
                          </div>
                        </td>
                        <td
                          className="px-6 py-4 whitespace-nowrap"
                          style={{ minWidth: "120px" }}
                        >
                          <div className="text-sm text-gray-900">
                            {" "}
                            {items?.[
                              "Rolling Return Avg 0.08333333333333333YR"
                            ] || "N/A"}
                          </div>
                        </td>
                        <td
                          className="px-6 py-4 whitespace-nowrap"
                          style={{ minWidth: "120px" }}
                        >
                          <div className="text-sm text-gray-900">
                            {" "}
                            {items?.[
                              "Rolling Return Min 0.08333333333333333YR"
                            ] || "N/A"}
                          </div>
                        </td>
                        <td
                          className="px-6 py-4 whitespace-nowrap"
                          style={{ minWidth: "120px" }}
                        >
                          <div className="text-sm text-gray-900">
                            {items?.["Rolling Return Max 0.25YR"] || "N/A"}
                          </div>
                        </td>
                        <td
                          className="px-6 py-4 whitespace-nowrap"
                          style={{ minWidth: "120px" }}
                        >
                          <div className="text-sm text-gray-900">
                            {items?.["Rolling Return Avg 0.25YR"] || "N/A"}
                          </div>
                        </td>
                        <td
                          className="px-6 py-4 whitespace-nowrap"
                          style={{ minWidth: "120px" }}
                        >
                          <div className="text-sm text-gray-900">
                            {items?.["Rolling Return Min 0.25YR"] || "N/A"}
                          </div>
                        </td>
                        <td
                          className="px-6 py-4 whitespace-nowrap"
                          style={{ minWidth: "120px" }}
                        >
                          <div className="text-sm text-gray-900">
                            {" "}
                            {items?.["DP-Return1Yr"] || "N/A"}
                          </div>
                        </td>
                        <td
                          className="px-6 py-4 whitespace-nowrap"
                          style={{ minWidth: "120px" }}
                        >
                          <div className="text-sm text-gray-900">
                            {items?.["DP-Return3Yr"] || "N/A"}
                          </div>
                        </td>
                        {/* <td
                          className="px-6 py-4 whitespace-nowrap"
                          style={{ minWidth: "120px" }}
                        >
                          <div className="text-sm text-gray-900">
                          "N/A"
                          </div>
                        </td> */}
                        {/* <td
                          className="px-6 py-4 whitespace-nowrap"
                          style={{ minWidth: "120px" }}
                        >
                          <div className="text-sm text-gray-900">
                          "N/A"
                          </div>
                        </td>
                        <td
                          className="px-6 py-4 whitespace-nowrap"
                          style={{ minWidth: "120px" }}
                        >
                          <div className="text-sm text-gray-900">
                          "N/A"
                          </div>
                        </td> */}

                        {/* Action column */}
                        <td
                          className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                          style={{ minWidth: "100px" }}
                        >
                          <button
                            onClick={() =>
                              route.push(
                                `/CombinedDetailsMutualFund/${items.id}`
                              )
                            }
                            className="text-green-600 hover:text-green-900 px-3 py-1 border border-green-600 rounded-md hover:bg-green-50"
                          >
                            Detail
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AMCDetails;

// <div className="min-h-screen  bg-white py-12 px-4 sm:px-6 lg:px-8">
//   <div className="px-4 sm:px-8 md:px-16 lg:px-28">
//     {/* Fund Title */}
//     <div className="flex items-center font-medium text-lg sm:text-xl md:text-2xl text-[#25282C] font-sans pb-10">
//       <button
//         onClick={handleBack}
//         className=" mr-5 bg-white text-gray-800 p-2 rounded-full shadow-md flex items-center z-10 hover:bg-white transition duration-300"
//         aria-label="Go back"
//       >
//         <ArrowLeft size={24} />
//       </button>
//       <div className="text-black">
//         {"AMC Details"}
//       </div>
//     </div>

//     <div className="w-full">
//       {/* Transaction List Container */}

//       <div className="flex flex-wrap justify-between">
//       {DetailsData?.map((detail, index) => (
//           <div
//             key={index}
//             className="w-full md:w-[48%] lg:w-[32%] mb-4 p-6 rounded-lg bg-[#F5F5F5] shadow-lg transition-all duration-300 ease-in-out hover:transform hover:scale-105 hover:shadow-xl border border-gray-200"
//           >
//             <div className="space-y-3">
//               <div className="text-sm font-bold text-black bg-white px-3 py-2 rounded-md shadow-sm">
//                 <span className="text-gray-600 font-medium">AMC:</span> {detail?.amc}
//               </div>

//               <div className="text-sm font-medium text-gray-700 bg-blue-50 px-3 py-2 rounded-md">
//                 <span className="text-gray-600 font-medium">Scheme:</span> {detail.scheme}
//               </div>

//               <div className="text-sm font-medium text-gray-700 bg-green-50 px-3 py-2 rounded-md">
//                 <span className="text-gray-600 font-medium">Category:</span> {detail?.["AT-FundLevelCategoryName"]}
//               </div>
//             </div>
//           </div>
//         ))}

//       </div>
//     </div>
//   </div>
// </div>
