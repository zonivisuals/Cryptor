import React, { useEffect, useState } from 'react';
import CryptoInfos from '../in-dashboard/CryptoInfos';
import CoinsTable from '../in-dashboard/CoinsTable';
import axios from 'axios';
import { CoinList } from '../../config/cryptoApi';
import '../styles/crypto-dashboard.css';
import { CryptoState } from '../../contexts/CryptoContext';

const Dashboard = () => {
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [coins, setCoins] = useState([]); // Initialize with an empty array
  const [loading, setLoading] = useState(false);
  const { currency } = CryptoState();

  const fetchTableCoins = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(CoinList(currency));
      setCoins(data);
    } catch (error) {
      console.error("Error fetching coin data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCoinSelect = (id) => {
    setSelectedCoin(id);
  };

  useEffect(() => {
    fetchTableCoins();
  }, [currency]); // Add currency as a dependency to refetch data on currency change

  return (
    <div className='crypto-dashboard'>
      <CryptoInfos selectedCoin={selectedCoin} tableCoinsData={coins} />
      <CoinsTable onCoinSelect={handleCoinSelect} coins={coins} loading={loading} />
    </div>
  );
};

export default Dashboard;
