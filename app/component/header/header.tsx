import React from 'react'
import './header.style.scss'
import HeaderLeft from './header.left'
import HeaderMain from './header.main'
import HeaderRight from './header.right'

const Header = () => {
  return (
    <div className="header_container shadow-1">
      <HeaderLeft />
      <HeaderMain />
      <HeaderRight />
    </div>
  )
}

export default Header
