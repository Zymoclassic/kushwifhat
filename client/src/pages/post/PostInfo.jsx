import React from 'react';
import PostAuthor from '../../components/PostAuthor.jsx';
import { Link } from 'react-router-dom';
import first from "../../assets/images/first.jpg";
import '../../assets/css/postinfo.css';

const PostInfo = () => {
  const Placeholder = 
    {
      id: "1",
      image: first,
      category: "education",
      title: "This is the first post",
      description:
        "The first mobile phone, introduced by Motorola in 1973, marked the beginning of the mobile communication revolution. Known as the Motorola DynaTAC 8000X, it was a groundbreaking device despite its bulky, brick-like design and considerable weight of about 1.1 kg. With limited functionality, this first phone primarily allowed users to make calls, and it offered just 30 minutes of talk time with a 10-hour recharge requirement. The device was a luxury item, retailing at nearly $4,000, affordable only to a select few. Yet, it was revolutionary, symbolizing freedom from the confines of landline telephones and sparking the journey to today’s ultra-thin, multi-functional smartphones. Over the years, mobile technology advanced rapidly, transforming the initial concept into pocket-sized devices that serve as powerful tools for communication, productivity, and entertainment. The first phone paved the way, laying the foundation for the mobile-dependent society we live in today.",
      user: "3",
    }
  return (
    <section className="postInfo">
      <div className="container postInfo_container">
        <div className="postInfo_header">
          <PostAuthor />
          <div className="postInfo_buttons">
            <Link to={`/posts/:id/edit`} className='btn sm primary'>edit</Link>
            <Link to={`/posts/:id/delete`} className='btn sm danger'>delete</Link>

          </div>
        </div>
        <h1 className='postInfo_title'>{Placeholder.title}</h1>
        <div className="postInfo_image">
          <img src={Placeholder.image} alt={Placeholder.title} />
        </div>
        <p>{Placeholder.description}</p>    
      </div>
    </section>
  )
}

export default PostInfo
