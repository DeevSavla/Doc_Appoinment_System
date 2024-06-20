import React from 'react'
import Layout from './Layout'
import { Form, Col, Row, TimePicker, Input, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { showloading, hideloading } from '../store/features/alertSlice'
import axios from 'axios'

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
                const res = await axios.post('http://localhost:8080/api/v1/user/apply-doctor',{...values,userId:user._id},{
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem('token')}`
                    }
                })
                dispatch(hideloading())
                if(res.data){
                    message.success('Apply Doctor Successfull.')
                    navigate('/homepage')
                }

                else {
                    message.error('Error while appyling for Doctor.')
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
                <div className="p-6 bg-gray-100 rounded-lg shadow-md max-w-5xl mx-auto">
                    <h1 className="text-center text-3xl font-bold text-gray-800 mb-6">Apply Doctor</h1>
                    <Form
                        layout="vertical"
                        onFinish={handleSubmit}
                        className="bg-white p-6 rounded-lg shadow-sm"
                    >
                        <h4 className="text-xl font-semibold text-gray-700 mb-4">Personal Details:</h4>
                        <Row gutter={20}>
                            <Col xs={24} md={12} lg={8}>
                                <Form.Item
                                    label="First Name"
                                    name="firstName"
                                    rules={[{ required: true, message: 'First name is required' }]}
                                    className="w-full"
                                >
                                    <Input
                                        type="text"
                                        placeholder="Your first name"
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12} lg={8}>
                                <Form.Item
                                    label="Last Name"
                                    name="lastName"
                                    rules={[{ required: true, message: 'Last name is required' }]}
                                    className="w-full"
                                >
                                    <Input
                                        type="text"
                                        placeholder="Your last name"
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12} lg={8}>
                                <Form.Item
                                    label="Phone No"
                                    name="phone"
                                    rules={[{ required: true, message: 'Phone number is required' }]}
                                    className="w-full"
                                >
                                    <Input
                                        type="text"
                                        placeholder="Your contact no"
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12} lg={8}>
                                <Form.Item
                                    label="Email"
                                    name="email"
                                    rules={[{ required: true, message: 'Email is required' }]}
                                    className="w-full"
                                >
                                    <Input
                                        type="email"
                                        placeholder="Your email address"
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12} lg={8}>
                                <Form.Item label="Website" name="website" className="w-full">
                                    <Input
                                        type="text"
                                        placeholder="Your website"
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12} lg={8}>
                                <Form.Item
                                    label="Address"
                                    name="address"
                                    rules={[{ required: true, message: 'Address is required' }]}
                                    className="w-full"
                                >
                                    <Input
                                        type="text"
                                        placeholder="Your clinic address"
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <h4 className="text-xl font-semibold text-gray-700 mt-6 mb-4">Professional Details:</h4>
                        <Row gutter={20}>
                            <Col xs={24} md={12} lg={8}>
                                <Form.Item
                                    label="Specialization"
                                    name="specialization"
                                    rules={[{ required: true, message: 'Specialization is required' }]}
                                    className="w-full"
                                >
                                    <Input
                                        type="text"
                                        placeholder="Your specialization"
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12} lg={8}>
                                <Form.Item
                                    label="Experience"
                                    name="experience"
                                    rules={[{ required: true, message: 'Experience is required' }]}
                                    className="w-full"
                                >
                                    <Input
                                        type="text"
                                        placeholder="Your experience"
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12} lg={8}>
                                <Form.Item
                                    label="Fees Per Consultation"
                                    name="feesPerConsultation"
                                    rules={[{ required: true, message: 'Fees are required' }]}
                                    className="w-full"
                                >
                                    <Input
                                        type="text"
                                        placeholder="Your consultation fee"
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12} lg={8}>
                                <Form.Item
                                    label="Timings"
                                    name="timings"
                                    rules={[{ required: true, message: 'Timings are required' }]}
                                    className="w-full"
                                >
                                    <TimePicker.RangePicker format="HH:mm" className="w-full p-2 border border-gray-300 rounded-md" />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={24} lg={8}>
                                <Form.Item className="w-full">
                                    <button
                                        type="submit"
                                        className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md transition-colors duration-300 mt-7"
                                    >
                                        Submit
                                    </button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </Layout>
        )
    }
}

export default ApplyDoctor