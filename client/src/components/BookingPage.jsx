import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { message } from 'antd'

function BookingPage() {

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleAvailability = () => {
    console.log("Checking availability for:", date, time);
  };

  const handleBooking = () => {
    console.log("Booking for:", date, time);
  };

  const params = useParams()
  const [singleDoctor, setSingleDoctor] = useState(null)
  const getDoctor = async (req, res) => {
    try {
      const res = await axios.post('http://localhost:8080/api/v1/doctor/get-single-doctor',
        { doctorId: params.doctorId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )

      if (res.data) {
        setSingleDoctor(res.data.data)
        message.success('Doctor Fetched.')
      } else {
        message.error('Error while fetching doctor.')
      }
    } catch (error) {
      if (error.response.data.message) {
        message.error(error.response.data.message)
      }
    }
  }

  useEffect(() => {
    getDoctor()
  }, [])

  return (
    <Layout>
      {singleDoctor && (
        <div className="max-w-md mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
          <h4 className="text-lg font-semibold mb-2">
            Dr. {singleDoctor.firstName} {singleDoctor.lastName}
          </h4>
          <h4 className="text-gray-600 mb-2">Fees: ${singleDoctor.feesPerConsultation}</h4>
          <h4 className="text-gray-600 mb-4">
            Timings: {singleDoctor.timings}
          </h4>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4">
            <div><input
              type="date"
              className="w-full sm:w-auto p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
            <input
              type="time"
              className="w-full sm:w-auto p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            /> </div>
            <button
              className="w-full sm:w-auto p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={handleAvailability}
            >
              Check Availability
            </button>
            <button
              className="w-full sm:w-auto p-2 bg-gray-800 text-white rounded hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-800"
              onClick={handleBooking}
            >
              Book Now
            </button>
          </div>
        </div>

      )}
    </Layout>
  );

}

export default BookingPage