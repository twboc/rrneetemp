import React from 'react'
import SiteLinks from '../siteLinks/siteLinks'

const Header = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100px',
        borderBottom: '1px solid black',
      }}>
      <SiteLinks />
      App header
    </div>
  )
}

export default Header
