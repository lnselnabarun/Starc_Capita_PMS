import React, { useState } from "react";
import { Search, X, ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
const Compare_Mutual_Fund = () => {
  const [isOverviewOpen, setIsOverviewOpen] = useState(true);
  const [isReturnOpen, setIsReturnOpen] = useState(true);
  const [isRiskMeasuresOpen, setIsRiskMeasuresOpen] = useState(true);
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(true);
  const [isFundDetailsOpen, setIsFundDetailsOpen] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleSection = (setter) => () => setter((prev) => !prev);

  return (
    <div className="container mx-auto px-14 mt-2 ">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold text-gray-700">
          Compare Mutual Funds
        </h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Add more schemes to compare"
            className="pl-8 pr-4 py-2 rounded-full border border-gray-300 bg-white text-sm"
          />
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        </div>
      </div>

      {/* <div className="text-xs text-gray-500 mb-2">
        Comparing SBI Bluechip Fund vs HDFC Index Fund - BSE Sensex Plan
      </div> */}

      <div className="grid grid-cols-4 gap-4 mb-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-center mb-2">
            <Image
              src={require("../assets/logo/Bitcoin.png")}
              alt="SBI Logo"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <button className="text-gray-400">
              <X className="w-4 h-4" />
            </button>
          </div>
          <h3 className="font-semibold text-sm mb-2">SBI Bluechip Fund</h3>
          <button className="w-full bg-green-500 text-white py-1.5 rounded-full text-sm">
            Remove
          </button>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-center mb-2">
            <Image
              src={require("../assets/logo/Bitcoin.png")}
              alt="HDFC Logo"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <button className="text-gray-400">
              <X className="w-4 h-4" />
            </button>
          </div>
          <h3 className="font-semibold text-sm mb-2">
            HDFC Index Fund - BSE Sensex Plan
          </h3>
          <button className="w-full bg-green-500 text-white py-1.5 rounded-full text-sm">
            Remove
          </button>
        </div>
        <div className="bg-white rounded-lg shadow p-4 flex items-center justify-center">
          <button className="text-green-500 font-semibold text-sm">
            + Add Fund
          </button>
        </div>
        <div className="bg-white rounded-lg shadow p-4 flex items-center justify-center">
          <button className="text-green-500 font-semibold text-sm">
            + Add Fund
          </button>
        </div>
      </div>

      {/* Fund Overview Section */}
      {/* <section className="bg-white rounded-lg shadow mb-4">
        <button 
          className="flex justify-between items-center w-full p-3 text-sm"
          onClick={toggleSection(setIsOverviewOpen)}
        >
          <span className="font-semibold text-gray-700">FUND OVERVIEW</span>
          {isOverviewOpen ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
        </button>
        {isOverviewOpen && (
          <div className="p-4 grid grid-cols-4 gap-4 text-sm">
            <div>
              <div className="text-gray-500 mb-1">VRO Rating</div>
              <div className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full inline-block">4★</div>
            </div>
            <div>
              <div className="text-gray-500 mb-1">Category Sub-Category</div>
              <div>Large Cap, Equity</div>
            </div>
            <div>
              <div className="text-gray-500 mb-1">Fund Age</div>
              <div>11 yrs 9 m</div>
            </div>
            <div>
              <div className="text-gray-500 mb-1">Fund Size</div>
              <div>₹53,276 Crs</div>
            </div>
          </div>
        )}
      </section> */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead onClick={toggleCollapse}>
            <tr>
              <th className="px-4 py-2 bg-gray-100 border-b border-gray-300 text-left">
                <button
                  onClick={toggleCollapse}
                  className="focus:outline-none text-sm font-medium flex items-center"
                >
                  <span className="px-4 py-2 bg-gray-100 text-left text-black font-semibold">
                    RETURN
                  </span>
                </button>
              </th>
              <th className="px-4 py-2 bg-gray-100 border-b border-gray-300 text-left">
                Column 1
              </th>
              <th className="px-4 py-2 bg-gray-100 border-b border-gray-300 text-left">
                Column 2
              </th>
              <th className="px-4 py-2 bg-gray-100 border-b border-gray-300 text-left">
                Column 3
              </th>
              <th className="px-4 py-2 bg-gray-100 border-b border-gray-300 text-left">
                Column 4
              </th>
            </tr>
          </thead>
          <tbody className={`${isCollapsed ? "hidden" : "table-row-group"}`}>
            <tr>
              <td className="px-4 py-2 border-b border-gray-300">3 months</td>
              <td className="px-4 py-2 border-b border-gray-300">4.22%</td>
              <td className="px-4 py-2 border-b border-gray-300">1.81%</td>
              <td className="px-4 py-2 border-b border-gray-300">4.22%</td>
              <td className="px-4 py-2 border-b border-gray-300">1.81%</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border-b border-gray-300">6 months</td>
              <td className="px-4 py-2 border-b border-gray-300">16.93%</td>
              <td className="px-4 py-2 border-b border-gray-300">12.49%</td>
              <td className="px-4 py-2 border-b border-gray-300">16.93%</td>
              <td className="px-4 py-2 border-b border-gray-300">12.49%</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border-b border-gray-300">1 year</td>
              <td className="px-4 py-2 border-b border-gray-300">30.29%</td>
              <td className="px-4 py-2 border-b border-gray-300">25.08%</td>
              <td className="px-4 py-2 border-b border-gray-300">30.29%</td>
              <td className="px-4 py-2 border-b border-gray-300">25.08%</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border-b border-gray-300">3 years</td>
              <td className="px-4 py-2 border-b border-gray-300">13.83%</td>
              <td className="px-4 py-2 border-b border-gray-300">11.01%</td>
              <td className="px-4 py-2 border-b border-gray-300">13.83%</td>
              <td className="px-4 py-2 border-b border-gray-300">11.01%</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border-b border-gray-300">5 years</td>
              <td className="px-4 py-2 border-b border-gray-300">19.55%</td>
              <td className="px-4 py-2 border-b border-gray-300">17.32%</td>
              <td className="px-4 py-2 border-b border-gray-300">19.55%</td>
              <td className="px-4 py-2 border-b border-gray-300">17.32%</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Return Section */}

      {/* Add Risk Measures, Portfolio, and Fund Details sections similarly */}
    </div>
  );
};

export default Compare_Mutual_Fund;
