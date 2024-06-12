import React from 'react'
import '../styles/dashboard.css'

export default function dashboard(props) {
  return (
    <div className='dashboard'>
      {props.children}
    </div>
  )
}
