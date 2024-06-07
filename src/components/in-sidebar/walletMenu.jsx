import React from 'react'
import '../styles/walletMenu.css'
import illustration from '../../assets/illustration.svg'

//connect-wallet feature soon
export default function walletMenu() {
  return (
    <div className='wallet-menu'>
      <img className='wallet-menu-illustration' src={illustration} alt="illustration here" />
      <div className='wallet-menu-card'>
        <h1 className='wallet-menu-title'>Get more with your Wallet</h1>
        <p className='wallet-menu-text'>Оpen advanced functionality with your wallet and unlock new opportunities</p>
      </div>    
        <a className='wallet-menu-btn' href="#wallet"><button>Coming Soon</button></a>
    </div>
  )
}
