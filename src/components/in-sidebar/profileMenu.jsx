import React from 'react'
import profilePic from '../../assets/pdp.jpeg' // will import it later from database
import '../styles/profileMenu.css'

export default function ProfileMenu() {
  return (
    <div className='profile-menu'>
      <img src={profilePic} alt="pdp" className='profile-pic' />
      <div className='profile-menu-props'>
        <p className='profile-username'>zoni</p> {/*username later from db*/}
        <p className='profile-balance'>≈ $16.48</p> {/* balance later from wallet feature... */}
      </div>
    </div>
  )
}
