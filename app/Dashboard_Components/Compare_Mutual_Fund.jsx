import React, { useState } from "react";
import { Search, X, ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
const Compare_Mutual_Fund = () => {
  const [isOverviewOpen, setIsOverviewOpen] = useState(true);
  const [isReturnOpen, setIsReturnOpen] = useState(true);
  const [isRiskMeasuresOpen, setIsRiskMeasuresOpen] = useState(true);
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(true);
  const [isFundDetailsOpen, setIsFundDetailsOpen] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);

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
          <button className="w-full bg-fuchsia-900 hover:bg-fuchsia-700 text-white py-1.5 rounded-full text-sm transition-colors duration-200 ease-in-out">
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
          <button className="w-full bg-fuchsia-900 hover:bg-fuchsia-700 text-white py-1.5 rounded-full text-sm transition-colors duration-200 ease-in-out">
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
          <button className="w-full bg-fuchsia-900 hover:bg-fuchsia-700 text-white py-1.5 rounded-full text-sm transition-colors duration-200 ease-in-out">
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
          <button className="w-full bg-fuchsia-900 hover:bg-fuchsia-700 text-white py-1.5 rounded-full text-sm transition-colors duration-200 ease-in-out">
            Remove
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead onClick={toggleCollapse}>
            <tr>
              <th className="py-2 bg-gray-100 border-b border-gray-300 text-left">
                <button
                  onClick={toggleCollapse}
                  className="focus:outline-none text-sm font-medium flex items-center"
                >
                  <span className="py-2 bg-gray-100 text-left text-fuchsia-900 font-semibold text-xl pl-4">
               {`Return ${isCollapsed === true ?  "▼" : "▲"} `}
                  </span>
                </button>
              </th>
              <th className="px-4 py-2 bg-gray-100 border-b border-gray-300 text-left">
              SBI Bluechip
              </th>
              <th className="px-4 py-2 bg-gray-100 border-b border-gray-300 text-left">
              HDFC Index Fund
              </th>
              <th className="px-4 py-2 bg-gray-100 border-b border-gray-300 text-left">
              HDFC Index Fund
              </th>
              <th className="px-4 py-2 bg-gray-100 border-b border-gray-300 text-left">
              HDFC Index Fund
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


      <div className="overflow-x-auto mt-4">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead onClick={toggleCollapse}>
            <tr>
              <th className="py-2 bg-gray-100 border-b border-gray-300 text-left">
                <button
                  onClick={toggleCollapse}
                  className="focus:outline-none text-sm font-medium flex items-center "
                >
                  <span className="py-2  bg-gray-100 text-left text-fuchsia-900 font-semibold text-xl pl-4">
               {`Risk Measures ${isCollapsed === true ?  "▼" : "▲"} `}
                  </span>
                </button>
              </th>
              <th className="px-4 py-2 bg-gray-100 border-b border-gray-300 text-left">
              SBI Bluechip
              </th>
              <th className="px-4 py-2 bg-gray-100 border-b border-gray-300 text-left">
              HDFC Index Fund
              </th>
              <th className="px-4 py-2 bg-gray-100 border-b border-gray-300 text-left">
              HDFC Index Fund
              </th>
              <th className="px-4 py-2 bg-gray-100 border-b border-gray-300 text-left">
              HDFC Index Fund
              </th>
            </tr>
          </thead>
          <tbody className={`${isCollapsed ? "hidden" : "table-row-group"}`}>
            <tr>
              <td className="px-4 py-2 border-b border-gray-300">Standard Deviation</td>
              <td className="px-4 py-2 border-b border-gray-300">4.22%</td>
              <td className="px-4 py-2 border-b border-gray-300">1.81%</td>
              <td className="px-4 py-2 border-b border-gray-300">4.22%</td>
              <td className="px-4 py-2 border-b border-gray-300">1.81%</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border-b border-gray-300">Sharpe</td>
              <td className="px-4 py-2 border-b border-gray-300">16.93%</td>
              <td className="px-4 py-2 border-b border-gray-300">12.49%</td>
              <td className="px-4 py-2 border-b border-gray-300">16.93%</td>
              <td className="px-4 py-2 border-b border-gray-300">12.49%</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border-b border-gray-300">Beta</td>
              <td className="px-4 py-2 border-b border-gray-300">30.29%</td>
              <td className="px-4 py-2 border-b border-gray-300">25.08%</td>
              <td className="px-4 py-2 border-b border-gray-300">30.29%</td>
              <td className="px-4 py-2 border-b border-gray-300">25.08%</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border-b border-gray-300">Sortino</td>
              <td className="px-4 py-2 border-b border-gray-300">13.83%</td>
              <td className="px-4 py-2 border-b border-gray-300">11.01%</td>
              <td className="px-4 py-2 border-b border-gray-300">13.83%</td>
              <td className="px-4 py-2 border-b border-gray-300">11.01%</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border-b border-gray-300">Alpha</td>
              <td className="px-4 py-2 border-b border-gray-300">19.55%</td>
              <td className="px-4 py-2 border-b border-gray-300">17.32%</td>
              <td className="px-4 py-2 border-b border-gray-300">19.55%</td>
              <td className="px-4 py-2 border-b border-gray-300">17.32%</td>
            </tr>
          </tbody>
        </table>
      </div>


      <div className="overflow-x-auto mt-4">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead onClick={toggleCollapse}>
            <tr>
              <th className="px-4 py-2 bg-gray-100 border-b border-gray-300 text-left">
                <button
                  onClick={toggleCollapse}
                  className="focus:outline-none text-sm font-medium flex items-center"
                >
                  <span className="py-2 bg-gray-100 text-left text-fuchsia-900 font-semibold text-xl">
               {`Portfolio ${isCollapsed === true ?  "▼" : "▲"} `}
                  </span>
                </button>
              </th>
              <th className="px-4 py-2 bg-gray-100 border-b border-gray-300 text-left">
              SBI Bluechip
              </th>
              <th className="px-4 py-2 bg-gray-100 border-b border-gray-300 text-left">
              HDFC Index Fund
              </th>
              <th className="px-4 py-2 bg-gray-100 border-b border-gray-300 text-left">
              HDFC Index Fund
              </th>
              <th className="px-4 py-2 bg-gray-100 border-b border-gray-300 text-left">
              HDFC Index Fund
              </th>
            </tr>
          </thead>
          <tbody className={`${isCollapsed ? "hidden" : "table-row-group"}`}>
            <tr>
              <td className="px-4 py-2 border-b border-gray-300">P/E Ratio</td>
              <td className="px-4 py-2 border-b border-gray-300">4.22%</td>
              <td className="px-4 py-2 border-b border-gray-300">4.22%</td>
              <td className="px-4 py-2 border-b border-gray-300">4.22%</td>
              <td className="px-4 py-2 border-b border-gray-300">4.22%</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border-b border-gray-300">P/B Ratio</td>
              <td className="px-4 py-2 border-b border-gray-300">16.93%</td>
              <td className="px-4 py-2 border-b border-gray-300">16.93%</td>
              <td className="px-4 py-2 border-b border-gray-300">16.93%</td>
              <td className="px-4 py-2 border-b border-gray-300">16.93%</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border-b border-gray-300">Equity%</td>
              <td className="px-4 py-2 border-b border-gray-300">30.29%</td>
              <td className="px-4 py-2 border-b border-gray-300">30.29%</td>
              <td className="px-4 py-2 border-b border-gray-300">30.29%</td>
              <td className="px-4 py-2 border-b border-gray-300">30.29%</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border-b border-gray-300">Debt%</td>
              <td className="px-4 py-2 border-b border-gray-300">13.83%</td>
              <td className="px-4 py-2 border-b border-gray-300">13.83%</td>
              <td className="px-4 py-2 border-b border-gray-300">13.83%</td>
              <td className="px-4 py-2 border-b border-gray-300">13.83%</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border-b border-gray-300">Turnover Ratio</td>
              <td className="px-4 py-2 border-b border-gray-300">19.55%</td>
              <td className="px-4 py-2 border-b border-gray-300">17.32%</td>
              <td className="px-4 py-2 border-b border-gray-300">19.55%</td>
              <td className="px-4 py-2 border-b border-gray-300">17.32%</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border-b border-gray-300">Yield To Maturity</td>
              <td className="px-4 py-2 border-b border-gray-300">N/A</td>
              <td className="px-4 py-2 border-b border-gray-300">N/A</td>
              <td className="px-4 py-2 border-b border-gray-300">N/A</td>
              <td className="px-4 py-2 border-b border-gray-300">N/A</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border-b border-gray-300">Modified Duration</td>
              <td className="px-4 py-2 border-b border-gray-300">N/A</td>
              <td className="px-4 py-2 border-b border-gray-300">N/A</td>
              <td className="px-4 py-2 border-b border-gray-300">N/A</td>
              <td className="px-4 py-2 border-b border-gray-300">N/A</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border-b border-gray-300">Avg. Maturity</td>
              <td className="px-4 py-2 border-b border-gray-300">N/A</td>
              <td className="px-4 py-2 border-b border-gray-300">N/A</td>
              <td className="px-4 py-2 border-b border-gray-300">N/A</td>
              <td className="px-4 py-2 border-b border-gray-300">N/A</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border-b border-gray-300">Avg. Credit Quality</td>
              <td className="px-4 py-2 border-b border-gray-300">N/A</td>
              <td className="px-4 py-2 border-b border-gray-300">N/A</td>
              <td className="px-4 py-2 border-b border-gray-300">N/A</td>
              <td className="px-4 py-2 border-b border-gray-300">N/A</td>
            </tr>
          </tbody>
        </table>
      </div>


      <div className="overflow-x-auto mt-4">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead onClick={toggleCollapse}>
            <tr>
              <th className="px-4 py-2 bg-gray-100 border-b border-gray-300 text-left">
                <button
                  onClick={toggleCollapse}
                  className="focus:outline-none text-sm font-medium flex items-center"
                >
                  <span className="py-2 bg-gray-100 text-left text-fuchsia-900 font-semibold text-xl">
               {`Fund Details ${isCollapsed === true ?  "▼" : "▲"} `}
                  </span>
                </button>
              </th>
              <th className="px-4 py-2 bg-gray-100 border-b border-gray-300 text-left">
              SBI Bluechip
              </th>
              <th className="px-4 py-2 bg-gray-100 border-b border-gray-300 text-left">
              HDFC Index Fund
              </th>
              <th className="px-4 py-2 bg-gray-100 border-b border-gray-300 text-left">
              HDFC Index Fund
              </th>
              <th className="px-4 py-2 bg-gray-100 border-b border-gray-300 text-left">
              HDFC Index Fund
              </th>
            </tr>
          </thead>
          <tbody className={`${isCollapsed ? "hidden" : "table-row-group"}`}>
            <tr>
              <td className="px-4 py-2 border-b border-gray-300">Expense Ratio</td>
              <td className="px-4 py-2 border-b border-gray-300">4.22%</td>
              <td className="px-4 py-2 border-b border-gray-300">4.22%</td>
              <td className="px-4 py-2 border-b border-gray-300">4.22%</td>
              <td className="px-4 py-2 border-b border-gray-300">4.22%</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border-b border-gray-300">Exit Load</td>
              <td className="px-4 py-2 border-b border-gray-300">16.93%</td>
              <td className="px-4 py-2 border-b border-gray-300">16.93%</td>
              <td className="px-4 py-2 border-b border-gray-300">16.93%</td>
              <td className="px-4 py-2 border-b border-gray-300">16.93%</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border-b border-gray-300">Lock-in</td>
              <td className="px-4 py-2 border-b border-gray-300">No Lockin</td>
              <td className="px-4 py-2 border-b border-gray-300">No Lockin</td>
              <td className="px-4 py-2 border-b border-gray-300">No Lockin</td>
              <td className="px-4 py-2 border-b border-gray-300">No Lockin</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border-b border-gray-300">Benchmark Index</td>
              <td className="px-4 py-2 border-b border-gray-300">BSE 100 TRI</td>
              <td className="px-4 py-2 border-b border-gray-300">BSE 100 TRI</td>
              <td className="px-4 py-2 border-b border-gray-300">BSE 100 TRI</td>
              <td className="px-4 py-2 border-b border-gray-300">BSE 100 TRI</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border-b border-gray-300">Turnover Ratio</td>
              <td className="px-4 py-2 border-b border-gray-300">19.55%</td>
              <td className="px-4 py-2 border-b border-gray-300">17.32%</td>
              <td className="px-4 py-2 border-b border-gray-300">19.55%</td>
              <td className="px-4 py-2 border-b border-gray-300">17.32%</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border-b border-gray-300">Min. Investment</td>
              <td className="px-4 py-2 border-b border-gray-300">SIP ₹500</td>
              <td className="px-4 py-2 border-b border-gray-300">SIP ₹500</td>
              <td className="px-4 py-2 border-b border-gray-300">SIP ₹500</td>
              <td className="px-4 py-2 border-b border-gray-300">SIP ₹500</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border-b border-gray-300">Max. Investment</td>
              <td className="px-4 py-2 border-b border-gray-300">SIP ₹5000</td>
              <td className="px-4 py-2 border-b border-gray-300">SIP ₹5000</td>
              <td className="px-4 py-2 border-b border-gray-300">SIP ₹5000</td>
              <td className="px-4 py-2 border-b border-gray-300">SIP ₹5000</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border-b border-gray-300">Investment Horizon</td>
              <td className="px-4 py-2 border-b border-gray-300">Good for Medium Term</td>
              <td className="px-4 py-2 border-b border-gray-300">Good for Medium Term</td>
              <td className="px-4 py-2 border-b border-gray-300">Good for Medium Term</td>
              <td className="px-4 py-2 border-b border-gray-300">Good for Medium Term</td>
            </tr>
          </tbody>
        </table>
       
      </div>

      <div className="overflow-x-auto mt-4">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead onClick={toggleCollapse}>
            <tr>
              <th className="px-4 py-2 bg-gray-100 border-b border-gray-300 text-left">
                <button
                  onClick={toggleCollapse}
                  className="focus:outline-none text-sm font-medium flex items-center"
                >
                  <span className="py-2 bg-gray-100 text-left text-fuchsia-900 font-semibold text-xl">
               {`Fund Overview ${isCollapsed === true ?  "▼" : "▲"} `}
                  </span>
                </button>
              </th>
              <th className="px-4 py-2 bg-gray-100 border-b border-gray-300 text-left">
              SBI Bluechip
              </th>
              <th className="px-4 py-2 bg-gray-100 border-b border-gray-300 text-left">
              HDFC Index Fund
              </th>
              <th className="px-4 py-2 bg-gray-100 border-b border-gray-300 text-left">
              HDFC Index Fund
              </th>
              <th className="px-4 py-2 bg-gray-100 border-b border-gray-300 text-left">
              HDFC Index Fund
              </th>
            </tr>
          </thead>
          <tbody className={`${isCollapsed ? "hidden" : "table-row-group"}`}>
            <tr>
              <td className="px-4 py-2 border-b border-gray-300">Category</td>
              <td className="px-4 py-2 border-b border-gray-300">large cap, equity</td>
              <td className="px-4 py-2 border-b border-gray-300">large cap index, equity</td>
              <td className="px-4 py-2 border-b border-gray-300">large cap index, equity</td>
              <td className="px-4 py-2 border-b border-gray-300">large cap index, equity</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border-b border-gray-300">Fund Age</td>
              <td className="px-4 py-2 border-b border-gray-300">11 yr 9 m</td>
              <td className="px-4 py-2 border-b border-gray-300">11 yr 9 m</td>
              <td className="px-4 py-2 border-b border-gray-300">11 yr 9 m</td>
              <td className="px-4 py-2 border-b border-gray-300">11 yr 9 m</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border-b border-gray-300">Fund Size</td>
              <td className="px-4 py-2 border-b border-gray-300">₹53,276 Crs</td>
              <td className="px-4 py-2 border-b border-gray-300">₹53,276 Crs</td>
              <td className="px-4 py-2 border-b border-gray-300">₹53,276 Crs</td>
              <td className="px-4 py-2 border-b border-gray-300">₹53,276 Crs</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mb-20"></div>

      {/* Return Section */}

      {/* Add Risk Measures, Portfolio, and Fund Details sections similarly */}
    </div>
  );
};

export default Compare_Mutual_Fund;
