import React, {FC} from 'react'
import {Link} from 'react-router-dom'

const SiteLinks = () => {
  return (
    <ul style={{display: 'flex'}}>
      <Link style={{marginRight: '10px'}} to="/">
        Home
      </Link>
      <Link to="/Login">Login</Link>
      <Link to="/App">App</Link>
    </ul>
  )
}

const withNavigation = (Content: FC) => (props: any) => {
  return (
    <>
      <nav
        style={{
          border: '1px solid black',
          width: '100%',
          height: '80px',
        }}>
        <SiteLinks />
      </nav>
      <Content />
    </>
  )
}

export default withNavigation
