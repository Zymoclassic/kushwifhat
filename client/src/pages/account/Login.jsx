import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../assets/css/account.css';
import { UserContext } from '../../context/userContext.js';

const Login = () => {

  const [userInfo, setUserInfo] = useState({
    email:'',
    password:''
  })

  const [error, setError] = useState('');

  const navigate = useNavigate();

  const {setCurrentUser} = useContext(UserContext);

  const changeInputHandler = (e) => {
    setUserInfo(prevState => {
      return {...prevState, [e.target.name] : e.target.value }
    })
  }

  const loginUser = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/user/login`, userInfo, { withCredentials: true })
      const newUser = await response.data;
      setCurrentUser(newUser)
      if(!newUser) {
        setError("Couldn't register user. Please try again later.")
      }
      navigate('/user')
    } catch (err) {
      setError(err.response.data.message)
    }
  }

  return (
    <section className='login'>
      <div className="container">
        <h2>Log in</h2>
        <form className="form LoginForm" onSubmit={ loginUser } >
          {error && <p className='formErrorMessage'>{error}</p>}
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
