import React, {useEffect, useState} from 'react'
import Layout from '../Layout'
import axios from 'axios'
import { Table, message, Badge, Tag, Input, Button } from 'antd'
import {baseUrl} from '../../utilities/baseUrl'

function Users() {
  const [users, setUsers] = useState([]);
  const [hasFetched, setHasFetched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const { Search } = Input;
  
  const getUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${baseUrl}/admin/get-all-users`,
        {
          headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      setLoading(false);
      
      if(res.data) {
        setUsers(res.data.data);
        message.success('Users loaded successfully');
      } else {
        message.error('Error fetching users');
      }
    } catch (error) {
      setLoading(false);
      if (error.response?.data?.message) {
        message.error(error.response.data.message);
      }
      else {
        message.error('Failed to fetch users');
      }
    }
  };

  useEffect(() => {
    if (!hasFetched) {
      getUsers();
      setHasFetched(true);
    }
  }, [hasFetched]);
  
  const handleBlockUser = (userId) => {
    message.info('User block functionality will be implemented soon');
  };
  
  const filteredUsers = searchText
    ? users.filter(user => 
        user.username.toLowerCase().includes(searchText.toLowerCase()) ||
        user.email.toLowerCase().includes(searchText.toLowerCase())
      )
    : users;

  const columns = [
    {
      title: 'User',
      dataIndex: 'username',
      key: 'username',
      render: (text, record) => (
        <div className="flex items-center">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
            <span className="text-blue-600 font-medium">{text.charAt(0).toUpperCase()}</span>
          </div>
          <div>
            <div className="font-medium text-gray-800">{text}</div>
            <div className="text-gray-500 text-sm">{record.email}</div>
          </div>
        </div>
      ),
      sorter: (a, b) => a.username.localeCompare(b.username),
    },
    {
      title: 'Role',
      dataIndex: 'isDoctor',
      key: 'isDoctor',
      render: (isDoctor, record) => (
        <Tag color={record.isAdmin ? 'gold' : isDoctor ? 'blue' : 'green'}>
          {record.isAdmin ? 'Admin' : isDoctor ? 'Doctor' : 'Patient'}
        </Tag>
      ),
      filters: [
        { text: 'Patients', value: false },
        { text: 'Doctors', value: true },
      ],
      onFilter: (value, record) => record.isDoctor === value,
    },
    {
      title: 'Status',
      key: 'status',
      render: () => (
        <Badge status="success" text="Active" />
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <div className="space-x-2">
          <Button 
            type="primary" 
            size="small"
            className="bg-blue-500 hover:bg-blue-600 border-0 text-white"
            onClick={() => message.info(`View profile for ${record.username}`)}
          >
            <i className="fas fa-eye mr-1"></i> View
          </Button>
          <Button 
            type="default" 
            size="small"
            danger
            onClick={() => handleBlockUser(record._id)}
          >
            <i className="fas fa-ban mr-1"></i> Block
          </Button>
        </div>
      ),
    },
  ];
  
  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">User Management</h1>
          <div className="h-1 w-16 bg-gradient-to-r from-blue-600 to-teal-500 rounded-full mb-4"></div>
          <p className="text-gray-600">Manage and monitor all users registered in the system</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-teal-500 rounded-lg flex items-center justify-center mr-3">
                  <i className="fas fa-users text-white"></i>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">Users List</h2>
                  <p className="text-gray-500 text-sm">Total: {users.length} users</p>
                </div>
              </div>
              
              <div className="w-full md:w-64">
                <Search
                  placeholder="Search users..."
                  allowClear
                  onChange={(e) => setSearchText(e.target.value)}
                  className="custom-search"
                />
              </div>
            </div>
          </div>
          
          <Table 
            columns={columns} 
            dataSource={filteredUsers.map(user => ({...user, key: user._id}))} 
            loading={loading}
            pagination={{ 
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} users`
            }}
            className="custom-table"
          />
        </div>
        
        <div className="mt-8 bg-blue-50 rounded-xl p-6 shadow-sm border border-blue-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
            <i className="fas fa-info-circle text-blue-600 mr-2"></i>
            Admin Actions
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            As an administrator, you can monitor all users in the system. You can view profiles and temporarily block users if necessary.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="bg-white rounded-lg p-4 border border-gray-200 flex items-center">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <i className="fas fa-user-check text-green-600"></i>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Active Users</h4>
                <p className="text-gray-500 text-sm">{users.length} users</p>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200 flex items-center">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <i className="fas fa-user-md text-blue-600"></i>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Doctors</h4>
                <p className="text-gray-500 text-sm">{users.filter(user => user.isDoctor).length} users</p>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200 flex items-center">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
                <i className="fas fa-ban text-red-600"></i>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Blocked</h4>
                <p className="text-gray-500 text-sm">0 users</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Users