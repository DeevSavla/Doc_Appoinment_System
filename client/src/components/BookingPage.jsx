import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { message, Steps, Button, Tooltip, Modal, Result } from 'antd'
import { useSelector } from 'react-redux'
import {baseUrl} from '../utilities/baseUrl'
import Spinner from './Spinner'

const { Step } = Steps;

function BookingPage() {
  const { user } = useSelector(state => state.user);
  const navigate = useNavigate();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [appointmentBooked, setAppointmentBooked] = useState(false);
  const params = useParams();
  const [singleDoctor, setSingleDoctor] = useState(null);

  if (!user) {
    return <Spinner />;
  }

  const checkAvailability = async () => {
    if (!date || !time) {
      message.error('Please select both date and time');
      return;
    }
    
    try {
      setIsChecking(true);
      const res = await axios.post(`${baseUrl}/user/booking-availability`,
        {
          doctorId: params.doctorId, date, time
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      setIsChecking(false);
      if (res.data) {
        setIsAvailable(true);
        message.success('Doctor is available at this time.');
        setCurrentStep(1);
      }
    } catch (error) {
      setIsChecking(false);
      setIsAvailable(false);
      if (error.response?.data?.message) {
        message.error(error.response.data.message);
      } else {
        message.error('Doctor is not available at this time.');
      }
    }
  };

  const handleProceedToConfirmation = () => {
    setCurrentStep(2);
    setShowConfirmation(true);
  };

  const handleBooking = async () => {
    try {
      setIsBooking(true);
      const res = await axios.post(`${baseUrl}/user/book-appointment`,
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: singleDoctor,
          userInfo: user.data.username,
          date: date,
          time: time,
          reason: reason || 'General consultation'
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      setIsBooking(false);
      if (res.data) {
        setAppointmentBooked(true);
        setShowConfirmation(false);
        setCurrentStep(3);
        message.success('Appointment booked successfully.');
      }
    } catch (error) {
      setIsBooking(false);
      if (error.response?.data?.message) {
        message.error(error.response.data.message);
      } else {
        message.error('Failed to book appointment.');
      }
    }
  };

  const getDoctor = async () => {
    try {
      const res = await axios.post(`${baseUrl}/doctor/get-single-doctor`,
        { doctorId: params.doctorId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      if (res.data) {
        setSingleDoctor(res.data.data);
      } else {
        message.error('Error while fetching doctor details.');
      }
    } catch (error) {
      if (error.response?.data?.message) {
        message.error(error.response.data.message);
      } else {
        message.error('Failed to fetch doctor details.');
      }
    }
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const formatTime = (timeString) => {
    try {
      const [hours, minutes] = timeString.split(':');
      const date = new Date();
      date.setHours(parseInt(hours, 10));
      date.setMinutes(parseInt(minutes, 10));
      return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    } catch (e) {
      return timeString;
    }
  };

  useEffect(() => {
    getDoctor();
  }, []);

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Book an Appointment</h1>
          <div className="h-1 w-16 bg-gradient-to-r from-blue-600 to-teal-500 mx-auto rounded-full mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Schedule your appointment with our experienced medical professionals
          </p>
        </div>
        
        <div className="mb-12">
          <Steps current={currentStep} className="custom-steps">
            <Step title="Select Time" description="Choose appointment slot" />
            <Step title="Details" description="Provide additional info" />
            <Step title="Confirm" description="Review & confirm" />
            <Step title="Done" description="Appointment booked" />
          </Steps>
        </div>
        
        {singleDoctor && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            {/* Doctor Info Header */}
            <div className="bg-gradient-to-r from-blue-600 to-teal-500 p-6 text-white">
              <div className="flex flex-col md:flex-row md:items-center">
                <div className="bg-white/20 w-20 h-20 rounded-full flex items-center justify-center mb-4 md:mb-0 md:mr-6">
                  <i className="fas fa-user-md text-white text-3xl"></i>
                </div>
                <div>
                  <h2 className="text-2xl font-bold">
                    Dr. {singleDoctor.firstName} {singleDoctor.lastName}
                  </h2>
                  <p className="text-white/90">{singleDoctor.specialization}</p>
                </div>
              </div>
            </div>
            
            {/* Doctor Details */}
            <div className="p-6 bg-blue-50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <i className="fas fa-dollar-sign text-blue-600"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Consultation Fee</p>
                    <p className="font-medium text-lg text-gray-900">${singleDoctor.feesPerConsultation}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <i className="fas fa-clock text-blue-600"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Available Timings</p>
                    <p className="font-medium text-lg text-gray-900">{singleDoctor.timings}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <i className="fas fa-briefcase text-blue-600"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Experience</p>
                    <p className="font-medium text-lg text-gray-900">{singleDoctor.experience} years</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Step 1: Booking Form */}
            {currentStep === 0 && (
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                  <i className="fas fa-calendar-alt mr-2 text-blue-600"></i>
                  Select Date and Time
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Appointment Date</label>
                    <input
                      type="date"
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                    <p className="text-gray-500 text-sm mt-2">
                      <i className="fas fa-info-circle mr-1"></i>
                      Please select a date within the next 30 days
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Appointment Time</label>
                    <input
                      type="time"
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      required
                    />
                    <p className="text-gray-500 text-sm mt-2">
                      <i className="fas fa-info-circle mr-1"></i>
                      Please select a time within doctor's working hours
                    </p>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-end">
                  <button
                    className={`py-3 px-8 rounded-lg shadow-md flex items-center justify-center font-medium transition-all duration-200 ${
                      isChecking 
                        ? 'bg-gray-400 text-white cursor-not-allowed' 
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                    onClick={checkAvailability}
                    disabled={isChecking}
                  >
                    {isChecking ? (
                      <>
                        <i className="fas fa-spinner fa-spin mr-2"></i>
                        Checking...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-calendar-check mr-2"></i>
                        Check Availability
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
            
            {/* Step 2: Additional Details */}
            {currentStep === 1 && (
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                  <i className="fas fa-notes-medical mr-2 text-blue-600"></i>
                  Appointment Details
                </h3>
                
                <div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-6 flex items-start">
                    <i className="fas fa-check-circle text-green-500 mt-1 mr-3 text-lg"></i>
                    <div>
                      <p className="font-medium text-green-800">Time slot available!</p>
                      <p className="text-green-700 text-sm">
                        You can book an appointment with Dr. {singleDoctor.firstName} {singleDoctor.lastName} on {formatDate(date)} at {formatTime(time)}.
                      </p>
                    </div>
                  </div>
                
                  <label className="block text-gray-700 font-medium mb-2">Reason for Visit (Optional)</label>
                  <textarea
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 min-h-[120px]"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Please briefly describe your symptoms or reason for the appointment..."
                  ></textarea>
                  <p className="text-gray-500 text-sm mt-2">
                    <i className="fas fa-info-circle mr-1"></i>
                    This information helps the doctor prepare for your appointment
                  </p>
                </div>
                
                <div className="mt-8 flex justify-between">
                  <button
                    className="py-3 px-6 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-medium flex items-center transition-all duration-200"
                    onClick={() => setCurrentStep(0)}
                  >
                    <i className="fas fa-arrow-left mr-2"></i>
                    Back
                  </button>
                  
                  <button
                    className="py-3 px-8 rounded-lg shadow-md bg-blue-600 text-white hover:bg-blue-700 font-medium flex items-center transition-all duration-200"
                    onClick={handleProceedToConfirmation}
                  >
                    Continue
                    <i className="fas fa-arrow-right ml-2"></i>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Confirmation Modal */}
        <Modal
          visible={showConfirmation}
          title={null}
          footer={null}
          onCancel={() => setShowConfirmation(false)}
          width={600}
          className="appointment-confirmation-modal"
          centered
        >
          <div className="pt-4 pb-2">
            <div className="text-center mb-6">
              <div className="inline-block p-4 bg-blue-100 rounded-full mb-4">
                <i className="fas fa-clipboard-check text-blue-600 text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-800">Confirm Your Appointment</h3>
              <p className="text-gray-500">Please review the details before confirming</p>
            </div>
            
            {singleDoctor && (
              <div className="bg-gray-50 rounded-xl p-5 mb-6">
                <h4 className="font-medium text-gray-800 mb-3">Appointment Details</h4>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="text-gray-500 w-32 flex-shrink-0">Doctor:</div>
                    <div className="font-medium">Dr. {singleDoctor.firstName} {singleDoctor.lastName}</div>
                  </div>
                  <div className="flex items-start">
                    <div className="text-gray-500 w-32 flex-shrink-0">Specialization:</div>
                    <div>{singleDoctor.specialization}</div>
                  </div>
                  <div className="flex items-start">
                    <div className="text-gray-500 w-32 flex-shrink-0">Date & Time:</div>
                    <div>{formatDate(date)} at {formatTime(time)}</div>
                  </div>
                  <div className="flex items-start">
                    <div className="text-gray-500 w-32 flex-shrink-0">Fee:</div>
                    <div className="font-medium">${singleDoctor.feesPerConsultation}</div>
                  </div>
                  {reason && (
                    <div className="flex items-start">
                      <div className="text-gray-500 w-32 flex-shrink-0">Reason:</div>
                      <div>{reason}</div>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            <div className="mt-8 flex justify-between">
              <Button 
                size="large"
                onClick={() => setShowConfirmation(false)}
              >
                Cancel
              </Button>
              
              <Button 
                type="primary" 
                size="large"
                className="bg-blue-600"
                onClick={handleBooking}
                loading={isBooking}
              >
                {isBooking ? 'Booking...' : 'Confirm Appointment'}
              </Button>
            </div>
          </div>
        </Modal>
        
        {/* Success Result */}
        {appointmentBooked && (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <Result
              status="success"
              title="Appointment Booked Successfully!"
              subTitle={`Your appointment with Dr. ${singleDoctor?.firstName} ${singleDoctor?.lastName} is confirmed for ${formatDate(date)} at ${formatTime(time)}.`}
              extra={[
                <Button 
                  type="primary"
                  size="large" 
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => navigate('/appointments')}
                  key="appointments"
                >
                  View My Appointments
                </Button>,
                <Button 
                  size="large" 
                  onClick={() => navigate('/doctors')}
                  key="doctors"
                >
                  Find More Doctors
                </Button>,
              ]}
            />
          </div>
        )}
        
        {/* Information Panel */}
        {!appointmentBooked && (
          <div className="bg-blue-50 rounded-xl p-6 shadow-sm border border-blue-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <i className="fas fa-info-circle text-blue-600 mr-2"></i>
              Important Information
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                <span>Please arrive 15 minutes before your scheduled appointment time.</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                <span>Bring your ID, insurance card, and list of current medications.</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                <span>You can cancel or reschedule your appointment up to 24 hours before the scheduled time.</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                <span>For any questions or assistance, please contact our support team.</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default BookingPage