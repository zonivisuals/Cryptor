import React from 'react';
import Navbar from "./components/layouts/navbar";
import Sidebar from "./components/layouts/sidebar";
import ProfileMenu from './components/in-sidebar/profileMenu';
import WalletMenu from './components/in-sidebar/walletMenu';
import Dashboard from './components/pages/dashboard';
import CryptoContext from './CryptoContext';
import './global.css';

function App() {
  return (
    <CryptoContext>
      <div className='app'>
        <Navbar />
          <div className='hero'>
            <Sidebar>
              <ProfileMenu />
              <WalletMenu />
            </Sidebar>
            <Dashboard />
        </div>

      </div>
    </CryptoContext>
  );
}

export default App;
