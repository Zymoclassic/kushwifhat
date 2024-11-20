import React from 'react'
import { Link } from 'react-router-dom';
import PostAuthor from './PostAuthor';


const DataItem = ({id, image, category, title, description, user}) => {
  return (
    <article className='post'>
      <div className="postImage">
        <img src={image} alt={title} />
      </div>
      <div className="postContent">
        <Link to={`/posts/${id}`}>
         <h3>{title}</h3>
        </Link>

        <p>{description}</p>
        
        <div className="postFooter">

            < PostAuthor />
            <Link to={`/posts/categories/${category}`} className='btn category'>{category}</Link>

        </div>        
      </div>
    </article>
  )
}

export default DataItem;
