import React, { useState } from "react";
import axios from "axios";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const API_URL =  "https://blood-donor-8q2v.onrender.com";

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Email and password are required!");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/api/admin/login`, {
        email,
        password,
      });

      alert("Login Successful!");
      sessionStorage.setItem("adminToken", response.data.token); // ✅ More secure than localStorage
      window.location.href = "/admin/Dashbord";
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password!");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!resetEmail.trim()) {
      setError("Email is required!");
      setLoading(false);
      return;
    }

    try {
      await axios.post(`${API_URL}/api/admin/forgot-password`, {
        email: resetEmail,
      });

      alert("Reset link sent to your email!");
      setForgotPassword(false);
    } catch (err) {
      setError(err.response?.data?.message || "Error sending reset email!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        {forgotPassword ? (
          <div>
            <h2 className="text-2xl font-semibold text-center mb-4">Forgot Password</h2>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border rounded mb-3"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
            />
            <button
              onClick={handleForgotPassword}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
            <p
              className="text-blue-500 text-sm text-center mt-3 cursor-pointer"
              onClick={() => setForgotPassword(false)}
            >
              Back to Login
            </p>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-semibold text-center mb-4">Admin Login</h2>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <input
              type="email"
              placeholder="Email"
              className="w-full px-3 py-2 border rounded mb-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-3 py-2 border rounded mb-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={handleLogin}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            <p
              className="text-blue-500 text-sm text-center mt-3 cursor-pointer"
              onClick={() => setForgotPassword(true)}
            >
              Forgot Password?
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;
