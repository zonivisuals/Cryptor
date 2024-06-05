import React from 'react'
import '../styles/navbar.css'
import cryptorLogo from '../../assets/cryptor logo.svg'
import profilePic from '../../assets/pdp.jpeg' // will import it later from database

export default function Navbar() {
  return (
    <>
      <div className='left-nav'>
        <h1>cryptor</h1>
        <img src={cryptorLogo} alt="profile-picture" className='profile-pic'/>
      </div>


      <div className='mid-nav'>
        <ul>
          <li><a href="#dashboard">Dashboard</a></li>
          <li><a href="#markets">Markets</a></li>
          <li><a href="#wallet">Wallet</a></li>
          <li><a href="#news">News</a></li>
        </ul>
      </div>


      <div className='right-nav'>
        
        <div className='select-container'>
          <select className='select-lang'>
            <option value="eng">ENG</option>
            <option value="fr">FR</option>
          </select>

          <select className='select-curr'>
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
          </select>
        </div>

        <img src={profilePic} alt="profile-pic" className="profile-pic" />
      
      </div>
    </>
  )
}
