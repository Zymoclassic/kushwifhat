import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/account.css';

const Login = () => {

  const [userInfo, setUserInfo] = useState({
    name:'',
    email:'',
    password:'',
    confirmPassword:''
  })

  const changeInputHandler = (e) => {
    setUserInfo(prevState => {
      return {...prevState, [e.target.name] : e.target.value }
    })
  }

  return (
    <section className='login'>
      <div className="container">
        <h2>Log in</h2>
        <form action="" className="form LoginForm">
          <p className='formErrorMessage'>Error message placeholder!</p>
          <input type="email" placeholder='Email address' name='email' value={userInfo.email} onChange={changeInputHandler} autoFocus />
          <input type="password" placeholder='Password' name='password' value={userInfo.password} onChange={changeInputHandler} />
          <button type='submit' className='btn primary'>Log In</button>
        </form>
        <small>You don't have an account? <Link to={`/user/signup`}>Sign Up</Link> </small>
      </div>
    </section>
  )
}

export default Login;
