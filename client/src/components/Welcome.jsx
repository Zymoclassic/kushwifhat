import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => {
  return (
    <section className='welcomeContainer'>
      <div className="welcomeNote">
        <h1 className='welcomeTitle'>Welcome to Kushwifhat</h1>
        <p className='welcomeDetails'> You can <Link to={'/user/login'} className='btn sm category' >Login</Link> or <Link to={'/user/signup'} className='btn sm category'>Create an account</Link> to post a blog. </p>
      </div>
    </section>
  )
}

export default Welcome;
