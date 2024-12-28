import React, { useState, useEffect, useContext } from 'react';
import PostAuthor from '../../components/PostAuthor.jsx';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext.js';
import axios from 'axios';
import '../../assets/css/postinfo.css';
import Loading from '../../components/Loading.jsx';

const PostInfo = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [postInfo, setPostInfo] = useState({})
  const [error, setError] = useState('');
  const [loader, setLoader] = useState(false)

  const {currentUser} = useContext(UserContext);

  const [toggleModal, setToggleModal] = useState(false);

  const toggleTab = () => {
      setToggleModal(true);
  }


  const cancelDelete = () => {
    setToggleModal(false); // Close menu when a link is clicked
  };

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
  }, [id])

  if(loader) {
    return <Loading />
  }

  const handleDelete = async () => {
      try {
        const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/posts/${id}`, {
          withCredentials: true,
        });
        alert(response.data.message);
        navigate('/posts')
      } catch (err) {
        alert(err.response?.data.message || "Failed to delete the post. Please try again.");
        navigate(`/posts`)
      }
    }


  return (
    <section className="postInfo">
    {error && <p className='formErrorMessage'>{error}</p>}
      {postInfo?.title && <div className="container postInfo_container">
        <div className="postInfo_header">
          <PostAuthor user={postInfo.user}createdAt={postInfo.createdAt}/>
          {currentUser?.id === postInfo?.user && <div className="postInfo_buttons">
            <Link to={`/posts/${id}/edit`} className='btn sm primary'>edit</Link>
            <Link onClick={toggleTab} className='btn sm danger'>delete</Link>
          </div>}
        </div>
        <h1 className='postInfo_title'>{postInfo.title}</h1>
        <div className="postInfo_image">
          <img src={`${process.env.REACT_APP_UPLOADS_URL}/uploads/${postInfo.image}`} alt={postInfo.title} />
        </div>
        <p>{postInfo.description}</p>
        <div className={toggleModal === true ? "modal active_modal" : "modal"}>
            <div className='modal-content'>
              <h6>Are you sure you want to delete this post?</h6>
              <div className='delPostBtn'>
                <button className='btn sm danger' onClick={handleDelete}>YES</button>
                <button className='btn sm primary' onClick={cancelDelete}>NO</button>
              </div>
            </div>
        </div>   
      </div>}

    </section>
  )
}

export default PostInfo;
