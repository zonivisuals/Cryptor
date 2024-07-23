import React, { useState } from 'react'
import profilePic from '../../assets/pdp.jpeg' // will import it later from database



function Profile() {

  return (
    <div className='profil-page'>
      <div className='left-col'>

        <h2>Welcome username</h2>
        <div className='left-col-inputs'>
          <div className='left-col-inputs-username'>
            <label htmlFor="username-input">new username</label>
            <input type="text" id="username-input"/>
          </div>

          <div className='left-col-inputs-password'>
            <label htmlFor="password-input">new password</label>
            <input type="password" id="password-input"/>
          </div>

          <div className='left-col-inputs-password-confirm'>
            <label htmlFor="password-confirm-input">confirm password</label>
            <input type="text" id="password-confirm-input"/>
          </div>

        </div>
      </div>2

      <div className='right-col'>
        <img src={profilePic} alt="" />        
      </div>

    </div>
    
)
}

export default Profile