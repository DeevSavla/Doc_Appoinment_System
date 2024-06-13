import React from 'react'
import { Form, Input, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { showloading, hideloading } from '../store/features/alertSlice'
import signupImage from '../photos/signup.gif'

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
<div className='flex justify-center items-center h-screen w-11/12 sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto mb-4'>
  <div className='flex flex-col md:flex-row bg-white shadow-md rounded-lg overflow-hidden w-full'>
    <img src={signupImage} alt='Register' className='w-full md:w-2/5 h-48 md:h-auto object-cover' />
    <Form className="w-full md:w-3/5 p-6 flex flex-col justify-center" onFinish={handleSubmit}>
      <h1 className="text-center text-xl mb-4 text-blue-600">Register Form</h1>
      <Form.Item label="Username" name="username" className="mb-4">
        <Input type="text" required className="text-sm p-2 border rounded-md" />
      </Form.Item>
      <Form.Item label="Email" name="email" className="mb-4">
        <Input type="email" required className="text-sm p-2 border rounded-md" />
      </Form.Item>
      <Form.Item label="Password" name="password" className="mb-4">
        <Input type="password" required className="text-sm p-2 border rounded-md" />
      </Form.Item>
      <div className="flex justify-between items-center mt-4">
        <Link to="/login" className="text-blue-600 hover:text-blue-800 text-sm">Already registered?</Link>
        <button className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-500 text-sm">Register</button>
      </div>
    </Form>
  </div>
</div>

  )
}

export default Register