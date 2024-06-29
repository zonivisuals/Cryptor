import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CoinList } from '../../config/cryptoApi';
import { CryptoState } from '../../CryptoContext';
import '../styles/coinsTable.css';

const CoinsTable = ({ onCoinSelect }) => {
  const { currency } = CryptoState();  
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  return (
    <div className='coins-table'>
      <table>
        <thead>
          <tr>
            <th>NAME</th>
            <th>PRICE</th>
            <th>24H</th>
            <th>MC</th>
            <th>HIGH</th>
            <th>LOW</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((item) => (
            <tr key={item.id} onClick={() => onCoinSelect(item.id)}>
              <td id='name-col'><img src={item.image} alt={item.name}/> {item.id} ({item.symbol})</td>
              <td>{item.current_price}</td>
              <td>{item.price_change_24h}</td>
              <td>{item.market_cap}</td>
              <td>{item.high_24h}</td>
              <td>{item.low_24h}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoinsTable;
