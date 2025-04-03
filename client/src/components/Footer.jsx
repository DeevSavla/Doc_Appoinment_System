import React from 'react';
import logo from '../photos/logo.png';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center">
              <img src={logo} alt="MediCare Logo" className="h-10 w-auto" />
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">MediCare</span>
            </div>
            <p className="text-gray-600 text-sm">
              Providing quality healthcare services and connecting patients with the best medical professionals.
            </p>
            <div className="flex space-x-5">
              <a href="#" className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-gray-400 hover:text-blue-500 transition-colors duration-200 hover:shadow-lg">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-gray-400 hover:text-blue-400 transition-colors duration-200 hover:shadow-lg">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-gray-400 hover:text-pink-500 transition-colors duration-200 hover:shadow-lg">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-gray-400 hover:text-blue-700 transition-colors duration-200 hover:shadow-lg">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-900 font-semibold text-lg mb-4 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-1 after:w-12 after:bg-gradient-to-r after:from-blue-500 after:to-teal-400 after:rounded-full">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center group">
                  <i className="fas fa-chevron-right text-xs mr-2 text-blue-500 transform group-hover:translate-x-1 transition-transform duration-200"></i>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center group">
                  <i className="fas fa-chevron-right text-xs mr-2 text-blue-500 transform group-hover:translate-x-1 transition-transform duration-200"></i>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center group">
                  <i className="fas fa-chevron-right text-xs mr-2 text-blue-500 transform group-hover:translate-x-1 transition-transform duration-200"></i>
                  Our Services
                </Link>
              </li>
              <li>
                <Link to="/doctors" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center group">
                  <i className="fas fa-chevron-right text-xs mr-2 text-blue-500 transform group-hover:translate-x-1 transition-transform duration-200"></i>
                  Find Doctors
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center group">
                  <i className="fas fa-chevron-right text-xs mr-2 text-blue-500 transform group-hover:translate-x-1 transition-transform duration-200"></i>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-gray-900 font-semibold text-lg mb-4 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-1 after:w-12 after:bg-gradient-to-r after:from-blue-500 after:to-teal-400 after:rounded-full">Our Services</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/appointments" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center group">
                  <i className="fas fa-calendar-check text-sm mr-2 text-blue-500 transform group-hover:scale-110 transition-transform duration-200"></i>
                  Book Appointment
                </Link>
              </li>
              <li>
                <Link to="/emergency" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center group">
                  <i className="fas fa-ambulance text-sm mr-2 text-blue-500 transform group-hover:scale-110 transition-transform duration-200"></i>
                  Emergency Services
                </Link>
              </li>
              <li>
                <Link to="/online-consultation" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center group">
                  <i className="fas fa-video text-sm mr-2 text-blue-500 transform group-hover:scale-110 transition-transform duration-200"></i>
                  Online Consultation
                </Link>
              </li>
              <li>
                <Link to="/health-tips" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center group">
                  <i className="fas fa-heart text-sm mr-2 text-blue-500 transform group-hover:scale-110 transition-transform duration-200"></i>
                  Health Tips
                </Link>
              </li>
              <li>
                <Link to="/lab-tests" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center group">
                  <i className="fas fa-flask text-sm mr-2 text-blue-500 transform group-hover:scale-110 transition-transform duration-200"></i>
                  Lab Tests
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-gray-900 font-semibold text-lg mb-4 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-1 after:w-12 after:bg-gradient-to-r after:from-blue-500 after:to-teal-400 after:rounded-full">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="mt-1 mr-3 w-8 h-8 bg-gradient-to-br from-blue-500 to-teal-400 rounded-full flex items-center justify-center shadow-md">
                  <i className="fas fa-map-marker-alt text-white text-xs"></i>
                </div>
                <span className="text-gray-600">123 Healthcare Ave, Medical Center, City, 12345</span>
              </li>
              <li className="flex items-center">
                <div className="mr-3 w-8 h-8 bg-gradient-to-br from-blue-500 to-teal-400 rounded-full flex items-center justify-center shadow-md">
                  <i className="fas fa-phone-alt text-white text-xs"></i>
                </div>
                <span className="text-gray-600">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <div className="mr-3 w-8 h-8 bg-gradient-to-br from-blue-500 to-teal-400 rounded-full flex items-center justify-center shadow-md">
                  <i className="fas fa-envelope text-white text-xs"></i>
                </div>
                <span className="text-gray-600">contact@medicare.com</span>
              </li>
              <li className="flex items-center">
                <div className="mr-3 w-8 h-8 bg-gradient-to-br from-blue-500 to-teal-400 rounded-full flex items-center justify-center shadow-md">
                  <i className="fas fa-clock text-white text-xs"></i>
                </div>
                <span className="text-gray-600">24/7 Available</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Subscribe to Our Newsletter</h3>
            <p className="text-gray-600 text-sm mb-4">Stay updated with the latest health tips and services</p>
            <form className="flex flex-col sm:flex-row gap-3 sm:gap-0 max-w-lg mx-auto">
              <input type="email" placeholder="Enter your email" className="flex-grow rounded-lg sm:rounded-r-none px-4 py-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
              <button type="submit" className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white rounded-lg sm:rounded-l-none px-6 py-2 transition-all duration-200 shadow-md">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} MediCare. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-600 hover:text-blue-600 text-sm transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-600 hover:text-blue-600 text-sm transition-colors duration-200">
                Terms of Service
              </Link>
              <Link to="/sitemap" className="text-gray-600 hover:text-blue-600 text-sm transition-colors duration-200">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
