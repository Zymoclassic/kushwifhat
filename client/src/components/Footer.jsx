import React from 'react';
import { Link } from 'react-router-dom';
import '../../src/assets/css/footer.css';

const Footer = () => {
  return (
    <footer>
      <ul className="footerContainer">
          <li><Link to="/posts">All posts</Link></li>
          <li><Link to="/posts/categories/:category">Category</Link></li>
          <li><Link to="/posts/authors">Authors</Link></li>
        </ul>

        <div className="footerCopyright">
          <small>All Rights Reserved &copy; Copyright, Kushwifhat.</small>
        </div>
    </footer>
  )
}

export default Footer;
