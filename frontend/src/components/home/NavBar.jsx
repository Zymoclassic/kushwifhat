import React, { useState } from 'react';
import logo from '../../assets/images/logo.png';
import '../../assets/css/navbar.css';

function NavBar() {
  const [navOpen, setNavOpen] = useState(true);

  // const switchNavBar = () => {
  //   setNavOpen(!navOpen);
  // }

  return (
    <div className='navBarContainer'>
        <div className='logoBorder'>
            <a href=""><img className="logo" src={logo} alt='kushwifhat' /></a>
        </div>

        <div className='navHam' onClick={switchNavBar}>
          <a href=''>
            <i className='uil uil-bars'></i>
          </a>
        </div>

        <div className={`navListContainer ${ navOpen ? "open" : "" }`}>
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
