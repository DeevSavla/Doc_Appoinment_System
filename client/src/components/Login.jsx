import React from 'react'
import { Form, Input, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { showloading, hideloading } from '../store/features/alertSlice'
import {baseUrl} from '../utilities/baseUrl'
import hero2 from '../photos/hero-img02.png'

function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (values) => {
    try {
      dispatch(showloading())
      const res = await axios.post(`${baseUrl}/user/login`, values)
      dispatch(hideloading())
      
      // Check if response exists and has data property
      if (res && res.data && res.data.success) {
        const { token } = res.data.data || {}
        if (token) {
          localStorage.setItem("token", token)
          message.success('Login Successful.')
          navigate('/homepage')
        } else {
          message.error('Invalid response: No token received')
        }
      } else {
        // If response exists but success is false
        message.error(res?.data?.message || 'Login failed')
      }
    }
    catch (error) {
      dispatch(hideloading())
      console.error('Login error:', error)
      
      // Safe error handling without assuming error.response.data exists
      if (error.response && error.response.data && error.response.data.message) {
        message.error(error.response.data.message)
      } else if (error.message) {
        message.error(`Error: ${error.message}`)
      } else {
        message.error('Login failed. Please try again.')
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-teal-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full flex bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-[1.01] transition-transform duration-300">
        <div className="w-1/2 hidden md:block relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-teal-300/20 z-10"></div>
          <img
            src={hero2}
            alt="Healthcare"
            className="object-cover w-full h-full"
          />
          <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-blue-900/90 to-transparent text-white z-20">
            <h3 className="text-2xl font-bold mb-2">Welcome to MediCare</h3>
            <p className="text-sm opacity-90">Your trusted healthcare partner for a healthier tomorrow</p>
          </div>
        </div>
        <div className="w-full md:w-1/2 p-8 sm:p-12">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">Welcome Back</h2>
            <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-teal-400 mx-auto rounded-full mb-6"></div>
            <p className="text-gray-600">Sign in to access your healthcare dashboard</p>
          </div>
          <Form
            name="login"
            className="space-y-6"
            onFinish={handleSubmit}
            layout="vertical"
          >
            <Form.Item
              label={<span className="text-gray-700 font-medium">Email Address</span>}
              name="email"
              rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Please enter a valid email' }
              ]}
            >
              <Input 
                prefix={<i className="fas fa-envelope text-blue-500 opacity-70"></i>}
                className="rounded-lg py-3 px-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 border-0 shadow-sm"
                placeholder="Enter your email"
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-gray-700 font-medium">Password</span>}
              name="password"
              rules={[{ required: true, message: 'Please enter your password' }]}
            >
              <Input.Password 
                prefix={<i className="fas fa-lock text-blue-500 opacity-70"></i>}
                className="rounded-lg py-3 px-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 border-0 shadow-sm"
                placeholder="Enter your password"
              />
            </Form.Item>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
              <Link to="/register" className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200">
                Create new account
              </Link>
              <Link to="/changepass" className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg text-white bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 mt-8 font-medium text-lg shadow-md"
            >
              <i className="fas fa-sign-in-alt mr-2"></i>
              Sign In
            </button>
          </Form>

          <div className="mt-10 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center">
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-blue-100 hover:text-blue-600 transition-all duration-200">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-blue-100 hover:text-blue-600 transition-all duration-200">
                  <i className="fab fa-google"></i>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-blue-100 hover:text-blue-600 transition-all duration-200">
                  <i className="fab fa-apple"></i>
                </a>
              </div>
            </div>
            <p className="text-center text-sm text-gray-600 mt-4">
              Need help? Contact our support team at <span className="text-blue-600">support@medicare.com</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login