import React from 'react'
import Layout from './Layout'
import {useSelector} from 'react-redux'
import Spinner from './Spinner'

function HomePage() {

  const { user } = useSelector(state => state.user)
  if(!user) {
    return (<Spinner/>)
  }
  else{
    return (<Layout><div>HomePage</div></Layout>)
  }
}

export default HomePage