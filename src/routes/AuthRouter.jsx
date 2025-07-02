import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LoginPage from '../components/auth/LoginPage'
import RegisterPage from '../components/auth/RegisterPage'

const AuthRouter = () => {
    return (
        <Routes>
            <Route path="login" element={<LoginPage />} />
            <Route path='register' element={<RegisterPage/>}/>
        </Routes>
    )
}

export default AuthRouter