import React from 'react';
import { Link } from 'react-router-dom';
import Logo from "../assets/images/logo.png";
import "../assets/css/navbar.css";

const NavBar = () => {
  return (
    <nav>
      <div className="container navContainer">
        <Link to="/">
        <img src={Logo} alt="kushwifhat" className="logo" />
        </Link>

        <ul className="navMenu">
          <li><Link to="/user/:id">Koly Zymo</Link></li>
          <li><Link to="/posts/create">Create</Link></li>
          <li><Link to="/posts/categories/:category">Category</Link></li>
          <li><Link to="/users">Authors</Link></li>
          <li><Link to="/user/logout">Logout</Link></li>
        </ul>

        <button className='navClose'>
          <i className='uil uil-times'></i>
        </button>
      </div>
    </nav>
  )
}

export default NavBar;
