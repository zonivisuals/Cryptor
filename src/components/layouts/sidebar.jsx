import React from 'react'
import '../styles/sidebar.css'

export default function Sidebar(props) {
  return (
    <section className='sidebar'>
      {props.children}
    </section>
  )
}
