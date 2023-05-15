import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Layout from './navigation.layout'
import Login from '../view/login/login'
import App from './../view/app/app'

const Navigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path="Login" element={<Login />} />
          <Route path="App" element={<App />} />
          <Route path="*" element={<App />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Navigation
