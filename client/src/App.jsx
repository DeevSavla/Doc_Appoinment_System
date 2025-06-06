import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './components/HomePage'
import Login from './components/Login'
import Register from './components/Register'
import Changepassword from './components/Changepassword'
import Spinner from './components/Spinner'
import { useSelector } from 'react-redux'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'
import MainLayout from './components/MainLayout'
import MainPage from './components/MainPage'
import ApplyDoctor from './components/ApplyDoctor'
import NotificationPage from './components/NotificationPage'
import Users from './components/Admin/Users'
import Doctors from './components/Admin/Doctors'
import Profile from './components/Doctor/Profile'
import BookingPage from './components/BookingPage'
import AppointmentPage from './components/AppointmentPage'
import Services from './components/Services'
import Contact from './components/Contact'
import AdminProfile from './components/Admin/AdminProfile'
import Chatbot from './components/Chatbot'

function App() {
  const { loading } = useSelector(state => state.alerts)
  return (
    <BrowserRouter>
      {loading ? (<Spinner />) : (
        <Routes>
          <Route path='/' element={<MainLayout><MainPage/></MainLayout>} />
          <Route path='/services' element={<MainLayout><Services/></MainLayout>} />
          <Route path='/contact' element={<MainLayout><Contact/></MainLayout>} />
          <Route path='/login' element={<PublicRoute><MainLayout><Login /></MainLayout></PublicRoute>} />
          <Route path='/register' element={<PublicRoute><MainLayout><Register /></MainLayout></PublicRoute>} />
          <Route path='/changepass' element={<PublicRoute><MainLayout><Changepassword /></MainLayout></PublicRoute> } />
          <Route path='/apply-doctor' element={<ProtectedRoute><ApplyDoctor/></ProtectedRoute>}/>
          <Route path='/homepage' element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path='/notificationpage' element={<ProtectedRoute><NotificationPage/></ProtectedRoute>} />
          <Route path='/admin/users' element={<ProtectedRoute><Users/></ProtectedRoute>}/>
          <Route path='/admin/doctors' element={<ProtectedRoute isAdmin>
            <Doctors />
          </ProtectedRoute>} />
          <Route path='/admin/profile' element={<ProtectedRoute isAdmin>
            <AdminProfile />
          </ProtectedRoute>} />
          <Route path='/admin/user/:id' element={<ProtectedRoute isAdmin>
            <Users />
          </ProtectedRoute>} />
          <Route path='/doctor/profile/:id' element={<ProtectedRoute><Profile/></ProtectedRoute>} />
          <Route path='/doctor/booking-appointment/:doctorId' element={<ProtectedRoute><BookingPage/></ProtectedRoute>} />
          <Route path='/doctor/appointments/:doctorId' element={<ProtectedRoute><AppointmentPage/></ProtectedRoute>} />
          <Route path='/chatbot' element={<ProtectedRoute><Chatbot/></ProtectedRoute>} />
        </Routes>
      )}
    </BrowserRouter>
  )
}

export default App
