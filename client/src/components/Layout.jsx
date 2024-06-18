import React from 'react'
import { adminMenu, userMenu } from '../Data/data'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from '../photos/logo.png'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from './Spinner'
import {message} from 'antd'
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
    const sidemenu = user.data.isAdmin ? adminMenu : userMenu
  
    const logoutHandler = () =>{
      localStorage.clear()
      dispatch(setUser(null))
      message.success('Logout Succesfull.')
      navigate('/')
    }
    
    return (
      <div className="flex min-h-screen bg-gray-100 p-4 gap-6">
        <aside className="w-1/5 flex flex-col bg-blue-600 text-white rounded-lg shadow-md">
          <header className="text-center text-2xl font-bold p-4 bg-blue-700 rounded-t-lg">
            <img src={logo} alt="Logo" className='h-10' />
          </header>
          <nav className="flex-grow p-2 space-y-2">
            {sidemenu.map((menu, index) => {
              const isActive = location.pathname === menu.path;
              return (
                <Link
                  key={index}
                  to={menu.path}
                  className={`flex items-center p-3 rounded-md transition-colors duration-200 ${isActive
                    ? 'bg-teal-200 text-blue-800 font-semibold shadow-sm'
                    : 'hover:bg-blue-500'
                    }`}
                >
                  <i className={`mr-3 ${menu.icon} ${isActive ? 'text-blue-800' : 'text-white'}`}></i>
                  <span className={`${isActive ? 'text-blue-800' : 'text-white'} text-sm`}>
                    {menu.name}
                  </span>
                </Link>
              );
            })}
            <div
              className={`flex items-center p-3 rounded-md transition-colors duration-200` }
              onClick={logoutHandler}
            >
              <i className={`mr-3 fa-solid fa-right-from-bracket`}></i>
              <Link to='/'>Logout</Link>
            </div>
          </nav>
        </aside>

        <main className="w-4/5 flex flex-col gap-6">
          <header className="h-16 bg-white rounded-lg shadow-sm p-4 flex items-center border border-gray-300">
            {user.data.username}
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