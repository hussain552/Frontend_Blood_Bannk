import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-red-600 text-white mt-16">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Us */}
          <div>
            <h3 className="text-xl font-bold mb-4">About Us</h3>
            <p className="text-sm">
              We are dedicated to saving lives by connecting blood donors with those in need. Join us in our mission to make a difference.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-red-200">Home</Link></li>
              <li><Link to="/registration" className="hover:text-red-200">Donate Blood</Link></li>
              <li><Link to="/donorlist" className="hover:text-red-200">Request Blood</Link></li>
              <li><Link to="/contactus" className="hover:text-red-200">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li>Email: <a href="mailto:support@bloodbank.com" className="hover:text-red-200">support@bloodbank.com</a></li>
              <li>Phone: <a href="tel:+1234567890" className="hover:text-red-200">+1 234 567 890</a></li>
              <li>Address: 123 Donation St, Lifesaver City</li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-200">
                <FaFacebook size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-200">
                <FaTwitter size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-200">
                <FaInstagram size={24} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-200">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-red-500 mt-8 pt-8 text-center">
          <p className="flex items-center justify-center space-x-2">
            <span>Made with</span>
            <FaHeart className="text-red-200 animate-pulse" />
            <span>by Blood Bank Team</span>
          </p>
          <p className="text-sm mt-2">
            &copy; {new Date().getFullYear()} Blood Bank. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
