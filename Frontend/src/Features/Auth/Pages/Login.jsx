import React from 'react'
import './Styles/Form.scss'

const Login = () => {
  return (
    <main>
        <div className="form-container">
            <h1>Login</h1>
            <form >
                <input type="text" name='username' placeholder='Enter username'/>
                <input type="password" name='password' placeholder='Enter password'/>
                <button type='Submit'>Login</button>
            </form>
        </div>
    </main>
  )
}

export default Login