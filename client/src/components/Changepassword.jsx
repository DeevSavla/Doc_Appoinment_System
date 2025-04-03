import React from 'react'
import { Form, Input, message } from 'antd'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { showloading, hideloading } from '../store/features/alertSlice'
import {baseUrl} from '../utilities/baseUrl'

function Changepassword() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = async (values) => {
        try {
            dispatch(showloading())
            const res = await axios.post(`${baseUrl}/user/changepassword`, values)
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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-teal-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl w-full flex bg-white rounded-xl shadow-xl overflow-hidden transform hover:scale-[1.01] transition-transform duration-300">
                <div className="w-1/2 hidden md:block relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-teal-300/20 z-10"></div>
                    <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-blue-900/90 via-blue-900/50 to-transparent text-white z-20">
                        <h3 className="text-2xl font-bold mb-2">Reset Your Password</h3>
                        <p className="text-sm opacity-90 mb-6">Secure your account with a new password</p>
                    </div>
                </div>
                
                <div className="w-full md:w-1/2 p-8">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-800">Change Password</h2>
                        <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-teal-400 mx-auto rounded-full my-4"></div>
                        <p className="text-gray-600">Enter your email and new password</p>
                    </div>
                    
                    <Form 
                        name="passwordReset"
                        className="space-y-4"
                        onFinish={handleSubmit}
                        layout="vertical"
                    >
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
                                type="email" 
                            />
                        </Form.Item>
                        
                        <Form.Item
                            label={<span className="text-gray-700 font-medium">New Password</span>}
                            name="newpassword"
                            rules={[
                                { required: true, message: 'Please enter your new password' },
                                { min: 6, message: 'Password must be at least 6 characters' }
                            ]}
                        >
                            <Input.Password 
                                prefix={<i className="fas fa-lock text-blue-500 opacity-70"></i>}
                                className="rounded-lg py-2 px-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 border-0 shadow-sm"
                                placeholder="Enter new password" 
                            />
                        </Form.Item>
                        
                        <Form.Item
                            label={<span className="text-gray-700 font-medium">Confirm New Password</span>}
                            name="confirmpassword"
                            dependencies={['newpassword']}
                            rules={[
                                { required: true, message: 'Please confirm your new password' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('newpassword') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('The two passwords do not match'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password 
                                prefix={<i className="fas fa-lock text-blue-500 opacity-70"></i>}
                                className="rounded-lg py-2 px-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 border-0 shadow-sm"
                                placeholder="Confirm new password" 
                            />
                        </Form.Item>
                        
                        <div className="flex justify-between items-center pt-2">
                            <Link to="/login" className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200">
                                Back to login
                            </Link>
                            
                            <button
                                type="submit"
                                className="flex justify-center items-center py-2 px-6 border border-transparent rounded-lg shadow-md text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                            >
                                <i className="fas fa-key mr-2"></i>
                                Reset Password
                            </button>
                        </div>
                    </Form>
                    
                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <p className="text-center text-xs text-gray-500">
                            Need help? Contact our support team at <span className="text-blue-600">support@medicare.com</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Changepassword