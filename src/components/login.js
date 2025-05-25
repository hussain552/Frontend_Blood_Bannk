import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const Login = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ emailId: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("https://blood-donor-8q2v.onrender.com/api/auth/login", formData);
      console.log("Login successful:", response.data);
      login(formData.emailId);
      navigate("/");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAccount = () => {
    navigate("/registration"); // Navigate to the registration page
  };

  const handleForgotPassword = () => {
    navigate("/forgetpassword"); // Navigate to Forgot Password page
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-red-50 to-white">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-red-600 mb-4 text-center">Welcome Back!</h2>
        <p className="text-gray-600 text-center mb-6">Sign in to your account to continue.</p>

        {error && <div className="bg-red-100 text-red-800 p-3 rounded-lg mb-6">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center border border-gray-300 rounded-lg p-3">
            <FaEnvelope className="text-gray-500 mr-3" />
            <input type="email" name="emailId" value={formData.emailId} onChange={handleChange} placeholder="Email Address" className="w-full outline-none" required />
          </div>

          <div className="flex items-center border border-gray-300 rounded-lg p-3">
            <FaLock className="text-gray-500 mr-3" />
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="w-full outline-none" required />
          </div>

          {/* Forgot Password Link */}
          <div className="text-right">
            <button onClick={handleForgotPassword} className="text-red-600 font-semibold hover:underline">Forgot Password?</button>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-red-600 text-white py-2 rounded-lg">{loading ? "Logging in..." : "Login"}</button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">Don't have an account?</p>
          <button onClick={handleCreateAccount} className="text-red-600 font-semibold hover:underline">Create Account</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
