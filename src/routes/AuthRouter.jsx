import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LoginPage from '../pages/auth/LoginPage'
import RegisterPage from '../pages/auth/RegisterPage'

const AuthRouter = () => {
    return (
        <Routes>
            <Route path="login" element={<LoginPage />} />
            <Route path='register' element={<RegisterPage/>}/>
        </Routes>
    )
}

export default AuthRouter