import React from 'react'
import '../styles/navbar.css'
import cryptorLogo from '../../assets/cryptor logo.svg'
import profilePic from '../../assets/pdp.jpeg' // will import it later from database

export default function Navbar() {
  return (
    <nav>
      <div className='left-nav'>

        <a href='#dashboard' className='left-left-nav'>
          <img src={cryptorLogo} alt="logo" className='cryptor-logo'/>
          <h1>Cryptor</h1>
        </a>

        <ul className='left-right-nav'>
          <li><a href="#dashboard">Dashboard</a></li>
          <li><a href="#markets">Markets</a></li>
          <li><a href="#wallet">Wallet</a></li>
          <li><a href="#news">News</a></li>
        </ul>

      </div>


      <div className='right-nav'>

        <select className='select-lang'>
          <option value="eng">ENG</option>
          <option value="fr">FR</option>
        </select>

        <select className='select-curr'>
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
        </select>

        <a href="#profile"><img src={profilePic} alt="profile-pic" className="profile-pic" /></a>
      
      </div>
    </nav>
  )
}
