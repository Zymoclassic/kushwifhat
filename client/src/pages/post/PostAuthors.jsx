import React, { useState, useEffect, useContext } from 'react';
import DataItem from '../../components/DataItem';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from '../../components/Loading';
import { UserContext } from '../../context/userContext';

const PostAuthors = () => {
  const {id} = useParams();
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);

  const {currentUser} = useContext(UserContext)
  const navigate = useNavigate();

  useEffect(() => {
    if(!currentUser?.id || currentUser?.id == null) {
      navigate("/user/login")
    }
  }, [])

  useEffect(() => {

    const authorPosts = async () => {
      setError('')
      setLoader(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/user/${id}`)
        setPosts(response?.data.userInfo.blogs)
      } catch (err) {
        setError(err.response.data.message)
      }

      setLoader(false);

    }

    authorPosts();

  },[id])

  if (!currentUser) {
    return <Loading /> // Prevent rendering until currentUser is defined
  }

  if(loader) {
    return <Loading />
  }
  
  return (
    <section className="postAuthorsContainer">
      {posts.length > 0 ? <div className='container postsContainer'>
        {
          posts.map(({_id:id, image, category, title, description, user, createdAt}) => 
            <DataItem key={id} id={id} image={image} category={category} title={title} description={description} user={user} createdAt={createdAt}/>)
        }</div> : <h2 className='center'>No posts found.</h2>}
    </section>
  )
}

export default PostAuthors;
