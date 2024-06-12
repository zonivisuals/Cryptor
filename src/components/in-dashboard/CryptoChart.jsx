import React from 'react'
import {Line} from 'react-chartjs-2'

import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)


export default function CryptoChart() {
    const options = {}
    const data = {
        labels: ["1" ,"2" ,"3" ,"4" ,"5"],
        datasets: [{
            label: "steps",
            data: [10, 20, 30, 40, 60],
            borderColor: "cyan",
        }],
    }
    
    return (
    <Line options = {options} data = {data} />
  )
}
