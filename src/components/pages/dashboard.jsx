import React, { useState } from 'react';
import CryptoChart from '../in-dashboard/CryptoChart';
import CoinsTable from '../in-dashboard/CoinsTable';

const Dashboard = () => {
  const [selectedCoin, setSelectedCoin] = useState(null);

  const handleCoinSelect = (id) => {
    setSelectedCoin(id);
  };

  return (
    <div className='dashboard'>
      <CryptoChart selectedCoin={selectedCoin} />
      <CoinsTable onCoinSelect={handleCoinSelect} />
    </div>
  );
};

export default Dashboard;
