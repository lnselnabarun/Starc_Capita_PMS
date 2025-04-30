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
        const response = await axios.get(
          `https://dev.netrumusa.com/starkcapital/api-backend/portfolio-detailswithuserid?id=${params?.slug}&usr_reg_id=${userId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${parsedToken}`,
            },
          }
        );
        if (response.data?.status === "success") {
          setDetailsData(response?.data?.data?.details || []);
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
        </div>
      </div>
    </div>
  );
};

export default AMCDetails;
