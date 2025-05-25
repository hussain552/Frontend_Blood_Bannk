import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaComment } from 'react-icons/fa';
import axios from 'axios';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    EmailId: '',
    ContactNumber: '',
    Message: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await axios.post('https://blood-donor-8q2v.onrender.com/api/admin/contactquery', formData);
      setSuccessMessage('Your message has been sent successfully!');
      setFormData({
        name: '',
        EmailId: '',
        ContactNumber: '',
        Message: ''
      });
    } catch (error) {
      if (error.response) {
        // Backend responded with an error
        setErrorMessage(error.response.data.error || 'Error submitting form.');
        console.error('Contact form error:', error.response.data);
      }
    else{
      setErrorMessage( 'Error submitting form.');
    }
    }
      finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-8">
        <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">
          Contact Us
        </h2>
        
        {(successMessage || errorMessage) && (
          <div className={`mb-6 p-4 rounded-lg ${successMessage ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {successMessage || errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div className="flex items-center border border-gray-300 rounded-lg p-3">
            <FaUser className="text-gray-500 mr-3" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full outline-none"
              maxLength="100"
              required
            />
          </div>

          {/* Email Field */}
          <div className="flex items-center border border-gray-300 rounded-lg p-3">
            <FaEnvelope className="text-gray-500 mr-3" />
            <input
              type="email"
              name="EmailId"
              value={formData.EmailId}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full outline-none"
              maxLength="120"
              required
            />
          </div>

          {/* Contact Number Field */}
          <div className="flex items-center border border-gray-300 rounded-lg p-3">
            <FaPhone className="text-gray-500 mr-3" />
            <input
              type="tel"
              name="ContactNumber"
              value={formData.ContactNumber}
              onChange={handleChange}
              placeholder="Contact Number"
              className="w-full outline-none"
              maxLength="11"
              required
            />
          </div>

          {/* Message Field */}
          <div className="flex items-center border border-gray-300 rounded-lg p-3">
            <FaComment className="text-gray-500 mr-3" />
            <textarea
              name="Message"
              value={formData.Message}
              onChange={handleChange}
              placeholder="Your Message"
              className="w-full outline-none"
              rows="4"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:bg-red-400"
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;