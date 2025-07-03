import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import axios from "axios";

const AMCCard = ({ amc, index }) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    // Navigate to details page using the ISIN if available, otherwise use id
    const detailId = amc?.id;
    const USER_ID = amc?.user_reg_id;
    router.push(`/AMCDetails/${amc?.amc}`);
  };

  // Determine logo source - this would need to be mapped to actual logos
  const getLogo = () => {
    // Placeholder function to determine logo based on AMC name
    // In a real implementation, you'd map AMC names to their respective logos
    const amcName = amc.amc?.toLowerCase() || "";

    if (amcName.includes("hdfc")) {
      return require("../assets/logo/Logo_A.png");
    } else if (amcName.includes("dsp")) {
      return require("../assets/logo/Logo_A.png");
    } else if (amcName.includes("canara")) {
      return require("../assets/logo/Logo_A.png");
    } else {
      return require("../assets/logo/Logo_A.png");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{
        scale: 1.03,
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-white rounded-2xl overflow-hidden transition-all duration-300 flex flex-col h-full cursor-pointer border border-gray-100"
    >
      <div className="p-6 flex flex-col items-center justify-center space-y-4 h-full">
        <motion.div
          className="relative w-20 h-20 md:w-24 md:h-24"
          animate={{ rotate: isHovered ? 6 : 0 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Image
            src={getLogo()}
            alt={`${amc.amc} logo`}
            fill
            className="object-contain"
          />
        </motion.div>

        <div className="text-center">
          <h3 className="font-medium text-gray-800 mt-2 text-sm sm:text-base md:text-lg">
            {amc.amc}
          </h3>
          {/* <p className="text-sm text-gray-600 mt-1 line-clamp-2">
            {amc.scheme}
          </p> */}

          {/* {amc.currentValue && (
            <p className={`text-sm font-semibold mt-2 ${amc.currentValue < 0 ? 'text-red-500' : 'text-green-500'}`}>
              ₹{Math.abs(amc.currentValue).toLocaleString()}
            </p>
          )} */}

          {/* {amc.currentXIRR && (
            <p className={`text-xs font-medium mt-1 ${amc.currentXIRR < 0 ? 'text-red-500' : 'text-green-500'}`}>
              XIRR: {amc.currentXIRR.toFixed(2)}%
            </p>
          )} */}

          <motion.div
            className="mt-3 h-1 bg-blue-500 rounded mx-auto"
            initial={{ width: "0%" }}
            animate={{ width: isHovered ? "80%" : "0%" }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    </motion.div>
  );
};

const SearchAndFilter = ({ onSearch }) => {
  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div className="relative">
        <input
          type="text"
          placeholder="Search schemes..."
          onChange={(e) => onSearch(e.target.value)}
          className="w-full px-4 py-3 rounded-full bg-white border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300"
        />
        <svg
          className="absolute right-3 top-3 h-6 w-6 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </div>
  );
};

const AMCGrid = () => {
  const [amcData, setAmcData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the AMC data from the API
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.post(
          "https://dev.netrumusa.com/starkcapital/api-backend/get-usermf-data-all"
        );

        if (response.data) {
          // Filter unique FSCBI-FundLegalName entries
          const allData = response?.data?.data || [];
          // const uniqueData = filterUniqueFunds(allData);

          setAmcData(allData);
          // setFilteredData(uniqueData);
        } else {
          // localStorage.clear();
          // router.push("/");
          setError("No data received from API");
        }
      } catch (err) {
        setError("Failed to fetch AMC data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to filter out duplicate FSCBI-FundLegalName entries
  const filterUniqueFunds = (data) => {
    const uniqueFundNames = new Set();
    return data.filter((item) => {
      // If the item doesn't have FSCBI-FundLegalName property, keep it
      if (!item["FSCBI-FundLegalName"]) return true;

      // If we haven't seen this fund name before, add it and keep the item
      if (!uniqueFundNames.has(item["FSCBI-FundLegalName"])) {
        uniqueFundNames.add(item["FSCBI-FundLegalName"]);
        return true;
      }

      // Otherwise, it's a duplicate fund name, so filter it out
      return false;
    });
  };

  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredData(amcData);
      return;
    }

    const searchTermLower = searchTerm.toLowerCase();
    const filtered = amcData.filter(
      (amc) =>
        (amc.amc && amc.amc.toLowerCase().includes(searchTermLower)) ||
        (amc.scheme && amc.scheme.toLowerCase().includes(searchTermLower))
    );
    setFilteredData(filtered);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <svg
            className="mx-auto h-12 w-12 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            Error Loading Data
          </h3>
          <p className="mt-2 text-sm text-gray-500">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl">
            Asset Management Companies
          </h1>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Explore your investments across various asset management companies
            and mutual fund schemes.
          </p>
        </motion.div>

        {/* <SearchAndFilter onSearch={handleSearch} /> */}

        {/* {filteredData.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 text-lg">
              No mutual funds found matching your search.
            </p>
          </motion.div>
        ) : ( */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {amcData?.map((amc, index) => (
                <AMCCard key={amc.id || index} amc={amc} index={index} />
              ))}
            </div>
          </motion.div>
        {/* )} */}
      </div>
    </div>
  );
};

export default AMCGrid;
