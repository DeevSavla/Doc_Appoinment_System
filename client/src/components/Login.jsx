import React from 'react'
import { Form, Input,message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Login() {

  const navigate = useNavigate()

  const handleSubmit = async (values) => {
    console.log(values)
    try {
      const res = await axios.post('http://localhost:8080/api/v1/user/login', values)

      if (res.data) {
        message.success('Login Successful.')
        navigate('/')
      }
      else {
        message.error('Login Issue')
      }
    }
    catch (error) {
      console.log(error)
      message.error('Login Failed')
    }
  }

  return (
    <Form className='w-1/3 mx-auto border border-black p-3 my-36' onFinish={handleSubmit}>
      <h1 className='text-center text-2xl mb-5 shadow-md p-2'>Login Form</h1>
      <Form.Item label='Email' name='email'>
        <Input type='email' required />
      </Form.Item>
      <Form.Item label='Password' name='password'>
        <Input type='password' required />
      </Form.Item>
      <div className='flex justify-between text-center'>
        <Link to='/register' className='text-blue-500 hover:text-blue-800'>Not registered?</Link>
        <button className='bg-blue-500 text-white border-black px-2 py-1 rounded-lg'>Login</button>
      </div>
    </Form>
  )
}

export default Login