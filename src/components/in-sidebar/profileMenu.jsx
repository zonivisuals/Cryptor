import React from 'react'
import profilePic from '../../assets/pdp.jpeg' // will import it later from database
import '../styles/profileMenu.css'

export default function ProfileMenu() {
  return (
    <div className='profile-menu'>
      <a href="profile"><img src={profilePic} alt="pdp" className='profile-pic' /></a>
      <div className='profile-menu-props'>
        <p className='profile-username'>zoni</p> {/*username later from db*/}
        <p className='profile-balance'>Cryptor user</p> {/* balance later from wallet feature... */}
      </div>
    </div>
  )
}
