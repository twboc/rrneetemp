import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Layout from './navigation.layout'
import Home from '../view/home/home'
import App from '../view/app/app'
import Client from '../view/client/client'
import Organisations from '../view/organisations/organisations'
import Search from '../view/search/search'
import Login from '../view/login/login'

const Navigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="app" element={<App />} />
          <Route path="client" element={<Client />} />
          <Route path="organisations" element={<Organisations />} />
          <Route path="search" element={<Search />} />
          <Route path="*" element={<App />} />
        </Route>
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Navigation
