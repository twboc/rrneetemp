import React from 'react'
// import ReactDOM from 'react-dom/client'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Layout from './navigation.layout'
import Main from './../view/main/main'
import Login from './../view/login/login'

const Navigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="Main" element={<Main />} />
          <Route path="Login" element={<Login />} />
          {/* <Route path="*" element={<NoPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Navigation
