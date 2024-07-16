import React from 'react'

function Signup() {
  return (
    <div className='singup-page'>
      <h1>Connect to your account, now</h1>

      <form action="" className='signup-form'>
        <label htmlFor="signup-username">Username</label>
        <input type="text" id='signup-username' />

        <label htmlFor="signup-email">Email</label>
        <input type="email" id='signup-email' />

        <label htmlFor="signup-password">Password</label>
        <input type="password" id='signup-password' />

        <label htmlFor="signup-confirm-password">Confirm password</label>
        <input type="password" id='signup-confirm-password' />

        <button type='submit'>Sign up</button>

        <p>Alreay have an account? Sign in</p>
      </form>

    </div>
  )
}

export default Signup