import React, {useEffect, useState} from 'react'
import Layout from '../Layout'
import axios from 'axios'
import { Table, message, Tag, Input, Button, Badge, Space, Tooltip } from 'antd'
import {baseUrl} from '../../utilities/baseUrl'

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [hasFetched, setHasFetched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const { Search } = Input;

  const getDoctors = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${baseUrl}/admin/get-all-doctors`,
        {
          headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      setLoading(false);
      
      if(res.data) {
        setDoctors(res.data.data);
        message.success('Doctors loaded successfully');
      } else {
        message.error('Error fetching doctors');
      }
    } catch (error) {
      setLoading(false);
      if (error.response?.data?.message) {
        message.error(error.response.data.message);
      }
      else {
        message.error('Failed to fetch doctors');
      }
    }
  };

  const handleAccountStatus = async(record, status) => {
    try{
      setLoading(true);
      const res = await axios.post(`${baseUrl}/admin/change-account-status`,
        {
          doctorId: record._id,
          userId: record.userId,
          status: status
        },
        {
          headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`  
          }
        }
      );
      
      setLoading(false);
      if(res.data) {
        message.success(`Doctor status changed to ${status}`);
        getDoctors(); // Refresh the list instead of reloading the page
      }
    } catch(error) {
      setLoading(false);
      if (error.response?.data?.message) {
        message.error(error.response.data.message);
      }
      else {
        message.error('Error updating doctor status');
      }
    }
  };

  useEffect(() => {
    if (!hasFetched) {
      getDoctors();
      setHasFetched(true);
    }
  }, [hasFetched]);
  
  const filteredDoctors = searchText
    ? doctors.filter(doctor => 
        `${doctor.firstName} ${doctor.lastName}`.toLowerCase().includes(searchText.toLowerCase()) ||
        doctor.specialization?.toLowerCase().includes(searchText.toLowerCase()) ||
        doctor.phone?.toLowerCase().includes(searchText.toLowerCase())
      )
    : doctors;

  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending':
        return 'orange';
      case 'Approved':
        return 'green';
      case 'Rejected':
        return 'red';
      default:
        return 'blue';
    }
  };

  const columns = [
    {
      title: 'Doctor',
      key: 'name',
      render: (_, record) => (
        <div className="flex items-center">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
            <i className="fas fa-user-md text-blue-600"></i>
          </div>
          <div>
            <div className="font-medium text-gray-800">{`${record.firstName} ${record.lastName}`}</div>
            <div className="text-gray-500 text-sm">{record.specialization || 'General Medicine'}</div>
          </div>
        </div>
      ),
      sorter: (a, b) => `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`),
    },
    {
      title: 'Contact',
      dataIndex: 'phone',
      key: 'phone',
      render: (phone, record) => (
        <div>
          <div className="flex items-center">
            <i className="fas fa-phone-alt text-gray-500 mr-2"></i>
            <span>{phone}</span>
          </div>
          {record.email && (
            <div className="flex items-center mt-1">
              <i className="fas fa-envelope text-gray-500 mr-2"></i>
              <span className="text-sm text-gray-600">{record.email}</span>
            </div>
          )}
        </div>
      ),
    },
    {
      title: 'Fees',
      dataIndex: 'feesPerConsultation',
      key: 'feesPerConsultation',
      render: fees => (
        <div className="font-medium">
          ${fees || '0'}
        </div>
      ),
      sorter: (a, b) => (a.feesPerConsultation || 0) - (b.feesPerConsultation || 0),
    },
    {
      title: 'Experience',
      dataIndex: 'experience',
      key: 'experience',
      render: years => (
        <div>
          {years} {parseInt(years) === 1 ? 'year' : 'years'}
        </div>
      ),
      sorter: (a, b) => (a.experience || 0) - (b.experience || 0),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: status => (
        <Tag color={getStatusColor(status)}>
          {status}
        </Tag>
      ),
      filters: [
        { text: 'Pending', value: 'Pending' },
        { text: 'Approved', value: 'Approved' },
        { text: 'Rejected', value: 'Rejected' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="small">
          {record.status === 'Pending' ? (
            <>
              <Tooltip title="Approve this doctor">
                <Button 
                  type="primary" 
                  size="small"
                  className="bg-green-500 hover:bg-green-600 border-0" 
                  onClick={() => handleAccountStatus(record, 'Approved')}
                  loading={loading}
                >
                  <i className="fas fa-check mr-1"></i> Approve
                </Button>
              </Tooltip>
              <Tooltip title="Reject this doctor">
                <Button 
                  danger 
                  size="small"
                  onClick={() => handleAccountStatus(record, 'Rejected')}
                  loading={loading}
                >
                  <i className="fas fa-times mr-1"></i> Reject
                </Button>
              </Tooltip>
            </>
          ) : record.status === 'Approved' ? (
            <Tooltip title="Reject this doctor">
              <Button 
                danger 
                size="small"
                onClick={() => handleAccountStatus(record, 'Rejected')}
                loading={loading}
              >
                <i className="fas fa-ban mr-1"></i> Revoke Approval
              </Button>
            </Tooltip>
          ) : (
            <Tooltip title="Approve this doctor">
              <Button 
                type="primary" 
                size="small"
                className="bg-green-500 hover:bg-green-600 border-0" 
                onClick={() => handleAccountStatus(record, 'Approved')}
                loading={loading}
              >
                <i className="fas fa-check mr-1"></i> Approve
              </Button>
            </Tooltip>
          )}
          <Tooltip title="View full profile">
            <Button 
              type="default"
              size="small"
              onClick={() => message.info(`View profile for Dr. ${record.firstName} ${record.lastName}`)}
            >
              <i className="fas fa-eye mr-1"></i> Profile
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ];
  
  // Calculate statistics
  const pendingDoctors = doctors.filter(doc => doc.status === 'Pending').length;
  const approvedDoctors = doctors.filter(doc => doc.status === 'Approved').length;
  const rejectedDoctors = doctors.filter(doc => doc.status === 'Rejected').length;
  
  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Doctor Management</h1>
          <div className="h-1 w-16 bg-gradient-to-r from-blue-600 to-teal-500 rounded-full mb-4"></div>
          <p className="text-gray-600">Review and manage doctor applications and accounts</p>
        </div>
        
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <i className="fas fa-user-md text-blue-600 text-xl"></i>
              </div>
              <div>
                <div className="text-sm text-gray-500">Total Doctors</div>
                <div className="text-2xl font-bold text-gray-800">{doctors.length}</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                <i className="fas fa-clock text-orange-600 text-xl"></i>
              </div>
              <div>
                <div className="text-sm text-gray-500">Pending Approval</div>
                <div className="text-2xl font-bold text-gray-800">{pendingDoctors}</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                <i className="fas fa-check-circle text-green-600 text-xl"></i>
              </div>
              <div>
                <div className="text-sm text-gray-500">Approved</div>
                <div className="text-2xl font-bold text-gray-800">{approvedDoctors}</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                <i className="fas fa-times-circle text-red-600 text-xl"></i>
              </div>
              <div>
                <div className="text-sm text-gray-500">Rejected</div>
                <div className="text-2xl font-bold text-gray-800">{rejectedDoctors}</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Doctor List */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-teal-500 rounded-lg flex items-center justify-center mr-3">
                  <i className="fas fa-stethoscope text-white"></i>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">Doctors List</h2>
                  <p className="text-gray-500 text-sm">
                    {pendingDoctors === 0 ? "No pending applications" : 
                     pendingDoctors === 1 ? "1 application pending review" :
                     `${pendingDoctors} applications pending review`}
                  </p>
                </div>
              </div>
              
              <div className="w-full md:w-64">
                <Search
                  placeholder="Search doctors..."
                  allowClear
                  onChange={(e) => setSearchText(e.target.value)}
                  className="custom-search"
                />
              </div>
            </div>
          </div>
          
          <Table 
            columns={columns} 
            dataSource={filteredDoctors.map(doctor => ({...doctor, key: doctor._id}))} 
            loading={loading}
            pagination={{ 
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} doctors`
            }}
            className="custom-table"
          />
        </div>
        
        <div className="mt-8 bg-blue-50 rounded-xl p-6 shadow-sm border border-blue-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
            <i className="fas fa-info-circle text-blue-600 mr-2"></i>
            Doctor Approval Process
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            As an administrator, you're responsible for reviewing doctor applications. Before approving:
          </p>
          <ul className="text-gray-600 text-sm space-y-2">
            <li className="flex items-start">
              <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
              <span>Verify the doctor's credentials and experience</span>
            </li>
            <li className="flex items-start">
              <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
              <span>Check that specialization and fees are appropriate</span>
            </li>
            <li className="flex items-start">
              <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
              <span>Ensure contact information is valid and professional</span>
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  )
}

export default Doctors