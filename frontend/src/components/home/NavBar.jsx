import React from 'react';
import logo from '../../assets/images/logo.png';
import '../../assets/css/navbar.css';

function NavBar() {
  return (
    <div className='navBarContainer'>
        <div className='logoBorder'>
            <a href=""><img className="logo" src={logo} alt='kushwifhat' /></a>
        </div>
        <div>
          <ul className="navList">
            <li className="navItem">
              <a className="navLink" href=''>Home</a>
            </li>
            <li className="navItem">
              <a className="navLink" href=''>Blogs</a>
            </li>
            <li className="navItem">
              <a className="navLink" href=''>Account</a>
            </li>
          </ul>
        </div>
    </div>
  )
}

export default NavBar
