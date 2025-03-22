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
      if (res.data) {
        message.success('Registered Successfully');
        navigate('/')
      } else {
        message.error('Register Issue')
      }
    }
    catch (error) {
      dispatch(hideloading())
      if (error.response.data.message) {
        message.error(error.response.data.message)
      }
      else {
        message.error('Registration Failed')
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full flex bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="w-1/2 hidden md:block bg-blue-50">
          <img
            src={signupImage}
            alt="Healthcare Registration"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="w-full md:w-1/2 p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
            <p className="mt-2 text-sm text-gray-600">Join our healthcare platform</p>
          </div>
          <Form
            name="register"
            className="space-y-4"
            onFinish={handleSubmit}
            layout="vertical"
          >
            <Form.Item
              label={<span className="text-gray-700">Username</span>}
              name="username"
              rules={[{ required: true, message: 'Please enter your username' }]}
            >
              <Input
                prefix={<i className="fas fa-user text-gray-400" />}
                className="rounded-lg py-2"
                placeholder="Enter your username"
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-gray-700">Email Address</span>}
              name="email"
              rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Please enter a valid email' }
              ]}
            >
              <Input
                prefix={<i className="fas fa-envelope text-gray-400" />}
                className="rounded-lg py-2"
                placeholder="Enter your email"
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-gray-700">Password</span>}
              name="password"
              rules={[
                { required: true, message: 'Please enter your password' },
                { min: 6, message: 'Password must be at least 6 characters' }
              ]}
            >
              <Input.Password
                prefix={<i className="fas fa-lock text-gray-400" />}
                className="rounded-lg py-2"
                placeholder="Create a password"
              />
            </Form.Item>

            <div className="flex items-center justify-between mt-6">
              <Link to="/login" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                Already have an account?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 mt-6"
            >
              Create Account
            </button>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Register