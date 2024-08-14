import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { showloading, hideloading } from '../store/features/alertSlice'
import axios from 'axios'
import { setUser} from '../store/features/userSlice'
import {baseUrl} from '../utilities/baseUrl'

function ProtectedRoute({ children }) {

    const dispatch = useDispatch()
    const { user } = useSelector(state => state.user)
  
    const getData = async () => {
      try {
        dispatch(showloading())
        const res = await axios.post(`${baseUrl}/user/getUserData`, {
          token: localStorage.getItem('token')
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        dispatch(hideloading())
        if (res.data) {
          dispatch(setUser(res.data.data))
        } else {
          <Navigate to='/login' />
        }
      } catch (error) {
        dispatch(hideloading())
        localStorage.clear()
        console.log(error)
      } 
    }
  
    useEffect(() => {
      if (!user) {
        getData();
      }
    }, [user,getData])

    if (localStorage.getItem('token')) {
        return children;
    } else {
        return <Navigate to="/" />;
    }
}

export default ProtectedRoute