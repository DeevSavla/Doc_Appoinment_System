import React from 'react'
import { Form, Input, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { showloading, hideloading } from '../store/features/alertSlice'
import {baseUrl} from '../utilities/baseUrl'

function Login() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (values) => {
    try {
      dispatch(showloading())
      const res = await axios.post(`${baseUrl}/user/login`, values)
      dispatch(hideloading())
      if (res.data) {
        const { token } = res.data.data
        localStorage.setItem("token", token)
        message.success('Login Successful.')
        navigate('/homepage')
      }
      else {
        message.error('Login Issue')
      }
    }
    catch (error) {
      dispatch(hideloading())
      if (error.response.data.message) {
        message.error(error.response.data.message)
      }
      else {
        message.error('Login Failed')
      }
    }
  }

  return (
    <Form className="w-full max-w-md mx-auto bg-white shadow-md rounded-lg p-6 my-12 sm:my-24 md:my-36" onFinish={handleSubmit}>
      <h1 className="text-center text-2xl mb-5 text-blue-600">Login Form</h1>
      <Form.Item label="Email" name="email" className="w-full">
        <Input type="email" required className="w-full" />
      </Form.Item>
      <Form.Item label="Password" name="password" className="w-full">
        <Input type="password" required className="w-full" />
      </Form.Item>
      <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
        <Link to="/register" className="text-blue-600 hover:text-blue-800 mb-2 sm:mb-0">Not registered?</Link>
        <Link to="/changepass" className="text-blue-600 hover:text-blue-800 mb-2 sm:mb-0">Forgot Password?</Link>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 mt-2 sm:mt-0">Login</button>
      </div>
    </Form>

  )
}

export default Login