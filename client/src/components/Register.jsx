import React from 'react'
import { Form, Input, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { showloading, hideloading } from '../store/features/alertSlice'
import signupImage from '../photos/signup.gif'
import {baseUrl} from '../utilities/baseUrl'

function Register() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (values) => {
    try {
      localStorage.clear()
      dispatch(showloading())
      const res = await axios.post(`${baseUrl}/user/register`, values)
      dispatch(hideloading())
      
      // Check if response exists and has data property
      if (res && res.data && res.data.success) {
        message.success('Registered Successfully');
        navigate('/')
      } else {
        // If response exists but success is false
        message.error(res?.data?.message || 'Registration failed')
      }
    }
    catch (error) {
      dispatch(hideloading())
      console.error('Registration error:', error)
      
      // Safe error handling without assuming error.response.data exists
      if (error.response && error.response.data && error.response.data.message) {
        message.error(error.response.data.message)
      } else if (error.message) {
        message.error(`Error: ${error.message}`)
      } else {
        message.error('Registration failed. Please try again.')
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-teal-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full flex bg-white rounded-xl shadow-xl overflow-hidden transform hover:scale-[1.01] transition-transform duration-300">
        <div className="w-1/2 hidden md:block relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-teal-300/20 z-10"></div>
          <img
            src={signupImage}
            alt="Healthcare Registration"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-blue-900/90 via-blue-900/50 to-transparent text-white z-20">
            <h3 className="text-2xl font-bold mb-2">Join Our Healthcare Platform</h3>
            <p className="text-sm opacity-90 mb-6">Access quality healthcare services and professionals</p>
          </div>
        </div>
        <div className="w-full md:w-1/2 p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
            <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-teal-400 mx-auto rounded-full my-4"></div>
            <p className="text-gray-600">Join our healthcare platform today</p>
          </div>
          <Form
            name="register"
            className="space-y-4"
            onFinish={handleSubmit}
            layout="vertical"
          >
            <Form.Item
              label={<span className="text-gray-700 font-medium">Username</span>}
              name="username"
              rules={[{ required: true, message: 'Please enter your username' }]}
            >
              <Input
                prefix={<i className="fas fa-user text-blue-500 opacity-70"></i>}
                className="rounded-lg py-2 px-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 border-0 shadow-sm"
                placeholder="Enter your username"
              />
            </Form.Item>

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
                className="rounded-lg py-2 px-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 border-0 shadow-sm"
                placeholder="Enter your email"
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-gray-700 font-medium">Password</span>}
              name="password"
              rules={[
                { required: true, message: 'Please enter your password' },
                { min: 6, message: 'Password must be at least 6 characters' }
              ]}
            >
              <Input.Password
                prefix={<i className="fas fa-lock text-blue-500 opacity-70"></i>}
                className="rounded-lg py-2 px-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 border-0 shadow-sm"
                placeholder="Create a password"
              />
            </Form.Item>

            <div className="flex items-center justify-between mt-6">
              <Link to="/login" className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200">
                Already have an account?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 mt-6"
            >
              <i className="fas fa-user-plus mr-2"></i>
              Create Account
            </button>
          </Form>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-center text-xs text-gray-500">
              By creating an account, you agree to our
              <a href="#" className="text-blue-600 hover:text-blue-800 ml-1">Terms of Service</a> and
              <a href="#" className="text-blue-600 hover:text-blue-800 ml-1">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register