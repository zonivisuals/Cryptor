import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Navbar from "./components/layouts/navbar"
import Sidebar from "./components/layouts/sidebar"
import ProfileMenu from './components/in-sidebar/profileMenu'
import WalletMenu from './components/in-sidebar/walletMenu'
import Dashboard from './components/pages/dashboard'
import CryptoChart from './components/in-dashboard/CryptoChart'
import CryptoContext from './CryptoContext'
import CoinsTable from './components/in-dashboard/CoinsTable'

function App() {
  return (
    <CryptoContext>
      <div className='app'>
        <Navbar/>

        <Sidebar>
          <ProfileMenu/>
          <WalletMenu/>
        </Sidebar>
        
        <Dashboard>
          <CryptoChart/>
          <CoinsTable/>
        </Dashboard>
      </div>
    </CryptoContext>
  )
}
export default App;
