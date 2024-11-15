import React from 'react'
import { Link } from 'react-router-dom';
import PostAuthors from '../pages/post/PostAuthors';

const Dataitem = ({id, image, category, title, description, user}) => {
  return (
    <article className='post'>
      <div className="postImage">
        <img src={image} alt={title} />
      </div>
      <div className="postContent">
        <Link to={`/posts/${id}`}>
         <h3>${title}</h3>
        </Link>

        <p>${description}</p>
        
        <div className="postFooter">

            <Link to={`/user/${user}`}>${user}</Link>
            <Link to={`/posts/categories/${category}`}>${category}</Link>

        </div>        
      </div>
    </article>
  )
}

export default Dataitem
