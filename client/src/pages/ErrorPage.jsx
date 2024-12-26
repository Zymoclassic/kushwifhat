import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/errorpage.css';

const ErrorPage = () => {
  return (
    <section className='container errorContainer'>

        <div className='center'>
          <h1>This page is inaccessible!!!</h1>
          <h3>Hey there. We are sorry for the inconveniences.</h3>
          <Link to='/' className='btn primary'><i className='uil uil-home'></i> Go back Home</Link>
        </div>

    </section>
    
  )
}

export default ErrorPage
