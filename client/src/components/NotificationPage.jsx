import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import { message, Tabs } from 'antd';
import axios from 'axios';
import Spinner from './Spinner';
import { hideloading, showloading } from '../store/features/alertSlice';

function NotificationPage() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMarkAllRead = async () => {
    try {
      dispatch(showloading());
      const res = await axios.post(
        "http://localhost:8080/api/v1/user/get-all-notifications",
        {
          userId: user.data._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideloading());
      dispatch(hideloading())
      if (error.response.data.message) {
        message.error(error.response.data.message)
      } else {
        message.error('Some error while reading.');
      }
    } catch (error) {
      dispatch(hideloading());
      message.error("Error while reading Notifications.");
    }
  };

  const handleDeleteAllRead = async () => {
    try {
      dispatch(showloading());
      const res = await axios.post(
        "http://localhost:8080/api/v1/user/delete-all-notifications",
        { userId: user.data._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideloading())
      if (error.response.data.message) {
        message.error(error.response.data.message)
      } else {
        message.error('Some error while deleting.');
      }
    } catch (error) {
      dispatch(hideloading());
      message.error("Error while deleting Notifications.");
    }
  };

  if (!user) {
    return (<Spinner />);
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto p-4">
        <h4 className="text-center text-lg font-bold mb-4">Notification Page</h4>
        <Tabs defaultActiveKey="0">
          <Tabs.Item key="0" tab="Unread">
            <div className="flex justify-end mb-4">
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200" onClick={handleMarkAllRead}>
                Mark All Read
              </button>
            </div>
            {user?.data.notifications.map((nmessage) => (
              <div className="bg-white rounded-lg shadow-md mb-4 cursor-pointer" key={Date.now()} onClick={() => navigate(nmessage.onClickPath)}>
                <div className="p-4">{nmessage.message}</div>
              </div>
            ))}
          </Tabs.Item>
          <Tabs.Item key="1" tab="Read">
            <div className="flex justify-end mb-4">
              <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200" onClick={handleDeleteAllRead}>
                Delete All Read
              </button>
            </div>
            {user?.data.seennotifications.map((nmessage) => (
              <div className="bg-white rounded-lg shadow-md mb-4 cursor-pointer" key={Date.now()} onClick={() => navigate(nmessage.onClickPath)}>
                <div className="p-4">{nmessage.message}</div>
              </div>
            ))}
          </Tabs.Item>
        </Tabs>
      </div>
    </Layout>
  );
}

export default NotificationPage;
