import { BrowserRouter, Routes, Route } from 'react-router'

import Login from './Features/Auth/Pages/Login'
import Register from './Features/Auth/Pages/Register'

function AppRoutes(){
    return (
        <BrowserRouter>
        <Routes>
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
        </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes