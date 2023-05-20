import React from 'react'
import './leftNav.scss'
import { Link } from 'react-router-dom'

const LeftNav = () => {
  return (
    <div className='leftNav shadow-2' >
      <Link to={'/App'}>App</Link>
      <Link to={'/Client'}>Client</Link>
    </div>
  )
}

export default LeftNav
