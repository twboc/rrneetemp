import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Layout from './navigation.layout'
import Home from '../view/home/home'
import App from '../view/app/app'
import Client from '../view/client/client'
import Organisation from '../view/organisation/organisation'
import Login from '../view/login/login'

const Navigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="Home" element={<Home />} />
          <Route path="App" element={<App />} />
          <Route path="Client" element={<Client />} />
          <Route path="Organisation" element={<Organisation />} />
          <Route path="*" element={<App />} />
        </Route>
        <Route path="Login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Navigation
