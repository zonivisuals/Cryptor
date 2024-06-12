import React from 'react'
import Navbar from "./components/layouts/navbar"
import Sidebar from "./components/layouts/sidebar"
import ProfileMenu from './components/in-sidebar/profileMenu'
import WalletMenu from './components/in-sidebar/walletMenu'
import Dashboard from './components/pages/dashboard'
import CryptoChart from './components/in-dashboard/CryptoChart'

function App() {
  return (
    <div className='app'>
      <Navbar/>

      <Sidebar>
        <ProfileMenu/>
        <WalletMenu/>
      </Sidebar>
      
      <Dashboard>
        <CryptoChart/>
      </Dashboard>
    </div>
  )
}
export default App;
