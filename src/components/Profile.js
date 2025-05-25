import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "./Profile.css"
const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [saving, setSaving] = useState(false);

  // Fetch user profile
  const fetchProfile = useCallback(async () => {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      setError("No email found in localStorage");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get("https://blood-donor-8q2v.onrender.com/api/profile", {
        params: { emailId: userEmail },
      });

      if (response.data?.data) {
        setProfileData(response.data.data);
        setFormData(response.data.data);
      } else {
        setError("No profile data found.");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch profile data.");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // Handle input changes with number parsing
  const handleChange = (e) => {
    const value = e.target.type === "number" 
      ? parseFloat(e.target.value)
      : e.target.value;
    
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: value,
    }));
  };

  // Save profile updates
  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await axios.put("https://blood-donor-8q2v.onrender.com/api/profile", formData);

      setProfileData(response.data.data);
      setIsEditing(false);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to update profile.");
    }
    setSaving(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-6 bg-white rounded-2xl shadow-lg">
        <h1 className="text-2xl font-semibold text-center text-red-600 mb-4">
          {isEditing ? "Edit Profile" : "Donor Profile"}
        </h1>

        {loading ? (
          <p className="text-center text-gray-600">Loading profile...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : profileData ? (
          <div className="space-y-4">
            {[
              { label: "Name", name: "fullName" },
              { label: "Email", name: "emailId", disabled: true },
              { label: "Age", name: "age" },
              { label: "Blood Group", name: "bloodGroup" },
              { label: "Phone Number", name: "mobileNumber" },
              { label: "Address", name: "address" },
              { label: "Message", name: "message" },
            ].map((field, index) => (
              <div key={index} className="flex justify-between border-b pb-2">
                <span className="font-medium text-gray-700">{field.label}:</span>
                {isEditing && !field.disabled ? (
                  <input
                    type={field.name === "age" ? "number" : "text"}
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    className="text-gray-600 border rounded px-2 py-1 focus:outline-none"
                  />
                ) : (
                  <span className="text-gray-600">
                    {formData[field.name] || "N/A"}
                  </span>
                )}
              </div>
            ))}

            <div className="flex justify-center space-x-4 mt-4">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    disabled={saving || JSON.stringify(formData) === JSON.stringify(profileData)}
                    className={`px-4 py-2 rounded-md text-white ${
                      saving ? "bg-gray-400 cursor-not-allowed" : "bg-green-500"
                    }`}
                  >
                    {saving ? "Saving..." : "Save"}
                  </button>
                  <button
                    onClick={() => {
                      setFormData(profileData);
                      setIsEditing(false);
                    }}
                    className="px-4 py-2 bg-gray-500 text-white rounded-md"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button onClick={() => setIsEditing(true)} className="px-4 py-2 bg-blue-500 text-white rounded-md">
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">No profile data found.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;