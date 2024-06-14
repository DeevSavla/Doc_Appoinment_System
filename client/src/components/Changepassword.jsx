import React from 'react'
import { Form, Input, message } from 'antd'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { showloading,hideloading } from '../store/features/alertSlice'

function Changepassword() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = async (values) => {
        try {
            dispatch(showloading())
            const res = await axios.post('http://localhost:8080/api/v1/user/changepassword', values)
            dispatch(hideloading())
            message.success('Password Changed.')
            navigate('/login')
        }
        catch (error) {
            dispatch(hideloading())
            if (error.response.data.message) {
                message.error(error.response.data.message)
            }
        }
    }

    return (
        <Form className="w-1/3 mx-auto bg-white shadow-md rounded-lg p-6 my-36" onFinish={handleSubmit}>
      <h1 className="text-center text-2xl mb-5 text-blue-600">Change Password</h1>
      <Form.Item label="Email" name="email">
        <Input type="email" required />
      </Form.Item>
      <Form.Item label="New Password" name="newpassword">
        <Input type="password" required />
      </Form.Item>
      <Form.Item label="Confirm New Password" name="confirmpassword">
        <Input type="password" required />
      </Form.Item>
      <div className="flex justify-between">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 flex-grow">Submit</button>
      </div>
    </Form>
    )
}

export default Changepassword