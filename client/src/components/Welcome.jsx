import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/userContext';

const Welcome = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <section className='welcomeContainer'>
      {!currentUser?.id && <div className="welcomeNote">
        <h1 className='welcomeTitle'>Welcome to Kushwifhat</h1>
        <p className='welcomeDetails'> You can <Link to={'/user/login'} className='btn sm category' >Sign in to your account</Link> or <Link to={'/user/signup'} className='btn sm category'>Create an account</Link> to post a blog. </p>
      </div>}

      {currentUser?.id && <div className="welcomeNote">
        <h1 className='welcomeTitle'>Welcome back, Dear {currentUser.name.toUpperCase()}</h1>
        <p className='welcomeDetails'> What would you like to do today? <Link to={'/posts/create'} className='btn sm category' >Share a post</Link> or <Link to={'/posts'} className='btn sm category'>Read users posts</Link></p>
      </div>}
    </section>
  )
}

export default Welcome;
