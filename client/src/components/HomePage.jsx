import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import { useSelector } from 'react-redux';
import Spinner from './Spinner';
import axios from 'axios';
import { message, Row } from 'antd';
import DoctorList from './DoctorList';

function HomePage() {
  const { user } = useSelector(state => state.user);

  const [allDoctors, setAllDoctors] = useState([]);

  useEffect(() => {
    
    if (user && !user.isDoctor) {
      const getAllDoctorInfo = async () => {
        try {
          const res = await axios.post(
            'http://localhost:8080/api/v1/user/getdoctor',
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

  return (
    <Layout>
      {user.isDoctor ? (
        <div>HomePage</div>
      ) : (
        <Row>
          {allDoctors.map(doctor => (
            <DoctorList key={doctor._id} doctor={doctor} />
          ))}
        </Row>
      )}
    </Layout>
  );
}

export default HomePage;
