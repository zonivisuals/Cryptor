import React from 'react'
import Navbar from "./components/layouts/navbar";
import Sidebar from "./components/layouts/sidebar";
import ProfileMenu from './components/in-sidebar/profileMenu';
import WalletMenu from './components/in-sidebar/walletMenu';

function App() {
  return (
    <div>
      <Navbar/>
      <Sidebar>
        <ProfileMenu/>
        <WalletMenu/>
      </Sidebar>
    </div>
  )
}

export default App;
