import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CoinList, HistoricalChart } from '../../config/cryptoApi';
import { CryptoState } from '../../CryptoContext';
import '../styles/coinsTable.css';

const CoinsTable = ({ onCoinSelect, pricePercentage}) => {
  console.log("coins Table")
  const { currency, symbol } = CryptoState()
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(false)
  const [pricePercentages, setPricePercentages] = useState({})

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const rowsPerPage = 5

  const fetchCoins = async () => {
    setLoading(true)
    const { data } = await axios.get(CoinList(currency))
    setCoins(data)
    setLoading(false)
  };

  //fetching the price%24h of each coin
  const fetchPricePercentage = async(coinId) => {
    try{
    const { data } = await axios.get(HistoricalChart(coinId, 1, currency))
    const prices = data.prices
    const currentPrice = prices[prices.length - 1][1]
    
    //return the coinId price 24 hrs ago
    const price24HoursAgo = prices.find((price)=>{
      const date = new Date(price[0])
      const now = new Date()
      return (now.getTime() - date.getTime()) <= (24 *60 *60 *1000) //24hrs in milliseconds 
    })[1]

    //calculating price change % 24 hrs of the coinId
    const priceChangePercentage24Hours = (((currentPrice - price24HoursAgo) / price24HoursAgo) * 100).toFixed(2)
    return priceChangePercentage24Hours
    } catch(error){
      console.log(`Error fetching price percentage for ${coinId}`,error)
      return null
    }
  }


  //fetching the price%24h of all coins
  const fetchAllPricePercentages = async(coins) =>{
    const pricePercentages = {}
    for(const coin of coins){
      const percentage = await fetchPricePercentage(coin.id)
      pricePercentages[coin.id] = percentage
    }
    setPricePercentages(pricePercentages)
  }
  

  useEffect(() => {
    fetchCoins()
  }, [currency])

  useEffect(()=>{
    if(coins.length > 0)
        fetchAllPricePercentages(coins)
  },[coins])

  // Handle the data to display on the current page
  const indexOfLastRow = currentPage * rowsPerPage
  const indexOfFirstRow = indexOfLastRow - rowsPerPage
  const currentRows = coins.slice(indexOfFirstRow, indexOfLastRow)

  const totalPages = Math.ceil(coins.length / rowsPerPage)

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
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
                    <img src={item.image} alt={item.name} /> {item.id} ({item.symbol})
                  </td>
                  <td>{symbol} {item.current_price}</td>
                  <td>{symbol} {item.price_change_24h}</td>
                  <td>{item.market_cap}</td>
                  <td>{item.high_24h}</td>
                  <td>{item.low_24h}</td>
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
  )
}

export default CoinsTable
