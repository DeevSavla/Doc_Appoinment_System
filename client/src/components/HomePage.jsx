import React, { useEffect,useState } from 'react'
import Layout from './Layout'
import {useSelector} from 'react-redux'
import Spinner from './Spinner'
import axios from 'axios'
import {message,Row} from 'antd'
import DoctorList from './DoctorList'

function HomePage() {

  const { user } = useSelector(state => state.user)
  if(!user) {
    return (<Spinner/>)
  }
  else{

    const [allDoctors,setAllDoctors] = useState(null)

    const getAllDoctorInfo = async (req,res)=>{
      try{
        const res = await axios.post('http://localhost:8080/api/v1/user/getdoctor',{},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        )
        if(res.data) {
          console.log(res.data.data)
          setAllDoctors(res.data.data)
          message.success('All Doctors Fetched')
        }
      } catch(error) {
        if (error.response.data.message) {
          message.error(error.response.data.message)
        }
        else {
          message.error('Error while fetching doctors.')
        }
      }
    } 

    useEffect(()=>{
      getAllDoctorInfo()
    },[])

    return (
      <Layout>
        <Row>
        {allDoctors && allDoctors.map(doctor=>(<DoctorList doctor={doctor}/>))}
        </Row>
      </Layout>
    )
  }
}

export default HomePage