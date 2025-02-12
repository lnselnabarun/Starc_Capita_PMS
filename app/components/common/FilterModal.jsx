import React, { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import Image from 'next/image';

const FilterModal = ({ isOpen, onClose }) => {
  const [costRange, setCostRange] = useState([100, 90000]);
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    cost: true,
    riskRatios: true,
    netRollingReturns: false,
    filterMenuName1: false,
    filterMenuName2: false,
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const categories = [
    'Large Cap', 'Large & Mid Cap', 'Mid Cap', 'Flexicap', 'Flexi Cap',
    'Business Cycle', 'Special Situation', 'Manufacturing', 'Defense', 'Infrastructure'
  ];

  const riskRatios = ['Up', 'Down', 'Beta', 'Alpha'];

  return (
    <div className={`fixed inset-y-0 left-0 w-full sm:w-80 bg-gray-100 shadow-lg transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-50 overflow-y-auto`}>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Filter</h2>
          <div 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label="Close filter"
          >
            <Image
              src={require('../../assets/logo/CloseModal.png')}  // Replace with the actual path to your close icon
              alt="Close"
              width={24}
              height={24}
            />
          </div>
        </div>

        {/* Category Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium">Category</h3>
            <button onClick={() => toggleSection('category')}>
              {expandedSections.category ? <Minus size={20} /> : <Plus size={20} />}
            </button>
          </div>
          {expandedSections.category && (
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center">
                  <input type="checkbox" id={category} className="mr-2 h-5 w-5" />
                  <label htmlFor={category} className="text-gray-600">{category}</label>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cost Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium">Cost</h3>
            <button onClick={() => toggleSection('cost')}>
              {expandedSections?.cost ? <Minus size={20} /> : <Plus size={20} />}
            </button>
          </div>
          {expandedSections.cost && (
            <div>
              <input
                type="range"
                min="100"
                max="90000"
                value={costRange[1]}
                onChange={(e) => setCostRange([costRange[0], parseInt(e.target.value)])}
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
            <h3 className="text-lg font-medium">Risk Ratios</h3>
            <button onClick={() => toggleSection('riskRatios')}>
              {expandedSections?.riskRatios ? <Minus size={20} /> : <Plus size={20} />}
            </button>
          </div>
          {expandedSections?.riskRatios && (
            <div className="space-y-2">
              {riskRatios.map((ratio) => (
                <div key={ratio} className="flex items-center">
                  <input type="checkbox" id={ratio} className="mr-2 h-5 w-5" />
                  <label htmlFor={ratio} className="text-gray-600">{ratio}</label>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Additional Sections */}
        {['Net Rolling Returns', 'Filter MF Name'].map((section, index) => (
          <div key={section} className="mb-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">{section}</h3>
              <button onClick={() => toggleSection(`filterMenuName${index}`)}>
                <Plus size={20} />
              </button>
            </div>
          </div>
        ))}
        <div className="p-4 border-t">
          <button className="w-full bg-fuchsia-950 text-white py-2 px-4 rounded-md hover:bg-fuchsia-800 transition duration-300">
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;