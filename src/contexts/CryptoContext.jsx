import React, {createContext, useContext, useEffect, useState} from 'react'
import axios from 'axios'
import { CoinList } from '../config/cryptoApi'


const Crypto = createContext()

const CryptoContext = ({children}) => {
  const [currency, setCurrency] = useState("USD")
  const [symbol, setSymbol] = useState("$")
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(false)


  const fetchCoins = async() =>{
    setLoading(true)
    try{
      const { data } = await axios.get(CoinList(currency))
      setCoins(data)
    } catch(error){
      console.error('error fetching coin data:', error)
    } finally{
      setLoading(false)
    }
  }


  useEffect(()=>{
    fetchCoins()
    if(currency === "usd") setSymbol("$");
    else if(currency === "eur") setSymbol("€");
  },[currency])

    return (
    <Crypto.Provider value={{currency, setCurrency, symbol, coins, loading, fetchCoins}}>
        {children}
    </Crypto.Provider>
  )
}

export default CryptoContext

export const CryptoState = ()=>{
    return useContext(Crypto)
}
