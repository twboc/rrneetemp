import React from 'react'
import './leftNav.scss'
import { Link } from 'react-router-dom'

const LeftNav = () => {
  return (
    <div className='leftNav shadow-2' >
      <Link to={'/Home'}>Home</Link>
      <Link to={'/App'}>App</Link>
      <Link to={'/Client'}>Client</Link>
      <Link to={'/Organisation'}>Organisation</Link>
    </div>
  )
}

export default LeftNav
