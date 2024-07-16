import React, { useEffect, useRef } from 'react'
import LoadingBar from 'react-top-loading-bar'

const TopLoadingBar = ({loading}) => {
  const loadingBarRef = useRef(null)

  useEffect(()=>{
    if(loading && loadingBarRef.current){
      loadingBarRef.current.continuousStart()
    }
    else if(loadingBarRef.current){
      loadingBarRef.current.complete()
    }
  },[loading])

  return(
    <LoadingBar color="#57BC76" ref={loadingBarRef} />
  )
  
}

export default TopLoadingBar