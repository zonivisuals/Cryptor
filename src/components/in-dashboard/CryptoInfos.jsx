import React, { useState, useEffect } from 'react';
import { CryptoState } from "../../CryptoContext";
import { HistoricalChart } from "../../config/cryptoApi";
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-moment';
import '../styles/cryptoInfos.css'
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
import { getByDisplayValue } from '@testing-library/react';

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

const CryptoInfos = ({ selectedCoin }) => {
  const { currency } = CryptoState();
  const [days, setDays] = useState(30);
  const [coinsData, setCoinsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState(null); 
  const [currentPrice, setCurrentPrice] = useState(null)
  const [price24HoursAgo, setPrice24HoursAgo] = useState(null)

  if(!selectedCoin) selectedCoin = "bitcoin"
  const fetchCoins = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(HistoricalChart(selectedCoin, days, currency));
      setCoinsData(data.prices);
      
      const currentPrice = data.prices[data.prices.length - 1][1]
      
      const price24HoursAgo = data.prices.find((price)=>{
        const date = new Date(price[0])
        const now = new Date()
        return (now.getTime() - date.getTime()) <= (24 *60 *60 *1000) //24hrs in milliseconds 
      })[1]

      setCurrentPrice(currentPrice);
      setPrice24HoursAgo(price24HoursAgo)
    
    } catch (error) {
      setError(error); 
    } finally {
      setIsLoading(false);
    }
  };

  const priceChangePercentage24Hours = () =>{
    const absoluteChange = currentPrice - price24HoursAgo
    const percentageChange = (absoluteChange / price24HoursAgo)*100
    return percentageChange.toFixed(2)
  }

  const getArrowIcon = (percentageChange)=>{
    if(percentageChange > 0)
      return <span id='price-up-arrow'>&#9650;</span>
    else if(percentageChange < 0)
      return <span id='price-down-arrow'>&#9660;</span>
    else 
      return null
  }

  let cryptoPercentageBoxClass
  if (priceChangePercentage24Hours() > 0) {
    cryptoPercentageBoxClass = 'price-up-for-percentage-change-24h';
} else if (priceChangePercentage24Hours() < 0) {
    cryptoPercentageBoxClass = 'price-down-for-percentage-change-24h';
} else {
    cryptoPercentageBoxClass = 'crypto-price-percentage-change-24h'; // Default background color class
}

let priceDiff = currentPrice - price24HoursAgo
if(priceDiff > 0)
  priceDiff = '+ $'+priceDiff.toFixed(2)
else if (priceDiff < 0)
  priceDiff = '- $'+Math.abs(priceDiff.toFixed(2))
else
  priceDiff = '$'+0


  useEffect(() => {
    fetchCoins();
  }, [selectedCoin, currency, days]); 

  //chartData object contauns all the data and settings to render the chart
  const chartData = {
    
    //x axis labels
    labels: coinsData.map((coin) =>{
      let date = new Date(coin[0])
      return date;
    }),

    //in our case we have only one dataset so one chart
    datasets: [
      {
        label: `Price of ${selectedCoin}`,
        
        //mapping the crypto price (y-axis)
        data: coinsData.map((coin) => coin[1]),

        //gradient bg color
        backgroundColor: (context)=>{
          const bgColor = ['rgba(71,166,99,0.2)', 'rgba(71,166,99,0)']
          if(!context.chart.chartArea) return;
          const {ctx, data, chartArea: {top, bottom}} = context.chart
          const gradientBg = ctx.createLinearGradient(0, top, 0, bottom)
          gradientBg.addColorStop(0, bgColor[0])
          gradientBg.addColorStop(1, bgColor[1])
          return gradientBg;
        },

        borderColor: 'rgba(67,150,92,1)',
        tension: 0.2, //how much curved the graph is
        pointRadius: 0, 
        pointHoverRadius: 10, 
        fill: true
      },
    ],
  };

  const chartOptions = {
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
        border:{
          dash: [5,5]
        }
      },
      responsive: true
    }
  }

  return (

    

    <div className='crypto-infos'>
      <div className='crypto-desc'>
        <p>Current Price</p>
        <div className='current-price-and-percentage'>
          <h1 className='selected-crypto-price'>{currentPrice ? '$ '+currentPrice.toFixed(2) : 'Loading Price...'}</h1>
          <div className={cryptoPercentageBoxClass}>
            <span id='arrow'>{getArrowIcon(priceChangePercentage24Hours())}</span>
            <p>{priceChangePercentage24Hours ? Math.abs(priceChangePercentage24Hours())+'%' : 'Loading %...'}</p>
          </div>
        </div>
        
        <div className='crypto-price-change-24h'>
          <p className='price-diff'>{priceDiff}</p>
          <p className='hour-24'>24h</p>
        </div>
        
        <div>
          <p className='selected-crypto-name'>Bitcoin</p>
          <div className='days'></div>
        </div>

      </div>


      <div className='crypto-chart'>
        {isLoading ? (
          <p>Loading chart data...</p>
        ) : error ? (
          <p>Error fetching data: {error.message}</p>
        ) : (
          <Line data={chartData} options={chartOptions} />
        )}
      </div>
    </div>
  );
};

export default CryptoInfos;
