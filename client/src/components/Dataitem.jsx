import React from 'react'
import { Link } from 'react-router-dom';
import PostAuthor from './PostAuthor';


const DataItem = ({id, image, category, title, description, user}) => {
  const shortDesc = description.length > 120 ? description.substr(0, 120) + "..." : description;
  const shortTitle = title.length > 30 ? title.substr(0, 30) + "..." : title;
  return (
    <article className='post'>
      <div className="postImage">
        <img src={image} alt={title} />
      </div>
      <div className="postContent">
        <Link to={`/posts/${id}`}>
         <h3>{shortTitle}</h3>
        </Link>

        <p>{shortDesc}</p>
        
        <div className="postFooter">

            < PostAuthor />
            <Link to={`/posts/categories/${category}`} className='btn category'>{category}</Link>

        </div>        
      </div>
    </article>
  )
}

export default DataItem;