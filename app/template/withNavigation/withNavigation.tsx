import React, {FC} from 'react'
import {Link} from 'react-router-dom'
import style from './withNavigation.style'

const SiteLinks = () => {
  return (
    <ul style={style.links}>
      <Link to="/">
        Home
      </Link>
      <Link to="/login">Login</Link>
      <Link to="/app">App</Link>
    </ul>
  )
}

const withNavigation = (Content: FC) => (props: any) => {
  return (
    <>
      <nav style={style.nav}>
        <SiteLinks />
      </nav>
      <Content />
    </>
  )
}

export default withNavigation
