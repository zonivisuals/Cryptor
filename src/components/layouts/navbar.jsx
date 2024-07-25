import React, { useState } from 'react'
import '../styles/navbar.css'
import cryptorLogo from '../../assets/cryptor logo.svg'
import profilePic from '../../assets/pdp.jpeg'
import { CryptoState } from '../../contexts/CryptoContext'

export default function Navbar() {

  const { setCurrency } = CryptoState()

  //handle clicked navlinks
  document.addEventListener('DOMContentLoaded', () => {
    const navlinks = document.querySelectorAll('.navlink');
  
    navlinks.forEach(link => {
      link.addEventListener('click', () => {
        navlinks.forEach(link => link.classList.remove('active'));
        link.classList.add('active');
      });
    });
  });

  const handleMobileNavToggle = ()=>{
    const mobileNav = document.querySelectorAll('.left-right-nav')
    const navToggle = document.querySelectorAll('mobile-nav-toggle')

    const visibility = mobileNav.getAttribute('data-visible') 
    if(visibility === 'false'){
      mobileNav.setAttribute('data-visible', true)
    }
    else{
      mobileNav.setAttribute('data-visible', false)
    }
  }




  return (
    <nav>  

      <button onClick={handleMobileNavToggle} className='mobile-nav-toggle' aria-expanded='false' aria-controls='left-right-nav'>
        <span class="material-symbols-outlined">
          menu
        </span> 
      </button>

      <div className='left-nav'>

        <a href='/dashboard' className='left-left-nav'>
          <img src={cryptorLogo} alt="logo" className='cryptor-logo'/>
          <h1>Cryptor</h1>
        </a>

        <ul className='left-right-nav' data-visible='false'>
          <li><a className='navlink' href="dashboard" active>Dashboard</a></li>
          <li><a className='navlinko' href="#" style={{color : 'rgba(255, 255, 255, 0.4)'}}>Markets</a></li>
          <li><a className='navlinko' href="#" style={{color : 'rgba(255, 255, 255, 0.4)'}}>News</a></li>
        </ul>

      </div>


      <div className='right-nav'>

        <select className='select-curr' onChange={(e) => setCurrency(e.target.value)}>
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
        </select>

        <a href="profile" className='profile-link'><img src={profilePic} alt="profile-pic" className="profile-pic" /></a>
      
      </div>
    </nav>
  )
}
