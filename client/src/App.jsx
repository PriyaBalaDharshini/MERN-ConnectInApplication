import React from 'react'
import Layout from './components/layout/Layout'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SignupPage from './pages/auth/SignupPage'
import LoginPage from './pages/auth/LoginPage'
import toast, { Toaster } from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from './library/axios'

const App = () => {
  const { data: authUser, isLoading } = useQuery({
    queryKey: ['authUser'],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/auth/me")
        //console.log(res.data);
        return res.data;
      } catch (error) {
        if (error.response && error.response.status === 401) {
          return null
        }
        toast.error("Something went wrong")

      }
    }
  });
  if (isLoading) return null;

  return (
    <Layout>
      <Routes>
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to={"/login"} />} />
        <Route path='/signup' element={!authUser ? <SignupPage /> : <Navigate to={"/"} />} />
        <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to={"/"} />} />
      </Routes>
      <Toaster />
    </Layout>
  )
}

export default App