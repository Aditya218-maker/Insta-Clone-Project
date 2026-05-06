import { useState, useContext } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../auth.context'

/**
Postman → testing tool tha
auth.api.js → same kaam code me kar raha hai
JSX (UI) → user se input lekar usko call karta hai
*/

const Register = () => {
//Performing 2 way Binding
//useState React me data store karne ke liye hota hai jo UI me change hota rehta hai.

  const [username, setUsername] = useState("")   
  /*Ye React ka state hai (matlab temporary data jo UI me use hota hai)

   Username → current value (jo user input karega)

   setUsername → value update karne ka tareeka yaani ki wo function jo value update karega

  <input onChange={(e) => setUsername(e.target.value)} /> 
  User jo type karega: wo username me store hota rahega
  */

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { handleRegister } = useContext(AuthContext)

  async function handleSubmit(e) {
    e.preventDefault()
    /**
Whenever you see:
ERR_CONNECTION_REFUSED
server clearly running

👉 Try: localhost → 127.0.0.1

Because 
localhost → sometimes resolves to IPv6 (::1)
Your server → listening on IPv4 (127.0.0.1)
Browser → tries wrong address → ❌ connection refused

Switching to:

http://127.0.0.1:3000

forces IPv4 → ✅ works instantly
     */

    // axios.post("http://127.0.0.1:3000/api/auth/register", { 
    //   username: Username, email: Email, password 
    // },{
    //   withCredentials:true
    // })
    // .then(res => {
    //   console.log((res.data));
    // })
    await handleRegister(username, email, password)
  }
  
/*By default axios cookie me data save nahi krta jo ki hame toh karna hai so ek aur object paas krte hai : withCredentials:true
aur backend me app.js me cors middleware ko origin bhi dena hota hai matlab kaha pe cookies me set krrhe ho 
origin: "http://localhost:5173"
Now go on inspect=> application=> cookies
*/

  return (
    <main>
      <div className="form-container">

        <h1>Register</h1>

        <form onSubmit={handleSubmit}>

          <input 
          onInput={(e)=>{setUsername(e.target.value)}}
          type="text" name='username' placeholder='Enter username' 
          />

          <input 
          onInput={(e)=>{setEmail(e.target.value)}}
          type="text" name='email' placeholder='Enter email' 
          />

          <input 
          onInput={(e)=>{setPassword(e.target.value)}}
          type="text" name='password' placeholder='Enter password' 
          />

          <button>Register</button>

        </form>
        

        <p>Already have an account? <Link className='ToggleAuthForm' to="/login">Login</Link></p>
      </div>
    </main>
  )
}

export default Register