import React, { useEffect, useRef } from 'react'
import LoadingBar from 'react-top-loading-bar'

const TopLoadingBar = ({loading}) => {
  const loadingBarRef = useRef(null)

  useEffect(()=>{
    if(loading){
      loadingBarRef.current.continuousStart()
    }
    else{
      loadingBarRef.current.complete()
    }
  },[loading])

  return(
    <LoadingBar color="#f11946" ref={ref} />
  )

}

export default TopLoadingBar