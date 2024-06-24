import React,{useEffect, useState} from 'react'
import Layout from '../Layout'
import axios from 'axios'
import { Table, message } from 'antd'

function Doctors() {

  const [doctor,setDoctor] = useState([])
  const [hasFetched, setHasFetched] = useState(false);

  const getDoctors = async () =>{
    try {
      const res = await axios.get('http://localhost:8080/api/v1/admin/get-all-doctors',
        {
          headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`
          }
        }
      )
      if(res.data) {
        setUser(res.data.data)
        message.success('Got all Doctors.')
      } else {
        message.error('Fetching Doctors Failed.')
      }
    } catch (error) {
      if (error.response.data.message) {
        message.error(error.response.data.message)
      }
      else {
        message.error('Fetching Doctors Failed.')
      }
    }
  }

  useEffect(() => {
    if (!hasFetched) {
      getDoctors();
      setHasFetched(true);
    }
  }, [hasFetched]);

  const columns = [
    {
      title:'First Name',
      dataIndex:'firstName',
    },
    {
      title:'Last Name',
      dataIndex:'lastName',
    },
    {
      title:'Doctor',
      dataIndex:'isDoctor',
      render : (text,record)=>(
        <span>{record.isDoctor ? 'Yes':'No'}</span>
      )
    },
    {
      title:'Actions',
      dataIndex:'actions',
      render : (text,record) =>(
        <div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500">Block</button>
        </div>
      )
    }
  ]

  
  return (
    <Layout>
      <div className='text-xl text-center mb-5'>Users</div>
      <Table columns={columns} dataSource={doctor.map(doctor => ({...doctor, key: doctor._id }))} />
    </Layout>
  )
}

export default Doctors