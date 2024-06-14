import React from 'react'
import { Form, Input, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { showloading,hideloading } from '../store/features/alertSlice'

function Login() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (values) => {
    try {
      dispatch(showloading())
      const res = await axios.post('http://localhost:8080/api/v1/user/login', values)
      dispatch(hideloading())
      console.log(res)
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
      <Form className="w-1/3 mx-auto bg-white shadow-md rounded-lg p-6 my-36" onFinish={handleSubmit}>
    <h1 className="text-center text-2xl mb-5 text-blue-600">Login Form</h1>
    <Form.Item label="Email" name="email">
      <Input type="email" required />
    </Form.Item>
    <Form.Item label="Password" name="password">
      <Input type="password" required />
    </Form.Item>
    <div className="flex justify-between">
      <Link to="/register" className="text-blue-600 hover:text-blue-800">Not registered?</Link>
      <Link to="/changepass" className="text-blue-600 hover:text-blue-800">Forgot Password?</Link>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500">Login</button>
    </div>
  </Form>
  )
}

export default Login