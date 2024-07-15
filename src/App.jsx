import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from "./components/layouts/navbar";
import Sidebar from "./components/layouts/sidebar";
import ProfileMenu from './components/in-sidebar/profileMenu';
import WalletMenu from './components/in-sidebar/walletMenu';
import CryptoDashboard from './components/pages/dashboard';
import CryptoContext from './CryptoContext';
import Dashboard from './components/pages/dashboard';
import Markets from './components/pages/markets';
import News from './components/pages/news'

import './global.css'


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

            <BrowserRouter>
              <Routes>
                <Route path="/dashboard" element={<Dashboard/>} />
                <Route path="/markets" element={<Markets/>} />
                <Route path="/news" element={<News/>} />
              </Routes>
            </BrowserRouter>
            
        </div>
      </div>
    </CryptoContext>
  );
}

export default App;
