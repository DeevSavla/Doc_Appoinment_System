import React from 'react'
import headerbg from '../photos/header-bg.png'
import logo from '../photos/logo.png'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function Header() {
    const navigate = useNavigate()
    const handleSubmit =() =>{
        navigate('/login')
    }

  return (
    <nav
  className='flex items-center justify-between p-4 bg-cover bg-center rounded-lg shadow-md mb-4'
  style={{ backgroundImage: `url(${headerbg})` }}
>
  <img src={logo} alt="Logo" className='h-10' />
  <div className='flex gap-8 text-black'>
    <Link to='/' className='hover:text-blue-400 transition'>Home</Link>
    <Link to='/services' className='hover:text-blue-400 transition'>Services</Link>
    <Link to='/contact' className='hover:text-blue-400 transition'>Contact</Link>
  </div>
  <button className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition' onClick={handleSubmit}>
    Log In
  </button>
</nav>
  )
}

export default Header