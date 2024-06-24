import React,{useEffect, useState} from 'react'
import Layout from '../Layout'
import axios from 'axios'
import { Table, message } from 'antd'


function Users() {

  const [user,setUser] = useState([])
  const [hasFetched, setHasFetched] = useState(false);

  const getUsers = async () =>{
    try {
      const res = await axios.get('http://localhost:8080/api/v1/admin/get-all-users',
        {
          headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`
          }
        }
      )
      if(res.data) {
        setUser(res.data.data)
        message.success('Got all users.')
      } else {
        message.error('Fetching Users Failed from response.')
      }
    } catch (error) {
      if (error.response.data.message) {
        message.error(error.response.data.message)
      }
      else {
        message.error('Fetching Users Failed.')
      }
    }
  }

  useEffect(() => {
    if (!hasFetched) {
      getUsers();
      setHasFetched(true);
    }
  }, [hasFetched]);

  const columns = [
    {
      title:'Name',
      dataIndex:'username',
    },
    {
      title:'Email',
      dataIndex:'email',
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
      <Table columns={columns} dataSource={user.map(user => ({...user, key: user._id }))} />
    </Layout>
  )
}

export default Users