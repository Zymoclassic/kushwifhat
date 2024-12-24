import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../src/assets/css/footer.css';

const Footer = () => {

  const postCategories = [ "uncategorized", "entertainment", "health", "romance", "education", "finance", "technology", "sport", "art", "agriculture", "politics" ];

  const [toggleModal, setToggleModal] = useState(false);

  const toggleTab = () => {
      setToggleModal(!toggleModal);
  }


  const handleLinkClick = () => {
    setToggleModal(false); // Close menu when a link is clicked
  };

  return (
      <footer>
        <ul className="footerContainer">
          <li><Link to="/posts">All posts</Link></li>
          <li onClick={toggleTab}>Category</li>
          <li><Link to="/users">Authors</Link></li>
        </ul>
        <div className={toggleModal === true ? "category_modal active_modal" : "category_modal"}>
          <div className='category_modal-content'>
            {postCategories.map(pc => <Link to = {`/posts/categories/${pc}`} onClick={handleLinkClick}><p className='btn catSize'>{pc}</p></Link>)}
          </div>
          
        </div>

        <div className="footerCopyright">
          <small>All Rights Reserved &copy; Copyright, Kushwifhat.</small>
        </div>
    </footer>
  )
}

export default Footer;

