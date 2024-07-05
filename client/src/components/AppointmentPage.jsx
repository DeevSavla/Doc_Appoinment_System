import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Layout from './Layout'
import {message} from 'antd'
import { useParams } from 'react-router-dom'

function AppointmentPage() {

    const params = useParams()
    const [appointments,setAppointments] = useState(null)

    const getAppointments = async (req, res)=>{
        try{
            const res = await axios.post('http://localhost:8080/api/v1/doctor/get-all-appointments',
                {
                    doctorId:params.doctorId
                },
                {
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem('token')}`
                    }
                }
            )

            if(res.data){
                setAppointments(res.data.data)
                message.success('Appointments Fetched.')
            }

        } 
        catch(error) {
            if(error.response.data.message){
                message.error(error.response.data.message)
            } else {
                message.error('Error while fetching apppointments.')
            }
        }
    }

    useEffect(() => {
        getAppointments()
    }, [])


    return (
        <Layout>
            <div>AppointmentPage</div>
        </Layout>
    )
}

export default AppointmentPage