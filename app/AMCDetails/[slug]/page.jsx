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


  const handleBack = () => {
    route.back();
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };

    const handleObserver = (entries) => {
      const target = entries[0];
      if (target.isIntersecting  && !loading) {
        // setPage((prevPage) => prevPage + 1);
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
  }, [ loading]);

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
            amc: decodeURIComponent(params?.slug) // Using the decoded slug as AMC name
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${parsedToken}`,
            },
          }
        );
        
        if (response.data?.status === "success") {
          setDetailsData(response?.data?.data?.funds || []);
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
            {"AMC Details"}
          </div>
        </div>

        <div className="w-full">
          {/* Transaction List Container */}

          <div className="flex flex-wrap justify-between">
          {DetailsData?.map((detail, index) => (
              <div
                key={index}
                className="w-full md:w-[48%] lg:w-[32%] mb-4 p-6 rounded-lg bg-[#F5F5F5] shadow-lg transition-all duration-300 ease-in-out hover:transform hover:scale-105 hover:shadow-xl border border-gray-200"
              >
                <div className="space-y-3">
                  <div className="text-sm font-bold text-black bg-white px-3 py-2 rounded-md shadow-sm">
                    <span className="text-gray-600 font-medium">AMC:</span> {detail?.amc}
                  </div>
                  
                  <div className="text-sm font-medium text-gray-700 bg-blue-50 px-3 py-2 rounded-md">
                    <span className="text-gray-600 font-medium">Scheme:</span> {detail.scheme}
                  </div>
                  
                  <div className="text-sm font-medium text-gray-700 bg-green-50 px-3 py-2 rounded-md">
                    <span className="text-gray-600 font-medium">Category:</span> {detail?.["AT-FundLevelCategoryName"]}
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
};

export default AMCDetails;