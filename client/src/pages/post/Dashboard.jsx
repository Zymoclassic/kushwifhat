import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom';
import '../../assets/css/dashboard.css';
import { UserContext } from '../../context/userContext';
import axios from 'axios';
import Loading from '../../components/Loading';

const Dashboard = () => {
  
  const { id } = useParams(); // Extract `id` from the URL
  const [userID, setUserID] = useState(null); // Local state

  useEffect(() => {
    if (id) {
      setUserID(id); // Update local state
    }
  }, [id]);
  
  const navigate = useNavigate();

  const [userPosts, setUserPosts] = useState({});
  const [error, setError] = useState('');
  const [loader, setLoader] = useState(false)

  const {currentUser} = useContext(UserContext);

  const [toggleModal, setToggleModal] = useState(false);

  useEffect(() => {
    const loadPostInfo = async () => {
      setLoader(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/user/${id}`)
        setUserPosts(response?.data.blog)
      } catch (err) {
        setError(err.response?.data.message || 'Network connection, Please try again.')
      }
      setLoader(false)
    }
    loadPostInfo();
  }, [id])

  useEffect(() => {
    if(currentUser?.id !== userID) {
      navigate(`/user/${currentUser.id}`)
    }
  }, [id])

  const toggleTab = () => {
      setToggleModal(true);
  }


  const cancelDelete = () => {
    setToggleModal(false); // Close menu when a link is clicked
  };

  if(loader) {
    return <Loading />
  }

  const handleDelete = async () => {
      try {
        const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/posts/${id}`, {
          withCredentials: true,
        });
        alert(response.data.message);
        navigate('/user')
      } catch (err) {
        alert(err.response?.data.message || "Failed to delete the post. Please try again.");
        navigate(`/user`)
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
                    <img src={post.image} alt="" />
                  </div>
                  <h5>{post.title}</h5>
                </div>
                <div className="postAction">
                  <Link to={'/posts/:id'} className='btn sm'>View</Link>
                  <Link to={'/posts/:id/edit'} className='btn sm primary'>Edit</Link>
                  <button onClick={toggleTab} className='btn sm danger'>Delete</button>
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

