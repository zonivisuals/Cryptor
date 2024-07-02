import React, { useState } from 'react';
import CryptoInfos from '../in-dashboard/CryptoInfos';
import CoinsTable from '../in-dashboard/CoinsTable';
import '../styles/dashboard.css'

const Dashboard = () => {
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [pricePercentage, setPricePercentage] = useState(null)

  const handleCoinSelect = (id) => {
    setSelectedCoin(id);
  };

  return (
    <div className='dashboard'>
      <CryptoInfos selectedCoin={selectedCoin} onPricePercentageChange={setPricePercentage} />
      <CoinsTable onCoinSelect={handleCoinSelect} pricePercentage={pricePercentage} />
    </div>
  );
};

export default Dashboard;
