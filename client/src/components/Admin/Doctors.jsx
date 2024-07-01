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
        setDoctor(res.data.data)
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

  const handleAccountStatus = async(record,status) =>{
    try{
      const res = await axios.post('http://localhost:8080/api/v1/admin/changeAccountStatus',
        {
          doctorId:record._id,
          userId : record.userId,
          status:status
        },
        {
          headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`  
          }
        }
      )
      
      if(res.data) {
        message.success('Account Status Changed.')
        window.location.reload()
      }
    } catch(error) {
      if (error.response.data.message) {
        message.error(error.response.data.message)
      }
      else {
        message.error('Some error in updating status.')
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
      title:'Name',
      dataIndex:'name',
      render:(text,record)=> (
        <span>{record.firstName} {record.lastName}</span>
      )
    },
    {
      title:'Phone',
      dataIndex:'phone'
    },
    {
      title:'Status',
      dataIndex:'status'
    },
    {
      title:'Actions',
      dataIndex:'actions',
      render : (text,record) =>(
        <div>{record.status === 'Pending' ? 
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500"
            onClick={()=>handleAccountStatus(record,'Approved')}>
            Approve
          </button>
          :
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500">
            Reject
          </button>
           }</div>
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