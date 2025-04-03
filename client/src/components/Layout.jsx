import React, { useState } from 'react'
import { adminMenu, userMenu } from '../Data/data'
import { Link,useLocation, useNavigate } from 'react-router-dom'
import logo from '../photos/logo.png'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from './Spinner'
import { message, Badge, Avatar } from 'antd'
import { setUser } from '../store/features/userSlice'

function Layout({ children }) {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.user)
  if (!user) {
    return (<Spinner />)
  }
  else {

      const doctorMenu = [
      {
        name: "Home",
        path: "/",
        icon: "fa-solid fa-house",
      },
      {
        name: "Appointments",
        path:`/doctor/appointments/${user?.data._id}`,
        icon: "fa-solid fa-list",
      },
      {
        name: "Profile",
        path: `/doctor/profile/${user?.data._id}`,
        icon: "fa-solid fa-user",
      },
      {
        name: "MediBot",
        path: "/chatbot",
        icon: "fa-solid fa-robot",
      },
    ];

    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => setIsOpen(!isOpen);

    const sidemenu = user.data.isAdmin ? adminMenu : user.data.isDoctor ? doctorMenu : userMenu

    const logoutHandler = () => {
      localStorage.clear()
      dispatch(setUser(null))
      message.success('Logout Succesfull.')
      navigate('/')
    }

    return (
      <div className="flex min-h-screen bg-gray-100 p-4 gap-6">
        <div className="md:hidden fixed top-0 left-0 z-50 flex items-center p-4 bg-blue-700 w-full">
          <button onClick={toggleSidebar} className="text-white">
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>

        <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-blue-600 text-white flex flex-col shadow-md transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 md:w-1/5 transition-transform duration-300`}>
          <header className="text-center text-2xl font-bold p-4 bg-blue-700">
            <img src={logo} alt="Logo" className="h-10 mx-auto" />
          </header>
          <nav className="flex-grow p-2 space-y-2">
            {sidemenu.map((menu, index) => {
              const isActive = location.pathname === menu.path;
              return (
                <Link
                  key={index}
                  to={menu.path}
                  className={`flex items-center p-3 rounded-md transition-colors duration-200 ${isActive ? 'bg-teal-200 text-blue-800 font-semibold shadow-sm' : 'hover:bg-blue-500'}`}
                >
                  <i className={`mr-3 ${menu.icon} ${isActive ? 'text-blue-800' : 'text-white'}`}></i>
                  <span className={`${isActive ? 'text-blue-800' : 'text-white'} text-sm`}>{menu.name}</span>
                </Link>
              );
            })}
            <div
              className="flex items-center p-3 rounded-md transition-colors duration-200 cursor-pointer"
              onClick={logoutHandler}
            >
              <i className="mr-3 fa-solid fa-right-from-bracket text-white"></i>
              <span className="text-white text-sm">Logout</span>
            </div>
          </nav>
        </aside>

        {isOpen && <div className="fixed inset-0 bg-black opacity-50 z-30" onClick={toggleSidebar}></div>}

        <main className="flex-1 flex flex-col gap-6">
          <header className="h-16 bg-white rounded-lg shadow-sm p-4 flex items-center border border-gray-300">
            <div onClick={()=>{navigate('/notificationpage')}}><Badge count={user?.data?.notifications?.length ?? 0}>
              <Avatar shape="square" size="large" />
            </Badge></div>
            <p className="ml-auto text-gray-800 text-xl">{user.data.username}</p>
          </header>

          <section className="flex-grow bg-white rounded-lg shadow-sm p-6 border border-gray-300">
            {children}
          </section>
        </main>
      </div>

    );
  }
}

export default Layout