import React, { useState } from "react";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";

const FilterModal = ({ isOpen, onClose, type }) => {
  const [costRange, setCostRange] = useState([0, 100000]);
  const [rollingReturns, setRollingReturns] = useState([0, 100]);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    cost: true,
    riskRatios: true,
    netRollingReturns: false,
    filterMFName: true,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const categories = ["Large Cap","Large & Mid Cap","Mid Cap","Flexicap", "Flexi Cap"];

  const riskRatios = ["LargeCap", "MidCap", "SmallCap", "SemiCap"];

  const returnPeriods = ["1 Year", "3 Years", "5 Years"];

  return (
    <div
      className={`fixed inset-y-0 left-0 w-full sm:w-80 bg-gray-100 shadow-lg transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out z-50 overflow-y-auto`}
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Filter</h2>
          <div
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label="Close filter"
          >
            <Image
              src={require("../../assets/logo/CloseModal.png")}
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
          {expandedSections.filterMFName && (
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
              {expandedSections.category ? (
                <Minus size={20} />
              ) : (
                <Plus size={20} />
              )}
            </button>
          </div>
          {expandedSections.category && (
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center">
                  <input
                    type="checkbox"
                    id={category}
                    className="mr-2 h-5 w-5"
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
              {expandedSections.cost ? <Minus size={20} /> : <Plus size={20} />}
            </button>
          </div>
          {expandedSections.cost && (
            <div>
              <input
                type="range"
                min="0"
                max="90000"
                value={costRange[1]}
                onChange={(e) =>
                  setCostRange([costRange[0], parseInt(e.target.value)])
                }
                className="w-full"
              />
              <div className="flex justify-between">
                <span>{costRange[0]}</span>
                <span>{costRange[1]}</span>
              </div>
            </div>
          )}
        </div>

        {/* Risk Ratios Section */}
        <div className="mb-6">
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
                  <input type="checkbox" id={ratio} className="mr-2 h-5 w-5" />
                  <label htmlFor={ratio} className="text-gray-600">
                    {ratio}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Net Rolling Returns Section */}
        <div className="mb-6">
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
                    />
                    <label htmlFor={period} className="text-gray-600">
                      {period}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t">
          <button
            onClick={onClose}
            className="w-full bg-fuchsia-950 text-white py-2 px-4 rounded-md hover:bg-fuchsia-800 transition duration-200"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
