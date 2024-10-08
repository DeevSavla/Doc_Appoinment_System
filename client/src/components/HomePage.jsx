import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import { useSelector } from 'react-redux';
import Spinner from './Spinner';
import axios from 'axios';
import { message, Row } from 'antd';
import DoctorList from './DoctorList';
import {baseUrl} from '../utilities/baseUrl'

function HomePage() {
  const { user } = useSelector(state => state.user);

  const [allDoctors, setAllDoctors] = useState([]);

  useEffect(() => {
    
    if (user && !user.isDoctor) {
      const getAllDoctorInfo = async () => {
        try {
          const res = await axios.post(
            `${baseUrl}/user/getdoctor`,
            {},
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            }
          );
          if (res.data) {
            setAllDoctors(res.data.data);
            message.success('All Doctors Fetched');
          }
        } catch (error) {
          if (error.response?.data?.message) {
            message.error(error.response.data.message);
          } else {
            message.error('Error while fetching doctors.');
          }
        }
      };

      getAllDoctorInfo();
    }
  }, [user]); 

  if (!user) {
    return <Spinner />;
  }

  if(user?.isDoctor)
  {
    return (
      <Layout>
      <div>HomePage</div>
      </Layout>
    )
  }

  else {
    return (
        <Layout>
        <h1 className='text-center font-bold text-2xl'>List of Doctors at Medicare</h1>
        <Row>
          {allDoctors.map(doctor => (
            <DoctorList key={doctor._id} doctor={doctor} />
          ))}
        </Row>
        </Layout>
      )
    }

}

export default HomePage;
