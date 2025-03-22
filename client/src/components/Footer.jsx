import React from 'react';
import logo from '../photos/logo.png';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Footer() {
  return (
    <footer className="bg-gradient-to-b from-white to-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center">
              <img src={logo} alt="MediCare Logo" className="h-10 w-auto" />
              <span className="ml-2 text-xl font-bold text-gray-900">MediCare</span>
            </div>
            <p className="text-gray-600 text-sm">
              Providing quality healthcare services and connecting patients with the best medical professionals.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors duration-200">
                <i className="fab fa-facebook text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors duration-200">
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-700 transition-colors duration-200">
                <i className="fab fa-linkedin text-xl"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-900 font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center">
                  <i className="fas fa-chevron-right text-xs mr-2 text-blue-500"></i>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center">
                  <i className="fas fa-chevron-right text-xs mr-2 text-blue-500"></i>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center">
                  <i className="fas fa-chevron-right text-xs mr-2 text-blue-500"></i>
                  Our Services
                </Link>
              </li>
              <li>
                <Link to="/doctors" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center">
                  <i className="fas fa-chevron-right text-xs mr-2 text-blue-500"></i>
                  Find Doctors
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-gray-900 font-semibold text-lg mb-4">Our Services</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/appointments" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center">
                  <i className="fas fa-calendar-check text-xs mr-2 text-blue-500"></i>
                  Book Appointment
                </Link>
              </li>
              <li>
                <Link to="/emergency" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center">
                  <i className="fas fa-ambulance text-xs mr-2 text-blue-500"></i>
                  Emergency Services
                </Link>
              </li>
              <li>
                <Link to="/online-consultation" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center">
                  <i className="fas fa-video text-xs mr-2 text-blue-500"></i>
                  Online Consultation
                </Link>
              </li>
              <li>
                <Link to="/health-tips" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center">
                  <i className="fas fa-heart text-xs mr-2 text-blue-500"></i>
                  Health Tips
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-gray-900 font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1.5 text-blue-500 mr-3"></i>
                <span className="text-gray-600">123 Healthcare Ave, Medical Center, City, 12345</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-phone-alt text-blue-500 mr-3"></i>
                <span className="text-gray-600">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope text-blue-500 mr-3"></i>
                <span className="text-gray-600">contact@medicare.com</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-clock text-blue-500 mr-3"></i>
                <span className="text-gray-600">24/7 Available</span>
              </li>
            </ul>
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
