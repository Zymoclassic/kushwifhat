import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from "../assets/images/logo.png";
import "../assets/css/navbar.css";

const NavBar = () => {

  const [toggle, setToggle] = useState(false);

  const toggleBars = () => setToggle(!toggle);

  const handleLinkClick = () => {
    setToggle(false); // Close menu when a link is clicked
  };

  return (
    <nav>
      <div className="container navContainer">
        <Link to="/" onClick={handleLinkClick}>
        <img src={Logo} alt="kushwifhat" className="logo" />
        </Link>

        <div className='navBars' onClick={toggleBars}>
              <i className='uil uil-bars' ></i>
        </div>


        <ul className={`navMenu ${!toggle ? "" : "open"}`}>
          <li><Link to="/user/:id" onClick={handleLinkClick}>Koly Zymo</Link></li>
          <li><Link to="/posts/create" onClick={handleLinkClick}>Create</Link></li>
          <li><Link to="/posts/categories/:category" onClick={handleLinkClick}>Category</Link></li>
          <li><Link to="/users" onClick={handleLinkClick}>Authors</Link></li>
          <li><Link to="/user/logout" onClick={handleLinkClick}>Logout</Link></li>
        </ul>
      </div>

    </nav>
  )
}

export default NavBar;
