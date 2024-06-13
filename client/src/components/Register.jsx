import React from 'react'
import { Form, Input, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { showloading,hideloading } from '../store/features/alertSlice'

function Register() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (values) => {
    try {
      dispatch(showloading())
      const res = await axios.post('http://localhost:8080/api/v1/user/register', values)
      dispatch(hideloading())
      if (res.data) {
        message.success('Registered Successfully')
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
    <Form className="w-1/3 mx-auto bg-white shadow-md rounded-lg p-6 my-36" onFinish={handleSubmit}>
    <h1 className="text-center text-2xl mb-5 text-teal-600">Register Form</h1>
    <Form.Item label="Username" name="username">
      <Input type="text" required />
    </Form.Item>
    <Form.Item label="Email" name="email">
      <Input type="email" required />
    </Form.Item>
    <Form.Item label="Password" name="password">
      <Input type="password" required />
    </Form.Item>
    <div className="flex justify-between">
      <Link to="/login" className="text-teal-600 hover:text-teal-800">Already registered?</Link>
      <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-500">Register</button>
    </div>
  </Form>
  )
}

export default Register