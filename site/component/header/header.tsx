import React from 'react'
import SiteLinks from '../siteLinks/siteLinks'
import style from './header.style'

const Header = () => {
  return (
    <div
      style={style.container}>
      <SiteLinks />
    </div>
  )
}

export default Header
