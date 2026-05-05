import React, {useState} from 'react'
import './Styles/Form.scss'
import { Link } from 'react-router'
import axios from 'axios'


const Login = () => {

  const [Username, setUsername] = useState("")
  const [password, setpassword] = useState("")

  function handleSubmit(e){
    e.preventDefault()

    axios.post("http://127.0.0.1:3000/api/auth/login",{
      username: Username, password
    },{withCredentials:true})
    .then(res=>{
      console.log(res.data);
      
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
                onInput={(e)=>{setpassword(e.target.value)}}
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