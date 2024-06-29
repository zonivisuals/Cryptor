import React, { useState } from 'react';
import CryptoInfos from '../in-dashboard/CryptoInfos';
import CoinsTable from '../in-dashboard/CoinsTable';
import '../styles/dashboard.css'

const Dashboard = () => {
  const [selectedCoin, setSelectedCoin] = useState(null);

  const handleCoinSelect = (id) => {
    setSelectedCoin(id);
  };

  return (
    <div className='dashboard'>
      <CryptoInfos selectedCoin={selectedCoin} />
      <CoinsTable onCoinSelect={handleCoinSelect} />
    </div>
  );
};

export default Dashboard;
