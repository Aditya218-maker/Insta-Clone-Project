import { BrowserRouter, Routes, Route } from 'react-router'

import Login from './Features/Auth/Pages/Login'
import Register from './Features/Auth/Pages/Register'

function AppRoutes(){
    return (
        <BrowserRouter>
        <Routes>
            <Route path='/' element={<h1>Welcome to your App</h1>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
        </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes