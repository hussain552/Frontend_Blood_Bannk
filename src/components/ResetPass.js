import React, { useState } from "react";
import { FaLock } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      console.log(token)
      await axios.post(`https://blood-donor-8q2v.onrender.com/api/reset-password/${token}`, { newPassword });

      setMessage("Password reset successfully.");
      setNewPassword("");
      setTimeout(() => navigate("/login"), 2000); // Redirect after success
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-red-50 to-white">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-red-600 mb-4 text-center">Reset Password</h2>
        <p className="text-gray-600 text-center mb-6">Enter your new password below.</p>

        {message && <div className={`p-3 rounded-lg mb-6 ${message.includes("success") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{message}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center border border-gray-300 rounded-lg p-3">
            <FaLock className="text-gray-500 mr-3" />
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full outline-none"
              required
              disabled={loading}
            />
          </div>

          <button type="submit" disabled={loading} className="w-full bg-red-600 text-white py-2 rounded-lg">
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
