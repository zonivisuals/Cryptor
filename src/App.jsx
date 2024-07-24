import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from "./components/layouts/navbar";
import Sidebar from "./components/layouts/sidebar";
import ProfileMenu from './components/in-sidebar/profileMenu';
import WalletMenu from './components/in-sidebar/walletMenu';
import CryptoContext from './contexts/CryptoContext';
import Dashboard from './components/pages/dashboard';
/* import Markets from './components/pages/markets';
import News from './components/pages/news' */
import Login from './components/pages/Login'
import Signup from './components/pages/Signup'
import Profile from './components/pages/Profile'
import Ticker from './components/layouts/ticker'
import './global.css'
import 'react-image-crop/dist/ReactCrop.css'

function App() {
  return (
    <CryptoContext>
      <div className='app'>
        <Navbar />
          <div>
            <div className='hero'>
              <Sidebar>
                <ProfileMenu />
                <WalletMenu />
              </Sidebar>

              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Navigate to="/dashboard" />} />
                  <Route path="/dashboard" element={<Dashboard/>} />
                  {/* <Route path="/markets" element={<Markets/>} />
                  <Route path="/news" element={<News/>} /> */}
                  <Route path="/login" element={<Login/>} />
                  <Route path="/signup" element={<Signup/>} />
                  <Route path="/profile" element={<Profile/>} />
                </Routes>
              </BrowserRouter>
            </div>
            <Ticker />
          </div>
      </div>
    </CryptoContext>
  );
}

export default App;
