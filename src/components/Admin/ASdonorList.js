import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://blood-donor-8q2v.onrender.com/api/donors";

// Validation functions
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validateMobile = (mobile) => /^\d{10}$/.test(mobile);

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const DonorManagement = () => {
  const [donors, setDonors] = useState([]);
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    emailId: "",
    gender: "",
    age: "",
    bloodGroup: "",
    address: "",
    message: "",
    password: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch donors with cleanup
  useEffect(() => {
    const abortController = new AbortController();
    
    const fetchDonors = async () => {
      try {
        setLoading(true);
        const response = await axios.get(API_URL, {
          signal: abortController.signal
        });
        setDonors(response.data);
        setError("");
      } catch (err) {
        if (!abortController.signal.aborted) {
          setError("Failed to fetch donors. Please try again later.");
          console.error("Error fetching donors:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDonors();
    return () => abortController.abort();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "emailId" && value && !validateEmail(value)) {
      setError("Please enter a valid email address");
    } else if (name === "mobileNumber" && value && !validateMobile(value)) {
      setError("Please enter a 10-digit mobile number");
    } else {
      setError("");
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!validateEmail(formData.emailId)) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }
    if (!validateMobile(formData.mobileNumber)) {
      setError("Please enter a 10-digit mobile number");
      setLoading(false);
      return;
    }

    try {
      if (editingId) {
        const { password, bloodGroup, ...updateData } = formData;
        // Corrected PUT endpoint
        const response = await axios.put(
          `https://blood-donor-8q2v.onrender.com/api/editingId/${editingId}`,
          updateData
        );

        // Correct response data access
        setDonors(donors.map(donor => 
          donor._id === editingId ? response.data.donor : donor
        ));
      } else {
        const response = await axios.post("https://blood-donor-8q2v.onrender.com/api/auth/signup", formData);
        setDonors([...donors, response.data]);
      }
      resetForm();
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred. Please try again.");
      console.error("Error saving donor:", err);
    } finally {
      setLoading(false);
    }
  };

  // Edit donor
  const handleEdit = (donor) => {
    setFormData(donor);
    setEditingId(donor._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Delete donor
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this donor?")) return;
    
    try {
      await axios.delete(`https://blood-donor-8q2v.onrender.com/api/${id}`);
      setDonors(donors.filter((donor) => donor._id !== id));
      setError("");
    } catch (err) {
      setError("Failed to delete donor. Please try again.");
      console.error("Error deleting donor:", err);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      fullName: "",
      mobileNumber: "",
      emailId: "",
      gender: "",
      age: "",
      bloodGroup: "",
      address: "",
      message: "",
      password: "",
    });
    setEditingId(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Blood Donor Management</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-4 shadow-md rounded-md mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Mobile Number</label>
            <input
              type="tel"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              className="input-field"
              pattern="\d{10}"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="emailId"
              value={formData.emailId}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="input-field"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="input-field"
              min="18"
              max="65"
              required
            />
          </div>

          {!editingId && (
            <div className="space-y-2">
              <label className="block text-sm font-medium">Blood Group</label>
              <select
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                className="input-field"
                required
              >
                <option value="">Select Blood Group</option>
                {BLOOD_GROUPS.map(group => (
                  <option key={group} value={group}>{group}</option>
                ))}
              </select>
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-sm font-medium">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Message</label>
            <input
              type="text"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="input-field"
            />
          </div>

          {!editingId && (
            <div className="space-y-2">
              <label className="block text-sm font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input-field"
                minLength="6"
                required
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 mt-4 rounded w-full hover:bg-blue-700 disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? "Processing..." : editingId ? "Update Donor" : "Add Donor"}
        </button>
      </form>

      {loading ? (
        <div className="text-center">Loading donors...</div>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Name</th>
              <th className="border p-2">Blood Group</th>
              <th className="border p-2">Mobile</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {donors.map((donor) => (
              <tr key={donor._id} className="border">
                <td className="border p-2">{donor.fullName}</td>
                <td className="border p-2">{donor.bloodGroup}</td>
                <td className="border p-2">{donor.mobileNumber}</td>
                <td className="border p-2 flex gap-2">
                  <button
                    onClick={() => handleEdit(donor)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(donor._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DonorManagement;