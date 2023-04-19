import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Layout from './navigation.layout'
import Main from './../view/main/main'
import Login from './../view/login/login'
import App from './../view/app/app'
import None from './../view/none/none'

const Navigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="Main" element={<Main />} />
          <Route path="Login" element={<Login />} />
          <Route path="App" element={<App />} />
          <Route path="*" element={<None />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Navigation
