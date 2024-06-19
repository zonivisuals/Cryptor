import React, {createContext, useContext, useEffect, useState} from 'react'

const Crypto = createContext()

const CryptoContext = (props) => {
  
  const [currency, setCurrency] = useState("USD")
  const [symbol, setSymbol] = useState("$")

  useEffect(()=>{
    if(currency == "USD") setSymbol("$")
    else if(currency == "EUR") setSymbol("€")
  },[currency])
    return (
    <div>
      
    </div>
  )
}

export default CryptoContext
export CryptoState
