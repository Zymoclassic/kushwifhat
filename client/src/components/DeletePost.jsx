import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';

const DeletePost = () => {

    const navigate = useNavigate();


    const authToken = currentUser
  return (
    <div>
      <Link to={`/posts/:id/delete`} className='btn sm danger'>delete</Link>
    </div>
  )
}

export default DeletePost
