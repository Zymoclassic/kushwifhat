import React from 'react';
import logo from '../../assets/images/logo.png';
import '../../assets/css/navbar.css';

function NavBar() {
  return (
    <div className='navBarContainer'>
        <div className='logoBorder'>
            <img className="logo" src={logo} alt='kushwifhat' />
        </div>
        <div className="nav">
          <ul className="navList">
            <li className="navItem"><a href=''>Home</a></li>
            <li className="navItem"><a href=''>Blogs</a></li>
            <li className="navItem"><a href=''>Account</a></li>
          </ul>
        </div>
    </div>
  )
}

export default NavBar
