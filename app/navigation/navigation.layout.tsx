import React from 'react'
import {Outlet} from 'react-router-dom'
import Header from '../component/header/header'
import LeftNav from '../component/leftNav/leftNav'
import Content from '../component/content/content'

const Layout = () => {
  return (
    <>
    <Header />
    <div style={{ display: 'flex', flexDirection: 'row'}}>
      <LeftNav />
      <Content>
        <Outlet />
      </Content>
    </div>
    </>
    
  )
}
 
export default Layout
