import React, { FC } from 'react'
import {Outlet} from 'react-router-dom'
import Header from '../component/header/header'
import LeftNav from '../component/leftNav/leftNav'
import Content from '../component/content/content'

const Layout = () => {
  return (
    <>
      <Header />
      <LeftNav />
      <Content>
        <Outlet />
      </Content>
    </>
  )
}
 
export default Layout
