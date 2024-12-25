import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactTimeAgo from 'react-time-ago';
import TimeAgo from 'javascript-time-ago';

import en from 'javascript-time-ago/locale/en.json';
import ru from 'javascript-time-ago/locale/ru.json';

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)

const PostAuthor = ({user, createdAt}) => {

  const [userDetails, setUserDetails] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    const loadUserDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/user/${user}`)
        setUserDetails(response?.data.user)
      } catch (err) {
        setError(err.response?.data.message || 'Network connection, Please try again.')
      }
      
    }
    loadUserDetails();
  }, [])

  const isValidDate = (date) => {
    return !isNaN(new Date(date).getTime());
  };

  return (
    <Link to={`/posts/user/${userDetails._id}`} className='postAuthor'>
      <div>
        <img src={`${process.env.REACT_APP_UPLOADS_URL}/uploads/${userDetails.image}`} alt={userDetails.name} className='authorAvatar' />
      </div>
      <div className="authorDetails">
        <h5 className='authorName'>By: {userDetails?.name}</h5>
        <small>{isValidDate(createdAt) ? (
            <ReactTimeAgo date={new Date(createdAt)} locale='en-US' />
          ) : (
            "loading"
          )}</small>
      </div>
    </Link>
  )
}

export default PostAuthor;
