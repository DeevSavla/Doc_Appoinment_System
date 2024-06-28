import React, { useEffect, useState } from 'react'
import Layout from '../Layout'
import { useSelector } from 'react-redux'
import Spinner from '../Spinner'
import axios from 'axios'
import { useParams } from 'react-router-dom'

function Profile() {

  const { user } = useSelector(state => state.user)

  if (!user) {
    return (<Spinner />)
  }

  else {

    const [doctor, setDoctor] = useState(null)
    const params = useParams()
    const [hasFetched, setHasFetched] = useState(false);

    const getDoctorInfo = async () => {
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
          console.log(res.data.data)
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

    useEffect(() => {
      if (!hasFetched) {
        getDoctorInfo();
        setHasFetched(true);
      }
    }, [hasFetched]);

    return (
      <Layout>
        <div>
          Profile
        </div>
      </Layout>
    )
  }
}

export default Profile