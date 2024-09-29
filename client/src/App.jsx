import React from 'react'
import Layout from './components/layout/Layout'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SignupPage from './pages/auth/SignupPage'
import LoginPage from './pages/auth/LoginPage'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
      <Toaster />
    </Layout>
  )
}

export default App