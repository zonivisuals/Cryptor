import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from "./components/layouts/navbar";
import Sidebar from "./components/layouts/sidebar";
import ProfileMenu from './components/in-sidebar/profileMenu';
import WalletMenu from './components/in-sidebar/walletMenu';
import Dashboard from './components/pages/dashboard';
import CryptoChart from './components/in-dashboard/CryptoChart';
import CryptoContext from './CryptoContext';

function App() {
  return (
    <CryptoContext>
      <BrowserRouter>
        <div className='app'>
          <Navbar />
          <Sidebar>
            <ProfileMenu />
            <WalletMenu />
          </Sidebar>
          <Routes>
            <Route path='/' element={<Dashboard />}>
              <Route path='crypto-chart' element={<CryptoChart />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </CryptoContext>
  );
}

export default App;
