import React from "react";
import { FaHandHoldingHeart, FaUsers, FaShieldAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate();  // Initialize navigate function

  const handleBecomeDonor = () => {
    navigate("/registration");  // Navigate to the registration page when the button is clicked
  };
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="bg-red-600 text-white py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">About BloodConnect</h1>
        <p className="text-lg">
          We are a community-driven platform dedicated to saving lives through blood donation.
        </p>
      </div>

      {/* Mission Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-red-600 mb-4">Our Mission</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            To connect blood donors with those in need, ensuring timely access to safe and reliable blood supplies.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<FaHandHoldingHeart className="w-10 h-10 text-red-600" />}
            title="Save Lives"
            text="Every donation can save up to 3 lives."
          />
          <FeatureCard 
            icon={<FaUsers className="w-10 h-10 text-red-600" />}
            title="Build Community"
            text="Join a network of lifesaving heroes."
          />
          <FeatureCard 
            icon={<FaShieldAlt className="w-10 h-10 text-red-600" />}
            title="Ensure Safety"
            text="Sterile and supervised donation processes."
          />
        </div>
      </div>

      {/* Story Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-red-600 mb-4">Our Story</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              BloodConnect was founded in 2023 with a vision to make blood donation simple, accessible, and efficient. Our platform bridges the gap between donors, hospitals, and patients, ensuring no one has to face a shortage of blood.
            </p>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-red-600 mb-4">Our Values</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <ValueCard 
            title="Compassion"
            text="We care deeply about every life we touch."
          />
          <ValueCard 
            title="Transparency"
            text="We believe in open and honest communication."
          />
          <ValueCard 
            title="Innovation"
            text="We use technology to make blood donation easier."
          />
          <ValueCard 
            title="Community"
            text="We are stronger when we work together."
          />
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-red-600 text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Make a Difference?</h2>
        <p className="text-lg mb-8">
          Join our community of lifesavers today. Your donation can save lives.
        </p>

          <button onClick={handleBecomeDonor}  className="bg-white text-red-600 px-8 py-3 rounded-full font-bold hover:bg-red-50 transition-colors">
          Become a Donor
        </button>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, text }) => (
  <div className="bg-white p-6 rounded-lg shadow-md text-center">
    <div className="flex justify-center mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-600">{text}</p>
  </div>
);

const ValueCard = ({ title, text }) => (
  <div className="bg-white p-6 rounded-lg shadow-md text-center">
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-600">{text}</p>
  </div>
);

export default AboutUs;