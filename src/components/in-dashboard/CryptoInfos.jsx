import React, { useState, useEffect } from 'react';
import { CryptoState } from "../../contexts/CryptoContext";
import { HistoricalChart } from "../../config/cryptoApi";
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-moment';
import '../styles/cryptoInfos.css';
import TopLoadingBar from '../animations/TopLoadingBar'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  Filler
);

const CryptoInfos = ({ selectedCoin, tableCoinsData }) => {
  const { currency, symbol } = CryptoState();
  const [days, setDays] = useState(30);
  const [coinsData, setCoinsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState(null); 
  const [currentPrice, setCurrentPrice] = useState(null);
  const [selectedCoinDatas, setSelectedCoinDatas] = useState(null); // Initialize as null

  if (!selectedCoin) selectedCoin = "bitcoin";

  const fetchCoins = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(HistoricalChart(selectedCoin, days, currency));
      setCoinsData(data.prices);
      const currentPrice = data.prices[data.prices.length - 1][1];
      setCurrentPrice(currentPrice);
      console.log('Fetched coin data:', data);
    } catch (error) {
      setError(error); 
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCoins();
  }, [selectedCoin, currency, days]); 
  
  useEffect(() => {
    if (tableCoinsData && selectedCoin) {
      const coinDatas = tableCoinsData.find(coin => coin.id === selectedCoin);
      setSelectedCoinDatas(coinDatas);
      console.log('Selected coin data:', coinDatas);
    }
  }, [selectedCoin, tableCoinsData]);

  const getArrowIcon = (percentageChange) => {
    if (percentageChange > 0) {
      return <span id='price-up-arrow'>&#9650;</span>;
    } else if (percentageChange < 0) {
      return <span id='price-down-arrow'>&#9660;</span>;
    } else {
      return null;
    }
  };

  let priceDiff = selectedCoinDatas ? selectedCoinDatas.price_change_24h : 0; // Default to 0 if selectedCoinDatas is null
  let priceDiffClass = 'price-diff';
  let cryptoPercentageBoxClass = 'crypto-price-percentage-change-24h';

  if (selectedCoinDatas) { // Only process if selectedCoinDatas is not null
    if (priceDiff > 0) {
      cryptoPercentageBoxClass = 'price-up-for-percentage-change-24h';
      priceDiff = '+ ' + symbol + priceDiff.toFixed(2);
      priceDiffClass = 'price-diff-up';
    } else if (priceDiff < 0) {
      cryptoPercentageBoxClass = 'price-down-for-percentage-change-24h';
      priceDiff = '- ' + symbol + Math.abs(priceDiff.toFixed(2));
      priceDiffClass = 'price-diff-down';
    } else {
      priceDiff = symbol + 0;
    }
  }

  const handleDaysChange = (newDays) => {
    setDays(newDays);
  };

  const chartData = {
    labels: coinsData.map((coin) => {
      let date = new Date(coin[0]);
      return date;
    }),
    datasets: [
      {
        data: coinsData.map((coin) => coin[1]),
        backgroundColor: (context) => {
          const bgColor = ['rgba(71,166,99,0.2)', 'rgba(71,166,99,0)'];
          if (!context.chart.chartArea) return;
          const { ctx, chartArea: { top, bottom } } = context.chart;
          const gradientBg = ctx.createLinearGradient(0, top, 0, bottom);
          gradientBg.addColorStop(0, bgColor[0]);
          gradientBg.addColorStop(1, bgColor[1]);
          return gradientBg;
        },
        borderColor: 'rgba(67,150,92,1)',
        tension: 0.2,
        pointRadius: 0, 
        pointHoverRadius: 10, 
        fill: true
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: false,
      }
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
        },
        grid: {
          display: false,
        }
      },
      y: {
        beginAtZero: false,
        grid: {
          display: true,
          color: 'rgba(200, 200, 200, 0.15)', 
          drawBorder: true, 
          drawTicks: false,
        },
        border: {
          dash: [5, 5]
        }
      },
      responsive: true
    }
  };

  return (
    <div className='crypto-infos'>
      <TopLoadingBar loading={isLoading}/>
      <div className='crypto-desc'>
        <p className='title'>Current Price</p>
        <div className='current-price-and-percentage'>
          <h1 className='selected-crypto-price'>
            {currentPrice ? symbol + ' ' + currentPrice.toFixed(2) : 'Loading Price...'}
          </h1>
          {selectedCoinDatas && ( // Only render this div if selectedCoinDatas is not null
            <div className={cryptoPercentageBoxClass}>
              <span className='arrow'>{getArrowIcon(selectedCoinDatas.price_change_24h)}</span>
              <p>{Math.abs(selectedCoinDatas.price_change_percentage_24h.toFixed(2))}%</p>
            </div>
          )}
        </div>
        
        <div className='crypto-price-change-24h'>
          <p className={priceDiffClass}>{priceDiff}</p>
          <p className='hour-24'>24h</p>
        </div>
        
        <div className='crypto-name-and-days'>
          <p className='selected-crypto-name'>
          <img src={selectedCoinDatas ? selectedCoinDatas.image : null} alt=':('/>
            {selectedCoin[0].toUpperCase() + selectedCoin.slice(1)}
          </p>
          <div className='days'>
            <span id='day-span' onClick={() => handleDaysChange(1)}>24H</span>
            <span id='seperate-span'>|</span>
            <span id='day-span' onClick={() => handleDaysChange(7)}>7D</span>
            <span id='seperate-span'>|</span>
            <span id='day-span' onClick={() => handleDaysChange(30)}>30D</span>
            <span id='seperate-span'>|</span>
            <span id='day-span' onClick={() => handleDaysChange(90)}>90D</span>
            <span id='seperate-span'>|</span>
            <span id='day-span' onClick={() => handleDaysChange(365)}>1YEAR</span>
          </div>
        </div>
      </div>

      <div className='crypto-chart'>
        {isLoading ? (
          <p>Loading chart data...</p>
        ) : error ? (
          <p>Error fetching data: {error.message} please reload the page</p>
        ) : (
          <Line data={chartData} options={chartOptions} />
        )}
      </div>
      <h2 style={{ 
        color: 'white'
        }}>Popular Cryptos</h2>
    </div>
  );
};

export default CryptoInfos;
