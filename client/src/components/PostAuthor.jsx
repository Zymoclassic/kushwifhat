import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../assets/images/Zhub.jpg';

const PostAuthor = () => {
  return (
    <Link to={``} className='postAuthor'>
      <div>
        <img src={Avatar} alt="name" className='authorAvatar' />
      </div>
      <div className="authorDetails">
        <h5 className='authorName'>By: Koly Zymo</h5>
        <small>Just now</small>
      </div>
    </Link>
  )
}

export default PostAuthor;
