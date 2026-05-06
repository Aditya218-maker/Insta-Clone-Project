/**
Ye State layer hai, specifically authentication state manage karne ke liye.
Matlab: poori app ka “auth control room”

Iska kaam hai:
user ka data store karna
login/register ka logic handle karna
ye data app ke har component ko available karwana

kyu banaya?
Socho tumhare paas 10 components hain:

Navbar
Profile
Dashboard
etc.

Sabko chahiye: User

Agar context nahi hota:
tum har jagah props bhejte rehte : parent → child → child → child
Ye messy ho jata
 */

/*
AuthProvider kya karta hai?
<AuthContext.Provider value={{User, loading, handleLogin, handleRegister}}>
  {children}
</AuthContext.Provider>

jo bhi component(children) iske andar hoga, use ye sab cheeze(value) mil jayengi

children kya hai?
<AuthProvider>
  <App />
</AuthProvider>

👉 Yaha: App = children

Matlab: App ke andar jitne bhi components hain, sabko access mil jayega
*/

import { createContext, useEffect, useState } from "react";

import {login, register, getMe} from '../Auth/Services/auth.api'

export const AuthContext = createContext()
/*
Context kya karta hai: ek global box bana diya jisme auth ka data rakhenge

Matlab:
User ka data
loading state
login/register functions

Ye sab ek jagah store hoga aur baaki components ise access kar sakte hain
 */

export function AuthProvider({ children }) {
/*
Ye ek wrapper component hai.

Iska kaam: jo bhi components iske andar aayenge unko auth data provide karega
*/


    const [User, setUser] = useState(null)
    const [loading, setloading] = useState(false)

    const handleLogin = async (email, password) => {

        //jab bhi user login hoga loading true ho jaega matlab abhi ham user o login karwane ka try krrhe hai
        setloading(true)

        try{
            const response = await login(email,password)
            setUser(response.user)
        }
        catch(err){
            console.log(err);
        }
    }

    const handleRegister = async (username, email, password) => {
        setloading(true)
        try{
            const response = await register(username, email, password)
            setUser(response.user)
        }
        catch(err){
            console.log(err);
        }
        finally {
            setloading(false)
        }
    }

    return (
        <AuthContext.Provider value={{User, loading, handleLogin, handleRegister}}>
            {children}
        </AuthContext.Provider>
    )
}


//Main logic:
/*


1. UI se call aata hai
Register.jsx: handleRegister(username, email, password)

2. Ye function yaha aata hai
const handleRegister = async (...) => {

3. Ye API ko call karta hai
const response = await register(username, email, password)

4. Backend se data aata hai

setUser(response.user)
👉 User save ho gaya

5. Ab sabko user mil jayega
Koi bhi component: const { User } = useContext(AuthContext)

#Simple flow: UI → Context → API → Backend
              Backend → Context → UI

*/