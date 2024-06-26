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
  TimeScale
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

const CryptoChart = ({ selectedCoin }) => {
  const { currency } = CryptoState();
  const [days, setDays] = useState(1);
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
      return date.toLocaleDateString();
    }),
    datasets: [
      {
        label: `Price in ${currency}`,
        data: coinsData.map((coin) => coin[1]),
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const chartOptions = {
    elements: {
      line: {
        tension: 0.1,
      },
    },
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
