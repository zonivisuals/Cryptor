import React, { useState } from 'react';
import { CryptoState } from '../../CryptoContext';
import '../styles/coinsTable.css';

const CoinsTable = ({ onCoinSelect, coins, loading }) => {
  const { currency, symbol } = CryptoState();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

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
    <>
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
                      <img src={item.image} alt={item.name} /> {item.name} ({item.symbol})
                    </td>
                    <td>{symbol} {item.current_price.toFixed(2)}</td>
                    <td className={item.price_change_percentage_24h > 0 ? 'price-positive-change-24h' : 'price-negative-change-24h'}>
                      {item.price_change_percentage_24h >= 0 ? `+ ${Math.abs(item.price_change_percentage_24h.toFixed(2))}` : `- ${Math.abs(item.price_change_percentage_24h.toFixed(2))}`}%
                    </td>
                    <td>{symbol} {item.market_cap.toLocaleString()}</td>
                    <td>{symbol} {item.high_24h.toFixed(2)}</td>
                    <td>{symbol} {item.low_24h.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>

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
  );
};

export default CoinsTable;
