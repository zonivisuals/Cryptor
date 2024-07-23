import React from 'react'
import '../styles/Signup.css'

function Signup() {
  return (
    <div className='singup-page'>
      <h1>Connect to your account, now</h1>

      <form action="" className='signup-form'>
        <label htmlFor="signup-username">Username</label>
        <input type="text" id='signup-username' required />

        <label htmlFor="signup-email">Email</label>
        <input type="email" id='signup-email' required />

        <label htmlFor="signup-password">Password</label>
        <input type="password" id='signup-password' required />

        <label htmlFor="signup-confirm-password">Confirm password</label>
        <input type="password" id='signup-confirm-password' />

        <button type='submit'>Sign up</button>
        <p>Alreay have an account? Sign in</p>

      </form>

    </div>
  )
}

export default Signup