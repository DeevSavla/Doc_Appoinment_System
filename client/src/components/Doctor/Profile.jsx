import React, { useEffect, useState } from 'react'
import Layout from '../Layout'
import Spinner from '../Spinner'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Form, Col, Row, TimePicker, Input, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { showloading, hideloading } from '../../store/features/alertSlice'


function Profile() {

  const { user } = useSelector(state => state.user)

  if (!user) {
    return (<Spinner />)
  }

  else {

    const [doctor, setDoctor] = useState(null)
    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSubmit = async (values) => {
      try {
        dispatch(showloading())
        const res = await axios.post('http://localhost:8080/api/v1/doctor/update-doctor-profile', 
          { ...values, userId: user._id }, 
          {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        dispatch(hideloading())
        if (res.data) {
          message.success('Doctor Update Successfull.')
          navigate('/homepage')
        }

        else {
          message.error('Error while updating for Doctor.')
        }


      } catch (error) {
        dispatch(hideloading())
        if (error.response.data.message) {
          message.error(error.response.data.message)
        }
        else {
          message.error('Doctor Update Failed.')
        }
      }
    }

    const getDoctorInfo = async (req,res) => {
      try {
        const res = await axios.post('http://localhost:8080/api/v1/doctor/get-doctor-info',
          {
            userId: params.id
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
        if (res.data) {
          setDoctor(res.data.data)
        }

      } catch (error) {
        if (error.response.data.message) {
          message.error(error.response.data.message)
        }
        else {
          message.error('Doctor Data Error.')
        }
      }
    }

    useEffect(()=>{
      getDoctorInfo()
    },[])

    return (
      <Layout>
        {doctor && (
          <Form
            layout="vertical"
            onFinish={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-sm"
            initialValues={doctor}
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
                  <Input
                    type="text"
                    placeholder="Your timings"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Form.Item className="w-full">
                  <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md transition-colors duration-300 mt-7"
                  >
                    Update
                  </button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        )}
      </Layout>
    )
  }
}

export default Profile