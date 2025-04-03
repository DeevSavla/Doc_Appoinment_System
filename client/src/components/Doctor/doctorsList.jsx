import React, { useState, useEffect } from 'react'
import Layout from '../Layout'
import axios from 'axios'
import { Row, Col, Input, Card, Button, Empty, Spin, Tag, Rate, Tooltip, message } from 'antd'
import { baseUrl } from '../../utilities/baseUrl'
import { useNavigate } from 'react-router-dom'

const { Search } = Input;

function DoctorsList() {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [specializations, setSpecializations] = useState([]);
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const navigate = useNavigate();
  
  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${baseUrl}/user/get-all-approved-doctors`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (res.data.success) {
        setDoctors(res.data.data);
        setFilteredDoctors(res.data.data);
        
        // Extract unique specializations
        const uniqueSpecializations = [...new Set(res.data.data.map(doctor => 
          doctor.specialization || 'General Medicine'
        ))];
        setSpecializations(uniqueSpecializations);
        
        message.success('Doctors loaded successfully');
      }
    } catch (error) {
      message.error('Error fetching doctors');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    // Apply filters whenever search term or specialization changes
    let results = doctors;
    
    if (searchTerm) {
      results = results.filter(doctor => 
        `${doctor.firstName} ${doctor.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (doctor.specialization && doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    if (selectedSpecialization) {
      results = results.filter(doctor => 
        doctor.specialization === selectedSpecialization
      );
    }
    
    setFilteredDoctors(results);
  }, [searchTerm, selectedSpecialization, doctors]);

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleSpecializationSelect = (specialization) => {
    setSelectedSpecialization(specialization === selectedSpecialization ? '' : specialization);
  };

  const handleBookAppointment = (doctorId) => {
    navigate(`/book-appointment/${doctorId}`);
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Find Your Doctor</h1>
          <div className="h-1 w-16 bg-gradient-to-r from-blue-600 to-teal-500 rounded-full mb-4"></div>
          <p className="text-gray-600">Book an appointment with our healthcare professionals</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <div className="w-full md:w-1/2">
              <Search
                placeholder="Search by name or specialization..."
                allowClear
                size="large"
                onSearch={handleSearch}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="custom-search"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="text-gray-500 mr-2 mt-1">Filter by specialization:</span>
              {specializations.map(specialization => (
                <Tag
                  key={specialization}
                  color={selectedSpecialization === specialization ? "blue" : "default"}
                  className={`px-3 py-1 cursor-pointer text-sm rounded-full ${
                    selectedSpecialization === specialization 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => handleSpecializationSelect(specialization)}
                >
                  {specialization}
                </Tag>
              ))}
              {selectedSpecialization && (
                <Button 
                  type="link" 
                  size="small" 
                  onClick={() => setSelectedSpecialization('')}
                  className="text-gray-500"
                >
                  Clear filters
                </Button>
              )}
            </div>
          </div>
          
          {loading ? (
            <div className="text-center py-20">
              <Spin size="large" />
              <div className="mt-4 text-gray-500">Loading doctors...</div>
            </div>
          ) : filteredDoctors.length === 0 ? (
            <Empty 
              description={
                <span className="text-gray-500">
                  No doctors found matching your criteria
                </span>
              }
              className="py-10"
            />
          ) : (
            <Row gutter={[24, 24]}>
              {filteredDoctors.map((doctor) => (
                <Col xs={24} sm={12} lg={8} key={doctor._id}>
                  <Card 
                    hoverable 
                    className="h-full overflow-hidden transition-all duration-300 hover:shadow-xl"
                    bodyStyle={{ padding: 0 }}
                  >
                    <div className="bg-gradient-to-r from-blue-500 to-teal-400 p-4 text-white">
                      <div className="flex items-center">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                          <span className="text-blue-600 text-2xl font-bold">
                            {`${doctor.firstName.charAt(0)}${doctor.lastName.charAt(0)}`}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-1">{`Dr. ${doctor.firstName} ${doctor.lastName}`}</h3>
                          <div className="text-blue-100 text-sm mb-1">{doctor.specialization || 'General Medicine'}</div>
                          <div className="flex items-center">
                            <Rate 
                              disabled 
                              defaultValue={4.5} 
                              allowHalf 
                              style={{ fontSize: '14px' }} 
                            />
                            <span className="ml-1 text-sm">(24)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-5">
                      <div className="mb-4">
                        <div className="flex justify-between mb-2">
                          <div className="text-gray-500 text-sm">Experience</div>
                          <div className="font-medium">{doctor.experience} years</div>
                        </div>
                        <div className="flex justify-between mb-2">
                          <div className="text-gray-500 text-sm">Consultation Fee</div>
                          <div className="font-medium">${doctor.feesPerConsultation}</div>
                        </div>
                        <div className="flex justify-between">
                          <div className="text-gray-500 text-sm">Timing</div>
                          <div className="font-medium">
                            {doctor.timings?.[0]} - {doctor.timings?.[1]}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex flex-col gap-2">
                        <Button 
                          type="primary" 
                          block
                          className="bg-blue-600 hover:bg-blue-700 border-0"
                          onClick={() => handleBookAppointment(doctor._id)}
                        >
                          Book Appointment
                        </Button>
                        <Tooltip title="View doctor's full profile">
                          <Button block>
                            View Profile
                          </Button>
                        </Tooltip>
                      </div>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </div>
        
        <div className="bg-blue-50 rounded-xl p-6 shadow-sm border border-blue-100 mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
            <i className="fas fa-info-circle text-blue-600 mr-2"></i>
            How to Book an Appointment
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            Follow these simple steps to book an appointment with one of our healthcare professionals:
          </p>
          <ol className="text-gray-600 text-sm space-y-2 list-decimal pl-5">
            <li>Browse through our list of doctors or use search to find a specialist</li>
            <li>Select a doctor and click "Book Appointment"</li>
            <li>Choose a suitable date and time slot</li>
            <li>Provide any additional information about your condition if needed</li>
            <li>Confirm your appointment</li>
          </ol>
          <p className="text-gray-600 text-sm mt-4">
            You'll receive a confirmation email with all the details of your appointment.
          </p>
        </div>
        
        <div className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="md:w-1/2">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Need Emergency Care?</h3>
              <p className="text-gray-600 mb-4">
                Our emergency services are available 24/7. For urgent medical attention, 
                please call our emergency hotline or visit our emergency department.
              </p>
              <div className="flex items-center">
                <Button 
                  size="large" 
                  type="primary" 
                  danger
                  className="mr-4"
                >
                  <i className="fas fa-phone-alt mr-2"></i>
                  Emergency Contact
                </Button>
                <span className="text-xl font-bold text-red-600">1-800-MEDCARE</span>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
                <i className="fas fa-ambulance text-red-600 text-4xl"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default DoctorsList 