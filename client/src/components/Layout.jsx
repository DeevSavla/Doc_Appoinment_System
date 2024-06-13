import React from 'react'
import { sideBarMenu } from '../Data/data'
import { Link,useLocation } from 'react-router-dom'

function Layout({children}) {
    const location = useLocation()
  return (
    <div className='flex min-h-screen p-2 gap-5'>
      <div className='w-1/5 flex flex-col'>
        <div className='bg-red-950 text-white text-center text-xl p-2 mb-1'>DOC APP</div>
        <div className='bg-red-950 text-white flex-grow'>
          {sideBarMenu.map((menu, index) => {
            const isActive = location.pathname === menu.path;
            return (
              <div
                key={index}
                className={`flex items-center gap-3 mx-5 my-3 p-2 rounded-md transition-colors duration-200 ${
                  isActive ? 'bg-white text-red-600 shadow-md' : 'hover:bg-red-800'
                }`}
              >
                <i className={`${menu.icons} ${isActive ? 'text-red-600' : 'text-white'}`}></i>
                <Link
                  to={menu.path}
                  className={`${isActive ? 'text-red-600 font-semibold' : 'text-white'} text-sm`}
                >
                  {menu.name}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      <div className='w-4/5 flex flex-col gap-5'>
        <div className='border border-black h-14'>Header</div>
        <div className='border border-black flex-grow'>{children}</div>
      </div>
    </div>
  )
}

export default Layout