import React from 'react'
import {useState, useEffect} from 'react'
import { CryptoState } from "../../CryptoContext"
import { HistoricalChart } from "../../config/cryptoApi.js"
import { Line } from "react-chartjs-2";
import axios from 'axios';

const CryptoChart = ({}) => {

  const id = "bitcoin"
  
  const [historicData, setHistoricData] = useState()
  const [days, setDays] = useState(1)

  const {currency} = CryptoState()

  const fetchHistoricData = async()=>{
    const {data} = await axios.get(HistoricalChart(id, days, currency))
    setHistoricData(data.prices)
  }

  useEffect(()=>{
    fetchHistoricData()
  }, [currency, days])

  console.log(historicData)
  
  return (
    <div>

    </div>
  )
}

export default CryptoChart
