import React from 'react'
import Layout from './Layout'
import { Form, Col, Row, TimePicker, Input, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { showloading, hideloading } from '../store/features/alertSlice'
import axios from 'axios'
import {baseUrl} from '../utilities/baseUrl'
import Spinner from './Spinner'

function ApplyDoctor() {
    const { user } = useSelector(state => state.user)

    if (!user) {
        return (<Spinner />)
    }

    else {
        const navigate = useNavigate()
        const dispatch = useDispatch()

        const handleSubmit = async (values) => {
            try {
                dispatch(showloading())
                const res = await axios.post(`${baseUrl}/user/apply-doctor`, { ...values, userId: user._id }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                dispatch(hideloading())
                if (res.data) {
                    message.success('Apply Doctor Successful.')
                    navigate('/homepage')
                }
                else {
                    message.error('Error while applying for Doctor.')
                }
            } catch (error) {
                dispatch(hideloading())
                if (error.response.data.message) {
                    message.error(error.response.data.message)
                }
                else {
                    message.error('Doctor Application Failed.')
                }
            }
        }

        return (
            <Layout>
                <div className="max-w-6xl mx-auto">
                    <div className="mb-10 text-center">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Apply as a Doctor</h1>
                        <div className="h-1 w-16 bg-gradient-to-r from-blue-600 to-teal-500 mx-auto rounded-full mb-4"></div>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Join our network of healthcare professionals and help patients receive quality care.
                            Please fill out the form below with your details.
                        </p>
                    </div>
                    
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-600 to-teal-500 py-4 px-6">
                            <h2 className="text-white text-xl font-semibold">Doctor Application Form</h2>
                        </div>
                        
                        <Form
                            layout="vertical"
                            onFinish={handleSubmit}
                            className="p-6 md:p-8"
                        >
                            <div className="mb-8">
                                <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                                    <i className="fas fa-user-circle mr-2 text-blue-600"></i>
                                    Personal Details
                                </h3>
                                <Row gutter={20}>
                                    <Col xs={24} md={12} lg={8}>
                                        <Form.Item
                                            label={<span className="text-gray-700 font-medium">First Name</span>}
                                            name="firstName"
                                            rules={[{ required: true, message: 'First name is required' }]}
                                            className="w-full"
                                        >
                                            <Input
                                                prefix={<i className="fas fa-user text-blue-500 opacity-70 mr-2"></i>}
                                                type="text"
                                                placeholder="Your first name"
                                                className="py-2 px-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200 border-0 shadow-sm"
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} md={12} lg={8}>
                                        <Form.Item
                                            label={<span className="text-gray-700 font-medium">Last Name</span>}
                                            name="lastName"
                                            rules={[{ required: true, message: 'Last name is required' }]}
                                            className="w-full"
                                        >
                                            <Input
                                                prefix={<i className="fas fa-user text-blue-500 opacity-70 mr-2"></i>}
                                                type="text"
                                                placeholder="Your last name"
                                                className="py-2 px-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200 border-0 shadow-sm"
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} md={12} lg={8}>
                                        <Form.Item
                                            label={<span className="text-gray-700 font-medium">Phone Number</span>}
                                            name="phone"
                                            rules={[{ required: true, message: 'Phone number is required' }]}
                                            className="w-full"
                                        >
                                            <Input
                                                prefix={<i className="fas fa-phone-alt text-blue-500 opacity-70 mr-2"></i>}
                                                type="text"
                                                placeholder="Your contact number"
                                                className="py-2 px-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200 border-0 shadow-sm"
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} md={12} lg={8}>
                                        <Form.Item
                                            label={<span className="text-gray-700 font-medium">Email Address</span>}
                                            name="email"
                                            rules={[
                                                { required: true, message: 'Email is required' },
                                                { type: 'email', message: 'Please enter a valid email' }
                                            ]}
                                            className="w-full"
                                        >
                                            <Input
                                                prefix={<i className="fas fa-envelope text-blue-500 opacity-70 mr-2"></i>}
                                                type="email"
                                                placeholder="Your email address"
                                                className="py-2 px-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200 border-0 shadow-sm"
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} md={12} lg={8}>
                                        <Form.Item 
                                            label={<span className="text-gray-700 font-medium">Website</span>}
                                            name="website" 
                                            className="w-full"
                                        >
                                            <Input
                                                prefix={<i className="fas fa-globe text-blue-500 opacity-70 mr-2"></i>}
                                                type="text"
                                                placeholder="Your website (optional)"
                                                className="py-2 px-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200 border-0 shadow-sm"
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} md={12} lg={8}>
                                        <Form.Item
                                            label={<span className="text-gray-700 font-medium">Address</span>}
                                            name="address"
                                            rules={[{ required: true, message: 'Address is required' }]}
                                            className="w-full"
                                        >
                                            <Input
                                                prefix={<i className="fas fa-map-marker-alt text-blue-500 opacity-70 mr-2"></i>}
                                                type="text"
                                                placeholder="Your clinic address"
                                                className="py-2 px-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200 border-0 shadow-sm"
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </div>
                            
                            <div className="mt-8">
                                <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                                    <i className="fas fa-stethoscope mr-2 text-blue-600"></i>
                                    Professional Details
                                </h3>
                                <Row gutter={20}>
                                    <Col xs={24} md={12} lg={8}>
                                        <Form.Item
                                            label={<span className="text-gray-700 font-medium">Specialization</span>}
                                            name="specialization"
                                            rules={[{ required: true, message: 'Specialization is required' }]}
                                            className="w-full"
                                        >
                                            <Input
                                                prefix={<i className="fas fa-user-md text-blue-500 opacity-70 mr-2"></i>}
                                                type="text"
                                                placeholder="Your specialization"
                                                className="py-2 px-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200 border-0 shadow-sm"
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} md={12} lg={8}>
                                        <Form.Item
                                            label={<span className="text-gray-700 font-medium">Experience (years)</span>}
                                            name="experience"
                                            rules={[{ required: true, message: 'Experience is required' }]}
                                            className="w-full"
                                        >
                                            <Input
                                                prefix={<i className="fas fa-briefcase text-blue-500 opacity-70 mr-2"></i>}
                                                type="text"
                                                placeholder="Your experience in years"
                                                className="py-2 px-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200 border-0 shadow-sm"
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} md={12} lg={8}>
                                        <Form.Item
                                            label={<span className="text-gray-700 font-medium">Consultation Fee ($)</span>}
                                            name="feesPerConsultation"
                                            rules={[{ required: true, message: 'Consultation fee is required' }]}
                                            className="w-full"
                                        >
                                            <Input
                                                prefix={<i className="fas fa-dollar-sign text-blue-500 opacity-70 mr-2"></i>}
                                                type="text"
                                                placeholder="Your consultation fee"
                                                className="py-2 px-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200 border-0 shadow-sm"
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} md={12} lg={8}>
                                        <Form.Item
                                            label={<span className="text-gray-700 font-medium">Available Timings</span>}
                                            name="timings"
                                            rules={[{ required: true, message: 'Timings are required' }]}
                                            className="w-full"
                                        >
                                            <Input
                                                prefix={<i className="fas fa-clock text-blue-500 opacity-70 mr-2"></i>}
                                                type="text"
                                                placeholder="e.g. 9:00 AM - 5:00 PM"
                                                className="py-2 px-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200 border-0 shadow-sm"
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} md={24} lg={24} className="mt-6">
                                        <div className="flex justify-end">
                                            <button
                                                type="submit"
                                                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white rounded-lg shadow-md transition-all duration-200 font-medium flex items-center"
                                            >
                                                <i className="fas fa-paper-plane mr-2"></i>
                                                Submit Application
                                            </button>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Form>
                    </div>
                    
                    <div className="mt-8 bg-blue-50 rounded-xl p-6 shadow-sm border border-blue-100">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                            <i className="fas fa-info-circle text-blue-600 mr-2"></i>
                            What happens next?
                        </h3>
                        <p className="text-gray-600">
                            After submitting your application, our team will review your details. You'll receive 
                            a notification once your application is approved. This process typically takes 1-3 business days.
                        </p>
                    </div>
                </div>
            </Layout>
        )
    }
}

export default ApplyDoctor