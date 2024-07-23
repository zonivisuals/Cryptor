import React, { useEffect, useState } from 'react';
import CryptoInfos from '../in-dashboard/CryptoInfos';
import CoinsTable from '../in-dashboard/CoinsTable';
import '../styles/crypto-dashboard.css';
import { CryptoState } from '../../contexts/CryptoContext';

const Dashboard = () => {
  const [selectedCoin, setSelectedCoin] = useState(null);
  const { coins, loading, currency, symbol} = CryptoState();


  const handleCoinSelect = (id) => {
    setSelectedCoin(id);
  };

  return (
    <div className='crypto-dashboard'>
      <CryptoInfos selectedCoin={selectedCoin} tableCoinsData={coins} currency={currency} symbol={symbol} />
      <CoinsTable onCoinSelect={handleCoinSelect} coins={coins} loading={loading} currency={currency} symbol={symbol} />

    </div>
  );
};

export default Dashboard;
