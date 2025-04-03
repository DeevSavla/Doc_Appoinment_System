import React from 'react'
import hero1 from '../photos/hero-img01.png'
import hero2 from '../photos/hero-img02.png'
import hero3 from '../photos/hero-img03.png'
import { useNavigate } from 'react-router-dom'

function MainPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Animation */}
      <div className="relative bg-gradient-to-r from-blue-50 to-teal-50 overflow-hidden flex items-center">
  <div className="relative z-10 py-10 sm:py-12 md:py-14 lg:w-full px-8 sm:px-16 lg:px-24">
    <svg
      className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
      fill="currentColor"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <polygon points="50,0 100,0 50,100 0,100" />
    </svg>

    <main className="mt-6 max-w-7xl mx-auto sm:mt-8 lg:mt-10 xl:mt-14">
      <div className="text-center lg:text-left">
        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          <span className="block">Your Health Is Our</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
            Top Priority
          </span>
        </h1>
        <p className="mt-2 text-base text-gray-500 sm:mt-3 sm:text-lg md:mt-3 md:text-xl">
          Get connected with the best medical professionals and receive quality healthcare services from the comfort of your home.
        </p>
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-4">
          <button
            onClick={() => navigate('/login')}
            className="w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 shadow-md md:py-4 md:text-lg md:px-10 transition-all duration-200"
          >
            <i className="fas fa-sign-in-alt mr-2"></i>
            Get Started
          </button>
          <button
            onClick={() => navigate('/register')}
            className="w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-blue-600 text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 md:py-4 md:text-lg md:px-10 transition-all duration-200"
          >
            <i className="fas fa-user-plus mr-2"></i>
            Sign Up
          </button>
        </div>
      </div>
    </main>
  </div>
</div>



      {/* Features Section with Cards */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <p className="text-base text-blue-600 font-semibold tracking-wide uppercase">Our Services</p>
            <h2 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Quality Healthcare Made Simple
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Choose from our wide range of medical services and experienced doctors
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white overflow-hidden shadow-xl rounded-xl hover:shadow-2xl transition-all duration-300">
                <div className="p-6">
                  <div className="w-12 h-12 rounded-md bg-gradient-to-r from-blue-600 to-teal-500 text-white flex items-center justify-center mb-5">
                    <i className="fas fa-user-md text-xl"></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Expert Doctors</h3>
                  <p className="text-gray-600">
                    Connect with experienced and qualified medical professionals in various specialties
                  </p>
                  <div className="mt-4">
                    <a href="#" className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
                      Learn more
                      <i className="fas fa-arrow-right ml-2 text-sm"></i>
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow-xl rounded-xl hover:shadow-2xl transition-all duration-300">
                <div className="p-6">
                  <div className="w-12 h-12 rounded-md bg-gradient-to-r from-blue-600 to-teal-500 text-white flex items-center justify-center mb-5">
                    <i className="fas fa-calendar-check text-xl"></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Easy Appointments</h3>
                  <p className="text-gray-600">
                    Book appointments online with just a few clicks and manage your schedule easily
                  </p>
                  <div className="mt-4">
                    <a href="#" className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
                      Learn more
                      <i className="fas fa-arrow-right ml-2 text-sm"></i>
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow-xl rounded-xl hover:shadow-2xl transition-all duration-300">
                <div className="p-6">
                  <div className="w-12 h-12 rounded-md bg-gradient-to-r from-blue-600 to-teal-500 text-white flex items-center justify-center mb-5">
                    <i className="fas fa-clock text-xl"></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">24/7 Support</h3>
                  <p className="text-gray-600">
                    Round-the-clock medical assistance and support whenever you need it
                  </p>
                  <div className="mt-4">
                    <a href="#" className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
                      Learn more
                      <i className="fas fa-arrow-right ml-2 text-sm"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* CTA Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-teal-500 rounded-2xl shadow-xl overflow-hidden">
            <div className="px-6 py-12 md:py-16 md:px-12 lg:px-16 lg:py-20 text-center text-white">
              <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
                Ready to prioritize your health?
              </h2>
              <p className="mt-4 text-lg">
                Join thousands of satisfied patients who trust MediCare for their healthcare needs.
              </p>
              <div className="mt-8 flex justify-center gap-4">
                <button
                  onClick={() => navigate('/register')}
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 md:text-lg transition-all duration-200"
                >
                  <i className="fas fa-user-plus mr-2"></i>
                  Create Account
                </button>
                <button
                  onClick={() => navigate('/contact')}
                  className="inline-flex items-center justify-center px-5 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white/10 md:text-lg transition-all duration-200"
                >
                  <i className="fas fa-phone-alt mr-2"></i>
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainPage