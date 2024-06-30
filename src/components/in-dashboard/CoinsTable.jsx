import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CoinList } from '../../config/cryptoApi';
import { CryptoState } from '../../CryptoContext';
import '../styles/coinsTable.css';

const CoinsTable = ({ onCoinSelect }) => {
  const { currency } = CryptoState();  
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  // Handle the data to display on the current page
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = coins.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(coins.length / rowsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className='coins-table'>
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <>
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
              {currentRows.map((item) => (
                <tr key={item.id} onClick={() => onCoinSelect(item.id)}>
                  <td id='name-col'>
                    <img src={item.image} alt={item.name} /> {item.id} ({item.symbol})
                  </td>
                  <td>{item.current_price}</td>
                  <td>{item.price_change_24h}</td>
                  <td>{item.market_cap}</td>
                  <td>{item.high_24h}</td>
                  <td>{item.low_24h}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className='pagination'>
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CoinsTable;
