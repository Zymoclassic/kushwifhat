import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Logo from "../assets/images/logo.png";
import "../assets/css/navbar.css";
import { UserContext } from '../context/userContext';

const NavBar = () => {

  const toggleBars = () => setToggle(!toggle);

  const { currentUser } = useContext(UserContext);
  
  const [toggle, setToggle] = useState(false);

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
          { currentUser?.id && <>
          <li><Link to="/user" onClick={handleLinkClick}>Koly Zymo</Link></li>
          <li><Link to="/posts/create" onClick={handleLinkClick}>Create</Link></li>
          <li><Link to="/users" onClick={handleLinkClick}>Authors</Link></li>
          <li><Link to="/user/logout" onClick={handleLinkClick}>Logout</Link></li>
          </>}

          { !currentUser?.id && <>  
          <li><Link to="/user/login" onClick={handleLinkClick}>Login</Link></li>
          <li><Link to="/user/signup" onClick={handleLinkClick}>Sign up</Link></li>
          </>}
        </ul>
      </div>

    </nav>
  )
}

export default NavBar;
