import React, { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import axios from "axios";

const ForgotPassword = () => {
  const [emailId, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
        await axios.post("https://blood-donor-8q2v.onrender.com/api/forgot-password", { emailId });

      setMessage("Password reset link sent to your email.");
      setEmail(""); 
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-red-50 to-white">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-red-600 mb-4 text-center">Forgot Password?</h2>
        <p className="text-gray-600 text-center mb-6">Enter your email to receive a password reset link.</p>

        {message && <div className={`p-3 rounded-lg mb-6 ${message.includes("sent") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{message}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center border border-gray-300 rounded-lg p-3">
            <FaEnvelope className="text-gray-500 mr-3" />
            <input 
              type="email" 
              value={emailId} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Enter your email" 
              className="w-full outline-none" 
              required 
              disabled={loading}
            />
          </div>

          <button type="submit" disabled={loading} className="w-full bg-red-600 text-white py-2 rounded-lg">
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
