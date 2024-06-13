import React from 'react'
import { sideBarMenu } from '../Data/data'
import { Link, useLocation } from 'react-router-dom'

function Layout({ children }) {
  const location = useLocation()
  return (
    <div className="flex min-h-screen bg-gray-100 p-4 gap-6">
      <aside className="w-1/5 flex flex-col bg-teal-600 text-white rounded-lg shadow-md">
        <header className="text-center text-2xl font-bold p-4 bg-teal-700 rounded-t-lg">
          DOC APP
        </header>
        <nav className="flex-grow p-2 space-y-2">
          {sideBarMenu.map((menu, index) => {
            const isActive = location.pathname === menu.path;
            return (
              <Link
                key={index}
                to={menu.path}
                className={`flex items-center p-3 rounded-md transition-colors duration-200 ${isActive
                    ? 'bg-teal-200 text-teal-800 font-semibold shadow-sm'
                    : 'hover:bg-teal-500'
                  }`}
              >
                <i className={`mr-3 ${menu.icons} ${isActive ? 'text-teal-800' : 'text-white'}`}></i>
                <span className={`${isActive ? 'text-teal-800' : 'text-white'} text-sm`}>
                  {menu.name}
                </span>
              </Link>
            );
          })}
        </nav>
      </aside>

      <main className="w-4/5 flex flex-col gap-6">
        <header className="h-16 bg-white rounded-lg shadow-sm p-4 flex items-center border border-gray-300">
          Header
        </header>
        <section className="flex-grow bg-white rounded-lg shadow-sm p-6 border border-gray-300">
          {children}
        </section>
      </main>
    </div>




  )
}

export default Layout