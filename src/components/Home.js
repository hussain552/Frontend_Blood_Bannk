import React from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate from react-router-dom
import "tailwindcss/tailwind.css";

const Home = () => {
  const navigate = useNavigate();  // Initialize navigate function

  const handleBecomeDonor = () => {
    navigate("/registration");  // Navigate to the registration page when the button is clicked
  };

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* Hero Section */}
      <div className="relative">
        <img
          src="/images/banner3.jpg"  // Correct path
          alt="Banner"
          className="w-full h-[500px] object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white">
          <h2 className="text-4xl font-bold">Save Lives, Donate Blood Today!</h2>
          <p className="mt-2 text-lg">Your one donation can save up to three lives.</p>
          <button
            onClick={handleBecomeDonor}  // Handle button click
            className="mt-4 bg-red-600 px-6 py-3 rounded-full text-lg font-semibold hover:bg-red-700"
          >
            Become a Donor
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 text-center">
        <h3 className="text-3xl font-semibold text-red-600">Why Donate Blood?</h3>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h4 className="text-xl font-semibold">Easy Registration</h4>
            <p className="mt-2">Quick and seamless sign-up for donors.</p>
          </div>
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h4 className="text-xl font-semibold">Find Donors Nearby</h4>
            <p className="mt-2">Locate and connect with donors instantly.</p>
          </div>
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h4 className="text-xl font-semibold">Secure & Fast</h4>
            <p className="mt-2">Safe and verified donor connections.</p>
          </div>
        </div>
      </div>


    </div>
  );
};

export default Home;
