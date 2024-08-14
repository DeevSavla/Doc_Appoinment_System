import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Layout from './Layout'
import { message, Table } from 'antd'
import { useParams } from 'react-router-dom'
import {baseUrl} from '../utilities/baseUrl'

function AppointmentPage() {

    const params = useParams()
    const [appointments, setAppointments] = useState([])

    const getAppointments = async (req, res) => {
        try {
            const res = await axios.post(`${baseUrl}/doctor/get-all-appointments`,
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

    const handleStatus = async (record, status) => {
        try {
            const res = await axios.post(`${baseUrl}/doctor/handle-status`,
                {
                    appointmentId: record._id,
                    status
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )

            if (res.data) {
                message.success('Appointment Status Updated.')
                getAppointments()
            }

        } catch (error) {
            if (error.response.data.message) {
                message.error(error.response.data.message)
            } else {
                message.error('Appointment Status Error.')
            }
        }
    }

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
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (text, record) => {
                return (
                    <div>
                        {record.status === "Pending" ? (
                            <div className='flex gap-4'>
                                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500" onClick={() => handleStatus(record, 'Approve')}>Approve</button>
                                <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500" onClick={() => handleStatus(record, 'Reject')}>Reject</button>
                            </div>
                        ) : record.status === "Approve" ? (
                            <div className='flex gap-4'>
                                <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500" onClick={() => handleStatus(record, 'Reject')}>Reject</button>
                            </div>
                        ) : record.status === "Reject" ? (
                            <div className='flex gap-4'>
                                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500" onClick={() => handleStatus(record, 'Approve')}>Approve</button>
                            </div>
                        ) : null}

                    </div>
                )
            }
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

