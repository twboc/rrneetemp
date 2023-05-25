import React from 'react'
import './leftNav.scss'
import { Link } from 'react-router-dom'

const LeftNav = () => {
  return (
    <div className='leftNav shadow-2' >
      <Link to={'/home'}>Home</Link>
      <Link to={'/app'}>App</Link>
      <Link to={'/client'}>Client</Link>
      <Link to={'/organisation'}>Organisation</Link>
    </div>
  )
}

export default LeftNav
