import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { message } from 'antd'

function BookingPage() {

  const params = useParams()
  const [singleDoctor,setSingleDoctor] = useState(null)
  const getDoctor = async (req,res)=>{
    try {
      const res = await axios.post('http://localhost:8080/api/v1/doctor/get-single-doctor',
        {doctorId:params.doctorId},
        {
          headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`
          }
        }
      )

      if(res.data) {
        console.log(res.data.data)
        setSingleDoctor(res.data.data)
        message.success('Doctor Fetched.')
      } else {
        message.error('Error while fetching doctor.')
      }
    } catch (error) {
      if (error.response.data.message) {
        message.error(error.response.data.message)
      }
    }
  }

  useEffect(()=>{
    getDoctor()
  },[])

  return (
    <Layout><div>BookingPage</div></Layout>
  )
}

export default BookingPage