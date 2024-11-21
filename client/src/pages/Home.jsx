import React from 'react'
import Data from '../components/Data';
import '../assets/css/home.css';
import Welcome from '../components/Welcome';

const Home = () => {
  return (
    <div>
      <Welcome />
      <Data />
    </div>
  )
}

export default Home;