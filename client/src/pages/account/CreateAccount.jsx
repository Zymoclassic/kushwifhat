import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../assets/css/account.css';
import axios from 'axios';

const CreateAccount = () => {
  
  const [userInfo, setUserInfo] = useState({
    name:'',
    email:'',
    password:'',
    confirmPassword:''
  })

  const [error, setError] = useState('');

  const navigate = useNavigate();

  const changeInputHandler = (e) => {
    setUserInfo(prevState => {
      return {...prevState, [e.target.name] : e.target.value }
    })
  }

  const createUser = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/user/signup`, userInfo)
      const newUser = await response.data;
      console.log(newUser);
      if(!newUser) {
        setError("Couldn't register user. Please try again later.")
      }
      navigate('/')
    } catch (err) {
      setError(err.response.data.message)
    }
  }

  return (
    <section className='register'>
      <div className="container">
        <h2>Create an account</h2>
        <form className="form registerForm" onSubmit={createUser}>
          {error && <p className='formErrorMessage'>{error}</p>}
          <input type="text" placeholder='Full name' name='name' value={userInfo.name} onChange={changeInputHandler} />
          <input type="email" placeholder='Email address' name='email' value={userInfo.email} onChange={changeInputHandler} />
          <input type="password" placeholder='Password' name='password' value={userInfo.password} onChange={changeInputHandler} />
          <input type="password" placeholder='Confirm password' name='confirmPassword' value={userInfo.confirmPassword} onChange={changeInputHandler} />
          <button type='submit' className='btn primary'>Sign Up</button>
        </form>
        <small>Already have an account? <Link to={`/user/login`}>Log in</Link> </small>
      </div>
    </section>
  )
}

export default CreateAccount;
