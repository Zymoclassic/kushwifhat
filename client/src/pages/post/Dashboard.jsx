import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom';
import '../../assets/css/dashboard.css';
import { UserContext } from '../../context/userContext';
import axios from 'axios';
import Loading from '../../components/Loading';

const Dashboard = () => {
  
  const { id } = useParams(); // Extract `id` from the URL

  const {currentUser} = useContext(UserContext)
  const navigate = useNavigate();

  useEffect(() => {
    if(!currentUser?.id) {
      navigate(`/user/login`)
    }
  }, [currentUser.id, navigate])
  

  const [userID, setUserID] = useState('');
  const [userPosts, setUserPosts] = useState({});
  const [error, setError] = useState('');
  const [loader, setLoader] = useState(false)

  const [toggleModal, setToggleModal] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);

  useEffect(() => {
    const loadPostInfo = async () => {
      setLoader(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/user/${id}`)
        setUserPosts(response.data.userInfo.blogs)
        setUserID(response.data.userInfo._id)
      } catch (err) {
        setError(err.response?.data.message || 'Network connection, Please try again.')
      }
      setLoader(false)
    }
    loadPostInfo();
  }, [id])


  useEffect(() => {
    if(userID && currentUser.id && currentUser.id !== userID) {
      navigate(`/user/${currentUser.id}`)
    }
  }, [userID, currentUser.id, navigate])

  

  const toggleTab = (postId) => {
    setSelectedPostId(postId);
    setToggleModal(true);
  };



  const cancelDelete = () => {
    setToggleModal(false); // Close menu when a link is clicked
  };

  if (!currentUser) {
    return <Loading /> // Prevent rendering until currentUser is defined
  }

  if(loader) {
    return <Loading />
  }

  const handleDelete = async () => {
      try {
        const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/posts/${selectedPostId}`, {
          withCredentials: true,
        });
        alert(response.data.message);
        navigate(`/posts`)
      } catch (err) {
        alert(err.response?.data.message || "Failed to delete the post. Please try again.");
        navigate(`/posts`)
      }
    }


  return (
    <section className='dashboard'>
      {
        userPosts.length > 0 ? <div className="container postContainer">
          {
            userPosts.map(post => {
              return <article key={post.id} className="dashboardPosts">
                <div className="postInfo">
                  <div className="postImg">
                    <img src={`${process.env.REACT_APP_UPLOADS_URL}/uploads/${post.image}`} alt="" />
                  </div>
                  <h5>{post.title}</h5>
                </div>
                <div className="postAction">
                  <Link to={`/posts/${post._id}`} className='btn sm'>View</Link>
                  <Link to={`/posts/${post._id}/edit`} className='btn sm primary'>Edit</Link>
                  <Link onClick={() => toggleTab(post._id)} className='btn sm danger'>Delete</Link>
                </div>
                <div className={toggleModal === true ? "dashboard-modal active_modal" : "dashboard-modal"}>
                <div className='dashboard_modal-content'>
                    <h6>Are you sure you want to delete this post?</h6>
                      <div className='delPostBtn'>
                        <button className='btn sm danger' onClick={handleDelete}>YES</button>
                        <button className='btn sm primary' onClick={cancelDelete}>NO</button>
                      </div>
                    </div>
                </div>  
              </article>
            })
          }
        </div> : <h2 className="center">No posts found!</h2>
      }
    </section>
  )
}

export default Dashboard;

