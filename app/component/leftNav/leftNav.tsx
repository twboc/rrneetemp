import React from 'react'
import './leftNav.scss'
import {Link} from 'react-router-dom'

const LeftNav = () => {
  return (
    <div className="leftNav shadow-2">
      <Link to={'/home'}>Home</Link>
      <Link to={'/organisations'}>Organisations</Link>
      <Link to={'/search'}>Search</Link>
      <Link to={'/tracker'}>Tracker</Link>
    </div>
  )
}

export default LeftNav
