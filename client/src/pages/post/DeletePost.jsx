import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';
  

const DeletePost = () => {
  
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate()

  useEffect(() => {
    if(!currentUser?.id) {
      navigate("/user/login")
    }
  }, [])
  
  return (
    <section>
      <h1>Delete Post</h1>
    </section>
  )
}

export default DeletePost
