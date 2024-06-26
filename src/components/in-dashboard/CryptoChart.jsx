import React, { useState, useEffect } from 'react';
import { CryptoState } from "../../CryptoContext";
import { HistoricalChart } from "../../config/cryptoApi";
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-moment';
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

const CryptoChart = ({ selectedCoin }) => {
  const { currency } = CryptoState();
  const [days, setDays] = useState(30);
  const [coinsData, setCoinsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState(null); 

  const fetchCoins = async () => {
    if (!selectedCoin) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(HistoricalChart(selectedCoin, days, currency));
      setCoinsData(data.prices);
    } catch (error) {
      setError(error); 
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCoins();
  }, [selectedCoin, currency, days]); 

  const chartData = {
    labels: coinsData.map((coin) => {
      let date = new Date(coin[0]);
      return date;
    }),
    datasets: [
      {
        label: `Price in ${currency}`,
        data: coinsData.map((coin) => coin[1]),

        //gradient bg color
        backgroundColor: (context)=>{
          const bgColor = ['rgba(71,166,99,0.2)', 'rgba(71,166,99,0)']
          console.log(context)
          if(!context.chart.chartArea) return;
          const {ctx, data, chartArea: {top, bottom}} = context.chart
          const gradientBg = ctx.createLinearGradient(0, top, 0, bottom)
          gradientBg.addColorStop(0, bgColor[0])
          gradientBg.addColorStop(1, bgColor[1])
          return gradientBg;

        },
        borderColor: 'rgba(67,150,92,1)',
        tension: 0.1,
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
      },
      y: {
        beginAtZero: false,
      },
    },
  };

  return (
    <div className='crypto-chart'>
      {isLoading ? (
        <p>Loading chart data...</p>
      ) : error ? (
        <p>Error fetching data: {error.message}</p>
      ) : (
        <Line data={chartData} options={chartOptions} />
      )}
    </div>
  );
};

export default CryptoChart;
