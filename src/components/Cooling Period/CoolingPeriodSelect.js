import React from "react";

const CoolingPeriodSelect = ({ donationOptions, selectedKey, onSelect }) => {
  return (
    <div className="grid grid-cols-1 gap-3 max-h-[60vh] overflow-y-auto pr-2">
      {donationOptions.map((opt) => {
        const isSelected = selectedKey === opt.key;
        return (
          <div
            key={opt.key}
            onClick={() => onSelect(opt.key)}
            className={`
              relative p-4 rounded-xl border-2 cursor-pointer
              transition-all duration-200 ease-in-out group
              ${isSelected 
                ? 'border-red-500 bg-red-50/50 shadow-sm' 
                : 'border-gray-200 bg-white hover:border-red-200 hover:shadow-sm'
              }
            `}
          >
            <div className="flex items-start gap-4">
              {/* Custom Radio Button */}
              <div className="flex-shrink-0 mt-1">
                <div className={`
                  w-5 h-5 rounded-full border-2 flex items-center justify-center
                  transition-colors duration-200
                  ${isSelected ? 'border-red-500 bg-red-500' : 'border-gray-300 bg-white group-hover:border-red-300'}
                `}>
                  {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className={`font-semibold ${isSelected ? 'text-red-900' : 'text-gray-900'}`}>
                    {opt.label}
                  </h3>
                  <span className={`
                    text-xs font-bold px-2 py-1 rounded-md
                    ${isSelected ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'}
                  `}>
                    {opt.days} Days
                  </span>
                </div>
                <p className="text-sm text-gray-500 leading-snug">
                  {opt.description}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CoolingPeriodSelect;