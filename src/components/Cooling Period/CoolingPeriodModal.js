import React, { useState, useEffect } from "react";
import CoolingPeriodSelect from "./CoolingPeriodSelect";

const CoolingPeriodModal = ({ isOpen, onClose, donationOptions, initialTypeKey, onSave }) => {
  const [selectedKey, setSelectedKey] = useState(initialTypeKey || donationOptions[0].key);

  // Reset selection when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedKey(initialTypeKey || donationOptions[0].key);
    }
  }, [isOpen, initialTypeKey, donationOptions]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    const selectedOption = donationOptions.find(opt => opt.key === selectedKey);
    if (selectedOption) {
      onSave({ typeKey: selectedKey, days: selectedOption.days });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100">
        
        {/* Header */}
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-800">Select Donation Type</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <p className="text-sm text-gray-600 mb-4">
            Select the type of your last donation to automatically calculate when you can donate again.
          </p>
          <CoolingPeriodSelect 
            donationOptions={donationOptions}
            selectedKey={selectedKey}
            onSelect={setSelectedKey}
          />
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button 
            onClick={handleConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 shadow-sm"
          >
            Confirm & Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoolingPeriodModal;