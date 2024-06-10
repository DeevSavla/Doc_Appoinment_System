import React from 'react'
import {Form, Input} from 'antd'
import { Link } from 'react-router-dom'


function Register() {

  function handleSubmit(values){
    console.log(values)
  }

  return (
    <Form className='w-1/3 mx-auto border border-black p-3 my-36' onFinish={handleSubmit}>
      <h1 className='text-center text-2xl mb-5 shadow-md p-2'>Register Form</h1>
      <Form.Item label='Username' name='Username'>
        <Input type='text' required/>
      </Form.Item>
      <Form.Item label='Email' name='Email'>
        <Input type='email' required/>
      </Form.Item>
      <Form.Item label='Password' name='Password'>
        <Input type='password' required/>
      </Form.Item>
      <div className='flex justify-between text-center'>
      <Link to='/login' className='text-blue-500 hover:text-blue-800'>Already registered?</Link>
      <button className='bg-blue-500 text-white border-black px-2 py-1 rounded-lg'>Register</button>
      </div>
    </Form>
  )
}

export default Register