import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from "../assets/images/logo.png";
import "../assets/css/navbar.css";

const NavBar = () => {

  const [toggle, setToggle] = useState(true);

  const toggleBars = () => setToggle(!toggle)

  return (
    <nav>
      <div className="container navContainer">
        <Link to="/">
        <img src={Logo} alt="kushwifhat" className="logo" />
        </Link>

        <div className='navBars' onClick={toggleBars}>
              <i className='uil uil-bars' ></i>
        </div>


        <ul className= {toggle ? "navMenu" : "navMenuHide"}>
          <li><Link to="/user/:id">Koly Zymo</Link></li>
          <li><Link to="/posts/create">Create</Link></li>
          <li><Link to="/posts/categories/:category">Category</Link></li>
          <li><Link to="/users">Authors</Link></li>
          <li><Link to="/user/logout">Logout</Link></li>
        </ul>
      </div>

    </nav>
  )
}

export default NavBar;
