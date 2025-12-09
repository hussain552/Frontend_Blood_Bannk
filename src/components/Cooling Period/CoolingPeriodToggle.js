import React from "react";

const CoolingPeriodToggle = ({ enabled, onClick, label }) => {
  return (
    <div className="flex items-center justify-between py-2 cursor-pointer" onClick={onClick}>
      <div className="flex flex-col">
        <span className="font-medium text-gray-900">Unavailable to Donate?</span>
        <span className="text-xs text-gray-500">Enable cooling period</span>
      </div>
      
      <div className={`
        relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 focus:outline-none
        ${enabled ? 'bg-red-500' : 'bg-gray-300'}
      `}>
        <span
          className={`
            inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-300 ease-in-out
            ${enabled ? 'translate-x-6' : 'translate-x-1'}
          `}
        />
      </div>
    </div>
  );
};

export default CoolingPeriodToggle;