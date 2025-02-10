import React from 'react';
import logo from '../photos/logo.png';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className='py-4 bg-gray-50'>
      <div className='container mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-4 text-center'>
        <div className='w-full lg:w-2/5 flex flex-col items-center gap-4'>
          <img src={logo} alt="Logo" className='h-8' />
          <p className='text-sm text-gray-400'>© 2023 Developed by Deev Savla. All rights reserved.</p>
          <div className='flex gap-4 text-lg justify-center'>
            <i className="fa-brands fa-youtube hover:text-red-500 transition"></i>
            <i className="fa-brands fa-discord hover:text-indigo-500 transition"></i>
            <i className="fa-brands fa-linkedin hover:text-blue-500 transition"></i>
            <i className="fa-brands fa-instagram hover:text-pink-500 transition"></i>
          </div>
        </div>

        <div className='w-full lg:w-1/5 flex flex-col items-center'>
          <h3 className='font-bold text-lg mb-4'>Quick Links</h3>
          <Link to="/" className='mb-2 hover:text-blue-400 transition text-gray-400'>Home</Link>
          <Link to="/about" className='mb-2 hover:text-blue-400 transition text-gray-400'>About Us</Link>
          <Link to="/services" className='hover:text-blue-400 transition text-gray-400'>Services</Link>
        </div>

        <div className='w-full lg:w-1/5 flex flex-col items-center'>
          <h3 className='font-bold text-lg mb-4'>I want to</h3>
          <Link to="/" className='mb-2 hover:text-blue-400 transition text-gray-400'>Find a Doctor</Link>
          <Link to="/about" className='mb-2 hover:text-blue-400 transition text-gray-400'>Request an Appointment</Link>
          <Link to="/services" className='hover:text-blue-400 transition text-gray-400'>Find a Location</Link>
        </div>

        <div className='w-full lg:w-1/5 flex flex-col items-center'>
          <h3 className='font-bold text-lg mb-4'>Support</h3>
          <Link to="/" className='mb-2 hover:text-blue-400 transition text-gray-400'>Donate</Link>
          <Link to="/contact" className='mb-2 hover:text-blue-400 transition text-gray-400'>Contact Us</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
