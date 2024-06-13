import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import Layout from './Layout'

function HomePage() {

  const getUserData = async () =>{
    try{
      const res = await axios.post('http://localhost:8080/api/v1/user/getUserData',{},{
        headers:{
          Authorization : "Bearer "+localStorage.getItem('token'),
        }
      })
    } catch(error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getUserData()
  },[])

  return (
    <Layout>
    <div>HomePage</div>
    </Layout>
  )
}

export default HomePage