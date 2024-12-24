import React, { useState, useEffect, useContext } from 'react';
import PostAuthor from '../../components/PostAuthor.jsx';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../context/userContext.js';
import axios from 'axios';
import '../../assets/css/postinfo.css';
import Loading from '../../components/Loading.jsx';

const PostInfo = ({user, createdAt}) => {

  const { id } = useParams();

  const {currentUser} = useContext(UserContext);

  const [postInfo, setPostInfo] = useState({})
  const [error, setError] = useState('');
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    const loadPostInfo = async () => {
      setLoader(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/${id}`)
        setPostInfo(response?.data.blog)
      } catch (err) {
        setError(err.response?.data.message || 'Network connection, Please try again.')
      }
      setLoader(false)
    }
    loadPostInfo();
  },[id])

  if(loader) {
    return <Loading />
  }

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/posts/${id}`, {
          headers: {
            Authorization: `Bearer ${currentUser?.token}`,
          },
        });
        alert(response.data.message);
        window.location.href = "/posts"; // Redirect after delete
      } catch (err) {
        alert(err.response?.data.message || "Failed to delete the post. Please try again.");
      }
    }
  };


  return (
    <section className="postInfo">
    {error && <p className='formErrorMessage'>{error}</p>}
      {postInfo?.title && <div className="container postInfo_container">
        <div className="postInfo_header">
          <PostAuthor user={user} createdAt={createdAt}/>
          <div className="postInfo_buttons">
            <Link to={`/posts/:id/edit`} className='btn sm primary'>edit</Link>
            <Link onClick={handleDelete} className='btn sm danger'>delete</Link>
          </div>
        </div>
        <h1 className='postInfo_title'>{postInfo.title}</h1>
        <div className="postInfo_image">
          <img src={`${process.env.REACT_APP_UPLOADS_URL}/uploads/${postInfo.image}`} alt={postInfo.title} />
        </div>
        <p>{postInfo.description}</p>    
      </div>}
    </section>
  )
}

export default PostInfo;
