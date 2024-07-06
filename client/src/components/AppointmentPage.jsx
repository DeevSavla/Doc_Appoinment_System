import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Layout from './Layout'
import { message, Table } from 'antd'
import { useParams } from 'react-router-dom'

function AppointmentPage() {

    const params = useParams()
    const [appointments, setAppointments] = useState([])

    const getAppointments = async (req, res) => {
        try {
            const res = await axios.post('http://localhost:8080/api/v1/doctor/get-all-appointments',
                {
                    doctorId: params.doctorId
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )

            if (res.data) {
                console.log(res.data.data)
                setAppointments(res.data.data)
                message.success('Appointments Fetched.')
            }

        }
        catch (error) {
            if (error.response.data.message) {
                message.error(error.response.data.message)
            } else {
                message.error('Error while fetching apppointments.')
            }
        }
    }

    useEffect(() => {
        getAppointments()
    }, [])

    const columns = [
        {
            title: 'ID',
            dataIndex: '_id'
        },
        {
            title: 'Name of Patient',
            dataIndex: 'userInfo',
            render: (text, record) => (
                <span>{record.userInfo}</span>
            )
        },
        {
            title: 'Date',
            dataIndex: 'date',
            render: (text, record) => (
                <span>{record.date}</span>
            )
        },
        {
            title: 'Time',
            dataIndex: 'time',
            render: (text, record) => (
                <span>{record.time}</span>
            )
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (text, record) => (
                <span>{record.status}</span>
            )
        }
    ]

    return (
        <Layout>
            <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
                <h1 className="text-center text-4xl font-extrabold text-gray-800 mb-8">
                    Appointment List
                </h1>
                <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg overflow-hidden">
                    <Table
                        columns={columns}
                        dataSource={appointments}
                        pagination={{ position: ['bottomCenter'] }}
                        bordered
                        className="ant-table-custom"
                    />
                </div>
            </div>
        </Layout>
    )
}

export default AppointmentPage

