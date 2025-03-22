import React from 'react'
import hero1 from '../photos/hero-img01.png'
import hero2 from '../photos/hero-img02.png'
import hero3 from '../photos/hero-img03.png'
import { useNavigate } from 'react-router-dom'

function MainPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 lg:mt-16 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Your Health Is Our</span>
                  <span className="block text-blue-600">Top Priority</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Get connected with the best medical professionals and receive quality healthcare services from the comfort of your home.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <button
                      onClick={() => navigate('/login')}
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                    >
                      Get Started
                    </button>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <button
                      onClick={() => navigate('/register')}
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10"
                    >
                      Sign Up
                    </button>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-3/5 flex items-center justify-center">
          <div className="relative h-64 sm:h-72 md:h-96 lg:h-full w-full">
            <img
              className="absolute inset-0 w-full h-full object-contain"
              src={hero1}
              alt="Doctor caring for patient"
            />
          </div>
        </div>

      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Our Services</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              A better way to receive medical care
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Choose from our wide range of medical services and experienced doctors
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="relative bg-white p-6 rounded-lg shadow-lg">
                <div className="text-center">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto">
                    <i className="fas fa-user-md text-xl"></i>
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">Expert Doctors</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Connect with experienced and qualified medical professionals
                  </p>
                </div>
              </div>

              <div className="relative bg-white p-6 rounded-lg shadow-lg">
                <div className="text-center">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto">
                    <i className="fas fa-calendar-check text-xl"></i>
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">Easy Appointments</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Book appointments with just a few clicks
                  </p>
                </div>
              </div>

              <div className="relative bg-white p-6 rounded-lg shadow-lg">
                <div className="text-center">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto">
                    <i className="fas fa-clock text-xl"></i>
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">24/7 Support</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Round-the-clock medical assistance and support
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="bg-blue-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 lg:grid-cols-3">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6 text-center">
                <dt className="text-4xl font-extrabold text-blue-600">30+</dt>
                <dd className="mt-1 text-gray-900 text-sm">Years of Experience</dd>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6 text-center">
                <dt className="text-4xl font-extrabold text-blue-600">15+</dt>
                <dd className="mt-1 text-gray-900 text-sm">Clinic Locations</dd>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6 text-center">
                <dt className="text-4xl font-extrabold text-blue-600">100%</dt>
                <dd className="mt-1 text-gray-900 text-sm">Patient Satisfaction</dd>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainPage