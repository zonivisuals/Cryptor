import React from 'react'
import '../styles/navbar.css'
import cryptorLogo from '../../assets/cryptor logo.svg'
import profilePic from '../../assets/pdp.jpeg' // will import it later from database
import { CryptoState } from '../../CryptoContext'

export default function Navbar() {

  const {currency, setCurrency} = CryptoState()


  return (
    <nav>  
      <div className='left-nav'>

        <a href='#dashboard' className='left-left-nav'>
          <img src={cryptorLogo} alt="logo" className='cryptor-logo'/>
          <h1>Cryptor</h1>
        </a>

        <ul className='left-right-nav'>
          <li><a className='navlink' href="#dashboard" active>Dashboard</a></li>
          <li><a className='navlink' href="#markets">Markets</a></li>
          <li><a className='navlink' href="#wallet">Wallet</a></li>
          <li><a className='navlink' href="#news">News</a></li>
        </ul>

      </div>


      <div className='right-nav'>

        <select className='select-lang'>
          <option value="eng">ENG</option>
          <option value="fr">FR</option>
        </select>

        <select className='select-curr' onChange={(e) => setCurrency(e.target.value)}>
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
        </select>

        <a href="#profile" className='profile-link'><img src={profilePic} alt="profile-pic" className="profile-pic" /></a>
      
      </div>

    </nav>
  )
}
