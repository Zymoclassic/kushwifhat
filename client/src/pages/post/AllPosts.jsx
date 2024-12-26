import React, { useEffect, useState } from 'react';
import DataItem from '../../components/DataItem';
import Loading from '../../components/Loading';
import axios from 'axios';


const AllPosts = () => {

  const [loader, setLoader] = useState(false);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadPosts = async () => {
      setError('')
      setLoader(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts`)
        setPosts(response?.data.blogs)
      } catch (err) {
        setError(err.response.data.message || "Network connection, Please try again.")
      }
      
      setLoader(false)
    }
    
    loadPosts();
  }, [])

  if(loader) {
    return <Loading />
  }

  return (
    <section className="allAuthorsContainer">
      {posts.length > 0 ? <div className='container postsContainer'>
        {
          posts.map(({_id: id, image, category, title, description, user, createdAt}) => 
            <DataItem key={id} id={id} image={image} category={category} title={title} description={description} user={user} createdAt={createdAt}/>)
        }</div> : <h2 className='center'>{error}</h2>}
    </section>
  )
}

export default AllPosts;
