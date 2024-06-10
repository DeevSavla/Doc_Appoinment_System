import React from 'react'
import {Form,Input} from 'antd'
import { Link } from 'react-router-dom'

function Login() {

  function handleSubmit(values){
    console.log(values)
  }

  return (
    <Form className='w-1/3 mx-auto border border-black p-3 my-36' onFinish={handleSubmit}>
      <h1 className='text-center text-2xl mb-5 shadow-md p-2'>Login Form</h1>
      <Form.Item label='Email' name='Email'>
        <Input type='email' required/>
      </Form.Item>
      <Form.Item label='Password' name='Password'>
        <Input type='password' required/>
      </Form.Item>
      <div className='flex justify-between text-center'>
      <Link to='/register' className='text-blue-500 hover:text-blue-800'>Not registered?</Link>
      <button className='bg-blue-500 text-white border-black px-2 py-1 rounded-lg'>Login</button>
      </div>
    </Form>
  )
}

export default Login