//is login.jsx ka kaam hai ui dikhana but ye axios ki help se backend communication b handle krrhi hai 
// But according to React architecture UI layer toh backend se communicate karti hi nahi 
// toh hame axios wala code hatana padega aur use kisi aur file me likhna padega. Same kaam register.jsx file me b karna hai 

// Toh hame baaki layers develop karni hai is order me API layer->State Layer-> Hooks

import {useState, useContext} from 'react'
import '../Styles/Form.scss'
import { Link } from 'react-router'
import {useAuth} from '../Hooks/useAuth'



const Login = () => {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const {handleLogin} = useAuth()
  // use Auth se handle login nikala taaki usko use kr paaye

  async function handleSubmit(e){
    e.preventDefault()

    handleLogin(username, password)
    .then(res => {
      console.log(res);
    })
  }

  return (
    <main>
        <div className="form-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>

                <input 
                onInput={(e)=>{setUsername(e.target.value)}}
                type="text" name='username' placeholder='Enter username'
                />

                <input 
                onInput={(e)=>{setPassword(e.target.value)}}
                type="password" name='password' placeholder='Enter password'
                />

                <button type='Submit'>Login</button>
            </form>
            <p>Make an account <Link className='ToggleAuthForm' to="/register">Register</Link></p>
        </div>
    </main>
  )
}

export default Login



//Ui layer sirf Hook se communicate karti hai 