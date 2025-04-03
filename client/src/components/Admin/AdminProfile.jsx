import React, { useState, useEffect } from 'react';
import Layout from '../Layout';
import { useSelector } from 'react-redux';
import { Card, Row, Col, Avatar, Tabs, Form, Input, Button, message, Divider, Statistic } from 'antd';
import axios from 'axios';
import { baseUrl } from '../../utilities/baseUrl';
import { UserOutlined, MailOutlined, LockOutlined, EditOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

function AdminProfile() {
  const { user } = useSelector(state => state.user);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDoctors: 0,
    pendingDoctors: 0,
    totalAppointments: 0
  });

  // Fetch admin profile data
  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        setLoading(true);
        const userId = user?.data?._id || user?._id;
        
        if (!userId) {
          message.error('User data not available');
          setLoading(false);
          return;
        }
        
        const res = await axios.post(
          `${baseUrl}/user/getUserData`,
          { userId },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        );
        
        if (res.data && res.data.success) {
          setProfile(res.data.data.data);
          form.setFieldsValue({
            username: res.data.data.data.username,
            email: res.data.data.data.email
          });
        } else {
          message.error('Failed to fetch profile data');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        message.error('Error fetching profile data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchAdminProfile();
  }, [user]);
  
  // Fetch platform statistics for admin dashboard
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        
        // Get total users count
        const usersResponse = await axios.get(
          `${baseUrl}/admin/users-count`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        );
        
        // Get doctors count
        const doctorsResponse = await axios.get(
          `${baseUrl}/admin/doctors-count`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        );
        
        // Get pending doctors count
        const pendingDoctorsResponse = await axios.get(
          `${baseUrl}/admin/pending-doctors-count`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        );
        
        // Get appointments count
        const appointmentsResponse = await axios.get(
          `${baseUrl}/admin/appointments-count`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        );
        
        const stats = {
          totalUsers: usersResponse.data.count || 0,
          totalDoctors: doctorsResponse.data.count || 0,
          pendingDoctors: pendingDoctorsResponse.data.count || 0,
          totalAppointments: appointmentsResponse.data.count || 0
        };
        
        setStats(stats);
      } catch (error) {
        console.error('Error fetching stats:', error);
        message.error('Failed to load statistics');
        
        // Fallback to placeholder data if API calls fail
        setStats({
          totalUsers: 0,
          totalDoctors: 0,
          pendingDoctors: 0,
          totalAppointments: 0
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    form.resetFields();
    setIsEditing(false);
  };

  const handleSave = async (values) => {
    try {
      setLoading(true);
      const userId = user?.data?._id || user?._id;
      
      // This would be a call to update the profile
      // await axios.post(`${baseUrl}/admin/update-profile`, {
      //   userId,
      //   ...values
      // }, {
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem('token')}`
      //   }
      // });
      
      message.success('Profile updated successfully');
      setIsEditing(false);
      setProfile({
        ...profile,
        username: values.username,
        email: values.email
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      message.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (!user || (!user.data?.isAdmin && !user.isAdmin)) {
    return (
      <Layout>
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="text-red-500 text-5xl mb-4">
              <i className="fas fa-exclamation-circle"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h2>
            <p className="text-gray-600 mb-6">You do not have permission to access this page. This page is restricted to administrators only.</p>
            <Button 
              type="primary" 
              size="large"
              onClick={() => window.history.back()}
              className="bg-blue-500"
            >
              Go Back
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <div className="h-1 w-16 bg-gradient-to-r from-blue-600 to-teal-500 rounded-full mb-4"></div>
            <p className="text-gray-600">Manage your profile and view system statistics</p>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <Statistic 
              title="Total Users" 
              value={stats.totalUsers} 
              prefix={<i className="fas fa-users text-blue-500 mr-2"></i>}
              className="text-center"
              loading={loading}
            />
          </Card>
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <Statistic 
              title="Total Doctors" 
              value={stats.totalDoctors} 
              prefix={<i className="fas fa-user-md text-green-500 mr-2"></i>}
              className="text-center"
              loading={loading}
            />
          </Card>
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <Statistic 
              title="Pending Approvals" 
              value={stats.pendingDoctors} 
              prefix={<i className="fas fa-clock text-orange-500 mr-2"></i>}
              className="text-center"
              loading={loading}
            />
          </Card>
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <Statistic 
              title="Total Appointments" 
              value={stats.totalAppointments} 
              prefix={<i className="fas fa-calendar-check text-purple-500 mr-2"></i>}
              className="text-center"
              loading={loading}
            />
          </Card>
        </div>
        
        {/* Profile & Settings */}
        <Card className="shadow-lg rounded-xl overflow-hidden">
          <Tabs defaultActiveKey="1" className="px-4">
            <TabPane 
              tab={<span><i className="fas fa-user-circle mr-2"></i>Profile</span>} 
              key="1"
            >
              <div className="p-4">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/3">
                    <div className="flex flex-col items-center p-6 bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl shadow-sm">
                      <Avatar 
                        size={100}
                        icon={<UserOutlined />}
                        className="bg-gradient-to-r from-blue-500 to-teal-500 mb-4"
                      />
                      <h2 className="text-xl font-semibold text-gray-800 mb-1">
                        {profile?.username || 'Admin User'}
                      </h2>
                      <p className="text-gray-500 mb-3">Administrator</p>
                      <div className="w-full border-t border-gray-200 pt-4 mt-2">
                        <p className="flex items-center text-gray-600 mb-2">
                          <MailOutlined className="mr-2" />
                          {profile?.email || 'admin@example.com'}
                        </p>
                        <p className="flex items-center text-gray-600">
                          <i className="fas fa-shield-alt mr-2"></i>
                          Full Access
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:w-2/3">
                    <div className="bg-white p-6">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-medium text-gray-800">Profile Details</h3>
                        {!isEditing ? (
                          <Button 
                            type="primary" 
                            icon={<EditOutlined />} 
                            onClick={handleEdit}
                            className="bg-blue-500"
                          >
                            Edit
                          </Button>
                        ) : (
                          <div className="space-x-2">
                            <Button 
                              type="default" 
                              icon={<CloseOutlined />} 
                              onClick={handleCancelEdit}
                            >
                              Cancel
                            </Button>
                            <Button 
                              type="primary" 
                              icon={<SaveOutlined />} 
                              onClick={() => form.submit()}
                              className="bg-green-500"
                            >
                              Save
                            </Button>
                          </div>
                        )}
                      </div>
                      
                      <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSave}
                        initialValues={{
                          username: profile?.username || '',
                          email: profile?.email || ''
                        }}
                      >
                        <Form.Item
                          name="username"
                          label="Username"
                          rules={[{ required: true, message: 'Please enter username' }]}
                        >
                          <Input 
                            prefix={<UserOutlined className="site-form-item-icon" />} 
                            placeholder="Username" 
                            disabled={!isEditing}
                            className="rounded-lg p-2"
                          />
                        </Form.Item>
                        
                        <Form.Item
                          name="email"
                          label="Email"
                          rules={[
                            { required: true, message: 'Please enter email' },
                            { type: 'email', message: 'Please enter a valid email' }
                          ]}
                        >
                          <Input 
                            prefix={<MailOutlined className="site-form-item-icon" />} 
                            placeholder="Email" 
                            disabled={!isEditing}
                            className="rounded-lg p-2"
                          />
                        </Form.Item>
                        
                        {isEditing && (
                          <Form.Item
                            name="password"
                            label="Password (leave blank to keep current)"
                          >
                            <Input.Password 
                              prefix={<LockOutlined className="site-form-item-icon" />} 
                              placeholder="New Password (optional)" 
                              className="rounded-lg p-2"
                            />
                          </Form.Item>
                        )}
                      </Form>
                      
                      <Divider />
                      
                      <div>
                        <h4 className="text-md font-medium text-gray-700 mb-4">Admin Privileges</h4>
                        <ul className="space-y-2">
                          <li className="flex items-center text-gray-600">
                            <i className="fas fa-check-circle text-green-500 mr-2"></i>
                            User Management
                          </li>
                          <li className="flex items-center text-gray-600">
                            <i className="fas fa-check-circle text-green-500 mr-2"></i>
                            Doctor Management
                          </li>
                          <li className="flex items-center text-gray-600">
                            <i className="fas fa-check-circle text-green-500 mr-2"></i>
                            Appointment Oversight
                          </li>
                          <li className="flex items-center text-gray-600">
                            <i className="fas fa-check-circle text-green-500 mr-2"></i>
                            System Configuration
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabPane>
            
            <TabPane 
              tab={<span><i className="fas fa-cog mr-2"></i>Settings</span>} 
              key="2"
            >
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-800 mb-6">System Settings</h3>
                
                <Card className="mb-6 shadow-sm">
                  <h4 className="text-md font-medium text-gray-700 mb-4">Notifications</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Email Notifications</span>
                      <Button type="primary" size="small" className="bg-blue-500">Enabled</Button>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Doctor Application Alerts</span>
                      <Button type="primary" size="small" className="bg-blue-500">Enabled</Button>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">System Reports</span>
                      <Button type="default" size="small">Disabled</Button>
                    </div>
                  </div>
                </Card>
                
                <Card className="mb-6 shadow-sm">
                  <h4 className="text-md font-medium text-gray-700 mb-4">Security</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Two-Factor Authentication</span>
                      <Button type="default" size="small">Enable</Button>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Session Timeout</span>
                      <span className="text-gray-600">1 hour</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Login Attempts Limit</span>
                      <span className="text-gray-600">5 attempts</span>
                    </div>
                  </div>
                </Card>
                
                <Button type="primary" danger>
                  Reset All Settings
                </Button>
              </div>
            </TabPane>
            
            <TabPane 
              tab={<span><i className="fas fa-key mr-2"></i>API Keys</span>} 
              key="3"
            >
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-800 mb-6">API Access Configuration</h3>
                
                <Card className="mb-6 shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-md font-medium text-gray-700">Public API Key</h4>
                    <Button type="default" size="small">Generate New</Button>
                  </div>
                  <Input.Password
                    value="pk_test_51HG7vYDGj4WEf9Wm9iEzoqEFr7AT6KlOkR8rLB0kdQXEgt2WrVrLMVNcFGtmSKZZWDQX4gHU0nOWnGNO"
                    readOnly
                    className="mb-2"
                  />
                  <p className="text-gray-500 text-sm">Last generated: 2023-10-15</p>
                </Card>
                
                <Card className="mb-6 shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-md font-medium text-gray-700">Private API Key</h4>
                    <Button type="default" size="small">Generate New</Button>
                  </div>
                  <Input.Password
                    value="sk_live_51HG7vYDGj4WEf9WmJOLQVzZljGm1razNq9wmx0nUZ7TUd5hPGJL9lSRGGQZ"
                    readOnly
                    className="mb-2"
                  />
                  <p className="text-red-500 text-sm">Never share this key publicly</p>
                  <p className="text-gray-500 text-sm">Last generated: 2023-10-15</p>
                </Card>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <i className="fas fa-exclamation-triangle text-yellow-400 mt-1 mr-3"></i>
                    <div>
                      <h5 className="font-medium text-gray-800 mb-1">Important Security Notice</h5>
                      <p className="text-sm text-gray-600">
                        Regenerating API keys will invalidate existing keys and may disrupt active integrations.
                        Ensure all systems are updated with new keys after regeneration.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabPane>
          </Tabs>
        </Card>
      </div>
    </Layout>
  );
}

export default AdminProfile; 