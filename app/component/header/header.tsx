import React from 'react'
import Logout from '../logout/logout'

const Header = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100px',
        borderBottom: '1px solid black',
      }}>
      App header

      <Logout />
    </div>
  )
}

export default Header
