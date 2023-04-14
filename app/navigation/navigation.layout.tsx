import React from 'react'
import {Outlet, Link} from 'react-router-dom'

const Layout = () => {
  return (
    <>
      <nav>
        <ul style={{display: 'flex'}}>
          <Link style={{marginRight: '10px'}} to="/">
            Home
          </Link>
          <Link to="/Login">Login</Link>
        </ul>
      </nav>

      <Outlet />
    </>
  )
}

export default Layout
