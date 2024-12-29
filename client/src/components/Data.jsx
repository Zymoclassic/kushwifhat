import React, { useState, useEffect } from "react";
import DataItem from "./DataItem";
import axios from "axios";
import Loading from "./Loading";


const Data = () => {

    const [postData, setPostData] = useState([]);
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState('');

  
    useEffect(() => {
      const loadPosts = async () => {
        setError('')
        setLoader(true);
        try {
          const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts`)
          setPostData(response?.data.blogs)
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
    <section className="posts">
      <h1 className='postHeader'>Latest Posts</h1>
      {postData.length > 0 ? <div className="container postsContainer">
        
      {
        postData.slice(0,6).map(({_id: id, image, category, title, description, user, createdAt}) => 
        <DataItem key={id} id={id} image={image} category={category} title={title} description={description} user={user} createdAt={createdAt} />)
      }
      </div> : <h2 className='center'>{ error || "No posts found."}</h2>}
    </section>
  )
}

export default Data;

