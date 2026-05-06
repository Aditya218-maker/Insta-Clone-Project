import { RouterProvider } from "react-router"
import AppRoutes from "./AppRoutes"
import './Style.scss'
import { AuthProvider } from "./Features/Auth/auth.context.jsx"

const App = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}

export default App
