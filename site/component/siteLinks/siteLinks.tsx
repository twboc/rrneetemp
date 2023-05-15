import React from 'react'
import {Link} from 'react-router-dom'

const SiteLinks = () => {
  return (
    <ul style={{display: 'flex'}}>
      <Link style={{marginRight: '10px'}} to="/">
        Home
      </Link>
      <Link to="/Login">Login</Link>
    </ul>
  )
}

export default SiteLinks
