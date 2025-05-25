import React, { useState } from "react";
import axios from "axios";
import { FaUser, FaPhone, FaEnvelope, FaVenusMars, FaBirthdayCake, FaTint, FaMapMarkerAlt, FaComment, FaLock } from "react-icons/fa";
import "./reg.css"
const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    emailId: "",
    gender: "",
    age: "",
    bloodGroup: "",
    address: "",
    message: "",
    password: ""
  });

  const [passwordStrength, setPasswordStrength] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (name === "password") {
      checkPasswordStrength(value);
    }
  };

  const checkPasswordStrength = (password) => {
    const strength = password.length >= 8 ? "Strong" : password.length >= 5 ? "Medium" : "Weak";
    setPasswordStrength(strength);
  };

  const validateForm = () => {
    if (formData.mobileNumber.length !== 10) {
      alert("Mobile number must be 10 digits.");
      return false;
    }
    if (formData.age < 18 || formData.age > 65) {
      alert("Age must be between 18 and 65.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await axios.post("https://blood-donor-8q2v.onrender.com/api/auth/signup", formData);
      alert("Registration successful! Thank you for becoming a donor.");
      // Reset form after successful submission
      setFormData({
        fullName: "",
        mobileNumber: "",
        emailId: "",
        gender: "",
        age: "",
        bloodGroup: "",
        address: "",
        message: "",
        password: ""
      });
    } 
    catch (error) {
      console.error(error);
    
    if (error.response && error.response.status === 400) {
        alert(error.response.data.message); // Show specific error message
    } else {
        alert("Registration failed. Please try again.");
    }
    }
  };

  return (
    <div className="bg-gradient-to-b from-red-50 to-white min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-xl animate-fade-in">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-red-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <FaTint className="w-12 h-12 text-red-600 animate-pulse" />
          </div>
          <h2 className="text-4xl font-bold text-red-600 mb-2">
            Join Our Lifesaving Team
          </h2>
          <p className="text-lg text-gray-600">
            Complete this form to register as a blood donor and start saving lives.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div className="flex items-center border-2 border-gray-200 rounded-xl p-3 focus-within:border-red-500 transition-colors">
            <FaUser className="text-gray-500 mr-3" />
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full outline-none placeholder-gray-400"
              required
            />
          </div>
          
          {/* Mobile Number */}
          <div className="flex items-center border-2 border-gray-200 rounded-xl p-3 focus-within:border-red-500 transition-colors">
            <FaPhone className="text-gray-500 mr-3" />
            <input
              type="text"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              placeholder="Mobile Number"
              className="w-full outline-none placeholder-gray-400"
              required
            />
          </div>
          
          {/* Email */}
          <div className="flex items-center border-2 border-gray-200 rounded-xl p-3 focus-within:border-red-500 transition-colors">
            <FaEnvelope className="text-gray-500 mr-3" />
            <input
              type="email"
              name="emailId"
              value={formData.emailId}
              onChange={handleChange}
              placeholder="Email"
              className="w-full outline-none placeholder-gray-400"
              required
            />
          </div>
          
          {/* Gender Dropdown */}
          <div className="flex items-center border-2 border-gray-200 rounded-xl p-3 focus-within:border-red-500 transition-colors">
            <FaVenusMars className="text-gray-500 mr-3" />
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full outline-none bg-transparent"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Age */}
          <div className="flex items-center border-2 border-gray-200 rounded-xl p-3 focus-within:border-red-500 transition-colors">
            <FaBirthdayCake className="text-gray-500 mr-3" />
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Age"
              className="w-full outline-none placeholder-gray-400"
              required
            />
          </div>
          
          {/* Blood Group Dropdown */}
          <div className="flex items-center border-2 border-gray-200 rounded-xl p-3 focus-within:border-red-500 transition-colors">
            <FaTint className="text-gray-500 mr-3" />
            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              className="w-full outline-none bg-transparent"
              required
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>

          {/* Address */}
          <div className="flex items-center border-2 border-gray-200 rounded-xl p-3 focus-within:border-red-500 transition-colors">
            <FaMapMarkerAlt className="text-gray-500 mr-3" />
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              className="w-full outline-none placeholder-gray-400"
              required
            />
          </div>

          {/* Additional Message */}
          <div className="flex items-center border-2 border-gray-200 rounded-xl p-3 focus-within:border-red-500 transition-colors">
            <FaComment className="text-gray-500 mr-3" />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message (Optional)"
              className="w-full outline-none placeholder-gray-400"
            />
          </div>

          {/* Password */}
          <div className="flex items-center border-2 border-gray-200 rounded-xl p-3 focus-within:border-red-500 transition-colors">
            <FaLock className="text-gray-500 mr-3" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full outline-none placeholder-gray-400"
              required
            />
          </div>
          {passwordStrength && (
            <p className={`text-sm ${passwordStrength === "Weak" ? "text-red-500" : passwordStrength === "Medium" ? "text-yellow-500" : "text-green-500"}`}>
              Password Strength: {passwordStrength}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-4 rounded-xl font-bold hover:bg-red-700 transition-all hover:scale-[1.02]"
          >
            Register as Donor
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;