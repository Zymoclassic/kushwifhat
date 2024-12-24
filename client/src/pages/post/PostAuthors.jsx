import React, { useState, useEffect } from 'react';
import DataItem from '../../components/DataItem';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PostAuthors = () => {
  const {id} = useParams();
  const [posts, setPosts] = useState({});
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {

    const authorPosts = async () => {
      setError('')
      setLoader(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/user/${id}`)
        setPosts(response?.data.userInfo.blogs)
        console.log(response.data)
      } catch (err) {
        setError(err.response.data.message)
      }

      setLoader(false);

    }

    authorPosts();

  },[id])
  
  return (
    <section className="postAuthorsContainer">
      {posts.length > 0 ? <div className='container postsContainer'>
        {
          posts.map(({_id:id, image, category, title, description, user}) => 
            <DataItem key={id} id={id} image={image} category={category} title={title} description={description} user={user} />)
        }</div> : <h2 className='center'>No posts found.</h2>}
    </section>
  )
}

export default PostAuthors;
