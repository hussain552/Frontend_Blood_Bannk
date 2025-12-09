import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

// Importing from the subfolder as requested
import CoolingPeriodSelect from "./Cooling Period/CoolingPeriodSelect";
import CoolingPeriodModal from "./Cooling Period/CoolingPeriodModal";
import CoolingPeriodToggle from "./Cooling Period/CoolingPeriodToggle";

/* Donation options configuration */
const DONATION_OPTIONS = [
  {
    key: "whole_blood",
    label: "Whole Blood",
    days: 90,
    description: "Standard whole blood donation. 90 days recovery.",
  },
  {
    key: "platelets",
    label: "Platelets",
    days: 14,
    description: "Apheresis platelets. 14 days recovery.",
  },
  {
    key: "plasma",
    label: "Plasma",
    days: 28,
    description: "Plasma donation. 28 days recovery.",
  },
  {
    key: "double_red",
    label: "Double Red Cells",
    days: 120,
    description: "Double red-cell donation. 120 days recovery.",
  },
];

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [saving, setSaving] = useState(false);

  // Cooling Feature State
  const [coolingModalOpen, setCoolingModalOpen] = useState(false);
  const [coolingEnabled, setCoolingEnabled] = useState(false);

  // Helper to check if user is currently restricted
  const checkIsRestricted = (restrictedDate) => {
    if (!restrictedDate) return false;
    const today = new Date();
    const rDate = new Date(restrictedDate);
    return rDate > today;
  };

  const fetchProfile = useCallback(async () => {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      setError("No email found. Please login.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get("https://blood-donor-8q2v.onrender.com/api/profile", {
        params: { emailId: userEmail },
      });

      if (response.data?.data) {
        const data = response.data.data;
        setProfileData(data);
        setFormData(data);
        
        // SYNC: Determine status based on the database date
        const isRestricted = checkIsRestricted(data.restrictedUntil);
        setCoolingEnabled(isRestricted);
        
      } else {
        setError("Profile not found.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load profile.");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleChange = (e) => {
    const value = e.target.type === "number" ? parseFloat(e.target.value) : e.target.value;
    setFormData((prev) => ({ ...prev, [e.target.name]: value }));
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      const response = await axios.put("https://blood-donor-8q2v.onrender.com/api/profile", formData);
      if(response.data?.data) {
        setProfileData(response.data.data);
        setIsEditing(false);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update profile.");
    }
    setSaving(false);
  };

  // --- ENABLE COOLING ---
  const handleSaveCooling = async ({ typeKey, days }) => {
    // 1. Calculate the future date
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + days);

    // 2. Prepare Payload matching your Mongoose Schema
    const payload = {
      ...profileData,
      restrictedUntil: futureDate.toISOString(), 
      restrictedReason: typeKey, // Storing the donation type key here
    };

    // Optimistic Update
    setCoolingEnabled(true);
    setCoolingModalOpen(false);
    
    try {
      const response = await axios.put("https://blood-donor-8q2v.onrender.com/api/profile", payload);
      if (response.data?.data) {
        setProfileData(response.data.data);
        setFormData(response.data.data);
      }
    } catch (err) {
      // Revert on failure
      setCoolingEnabled(checkIsRestricted(profileData?.restrictedUntil));
      alert("Failed to update status.");
    }
  };

  // --- DISABLE COOLING ---
  const handleDisableCooling = async () => {
    if(!window.confirm("Are you sure you are ready to donate again?")) return;

    // Payload to clear the restriction in DB
    const payload = {
      ...profileData,
      restrictedUntil: null, 
      restrictedReason: "", 
    };

    setCoolingEnabled(false);
    
    try {
      const response = await axios.put("https://blood-donor-8q2v.onrender.com/api/profile", payload);
      if (response.data?.data) {
        setProfileData(response.data.data);
        setFormData(response.data.data);
      }
    } catch (err) {
      setCoolingEnabled(true);
      alert("Failed to update status.");
    }
  };

  // Toggle Click Handler
  const handleToggleClick = () => {
    if (coolingEnabled) {
      handleDisableCooling();
    } else {
      setCoolingModalOpen(true);
    }
  };

  // Helper to format the reason key back to readable text
  const getReasonLabel = (key) => {
    if(!key) return "Admin Restriction";
    const option = DONATION_OPTIONS.find(opt => opt.key === key);
    return option ? option.label : key;
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading Profile...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-500 mt-2">Manage your personal details and donation availability</p>
        </div>

        {/* 1. Availability Status Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 overflow-hidden relative">
          <div className={`absolute top-0 left-0 w-1 h-full ${coolingEnabled ? 'bg-red-500' : 'bg-green-500'}`} />
          
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Donation Status</h2>
              <p className={`text-sm mt-1 font-medium ${coolingEnabled ? 'text-red-600' : 'text-green-600'}`}>
                {coolingEnabled ? "Currently in Cooling Period" : "Available to Donate"}
              </p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              coolingEnabled ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
            }`}>
              {coolingEnabled ? 'Unavailable' : 'Active'}
            </span>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 mb-4">
             <CoolingPeriodToggle 
               enabled={coolingEnabled} 
               onClick={handleToggleClick} 
             />
          </div>

          {coolingEnabled && (
             <div className="text-sm text-gray-600 bg-white border border-gray-200 rounded-lg p-3 flex gap-3 items-center">
                <div className="p-2 bg-red-50 rounded-full text-red-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <div>
                  <p className="font-medium">
                      Restricted Until: {profileData?.restrictedUntil ? new Date(profileData.restrictedUntil).toLocaleDateString() : 'Unknown'}
                  </p>
                  <p className="text-xs text-gray-500">
                      Reason: {getReasonLabel(profileData?.restrictedReason)}
                  </p>
                </div>
                <button 
                  onClick={() => setCoolingModalOpen(true)}
                  className="ml-auto text-xs text-blue-600 underline hover:text-blue-800"
                >
                  Change
                </button>
             </div>
          )}
        </div>

        {/* 2. Personal Details Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
            <h2 className="text-xl font-bold text-gray-800">Personal Details</h2>
            {!isEditing && (
              <button 
                onClick={() => setIsEditing(true)}
                className="text-sm font-medium text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
              >
                Edit Details
              </button>
            )}
          </div>

          <div className="space-y-5">
            {[
              { label: "Full Name", name: "fullName", type: "text" },
              { label: "Email Address", name: "emailId", type: "text", disabled: true },
              { label: "Age", name: "age", type: "number" },
              { label: "Blood Group", name: "bloodGroup", type: "text" },
              { label: "Phone Number", name: "mobileNumber", type: "text" },
              { label: "Address", name: "address", type: "text" },
              { label: "Message", name: "message", type: "textarea" },
            ].map((field) => (
              <div key={field.name} className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
                <label className="text-sm font-medium text-gray-500 md:text-right md:pr-4">
                  {field.label}
                </label>
                <div className="md:col-span-2">
                  {isEditing && !field.disabled ? (
                    field.type === "textarea" ? (
                      <textarea
                        name={field.name}
                        value={formData[field.name] || ""}
                        onChange={handleChange}
                        className="w-full rounded-lg border-gray-300 border p-2 text-sm focus:ring-2 focus:ring-red-200 focus:border-red-400 outline-none transition-all"
                        rows="3"
                      />
                    ) : (
                      <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name] || ""}
                        onChange={handleChange}
                        className="w-full rounded-lg border-gray-300 border p-2 text-sm focus:ring-2 focus:ring-red-200 focus:border-red-400 outline-none transition-all"
                      />
                    )
                  ) : (
                    <div className="text-gray-900 font-medium text-sm py-2">
                      {formData[field.name] || <span className="text-gray-300 italic">Not set</span>}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {isEditing && (
            <div className="mt-8 flex justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                onClick={() => {
                  setFormData(profileData);
                  setIsEditing(false);
                }}
                className="px-5 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProfile}
                disabled={saving}
                className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Modal */}
      <CoolingPeriodModal
        isOpen={coolingModalOpen}
        onClose={() => setCoolingModalOpen(false)}
        donationOptions={DONATION_OPTIONS}
        initialTypeKey={profileData?.restrictedReason}
        onSave={handleSaveCooling}
      />
    </div>
  );
};

export default Profile;