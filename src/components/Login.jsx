import React from 'react'
import { Link } from 'react-router-dom'
import './login.css'

function Login() {
  return (
    <div>
        <div className="login-page">
            <h1 className='login-title'>LOGIN PAGE</h1>
            <div className="form">
                <form action="">
                    <label htmlFor="emailid">Email Id :</label>
                    <input type="email" name="Email" id="emailid" placeholder='Enter Your Registered Email Id' required />
                    <br /><label htmlFor="pass">Pass Word</label>
                    <input type="password" name="PassWord" id="pass" placeholder='Enter Your PAssWord' required />
                   <br /> <button type="submit">Login</button>
                    <button type="reset">Reset</button>
                   <br /> <Link className='link new-user'>New User</Link>
                    <Link className='link forgot-password'>Forgot PassWord?</Link>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login