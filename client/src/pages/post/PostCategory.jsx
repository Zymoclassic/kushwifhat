import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DataItem from "../../components/DataItem.jsx";
import axios from "axios";
import Loading from "../../components/Loading.jsx";

const PostCategory = () => {

  const [loader, setLoader] = useState(false);
  const [postCategory, setPostCategory] = useState([]);
  const [error, setError] = useState('');
  const{category} = useParams();

  useEffect(() => {
    const loadPosts = async () => {
      setError('')
      setLoader(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/categories/${category}`)
        setPostCategory(response?.data.postCategory)
        console.log(response.data)
      } catch (err) {
        setError(err.response.data.message || "Network connection, Please try again.")
      }
      
      setLoader(false)
    }
    
    loadPosts();
  }, [category])

  if(loader) {
    return <Loading />
  }

  return (
    <section className="allAuthorsContainer">
      {postCategory.length > 0 ? <div className='container postsContainer'>
        {
          postCategory.map(({_id: id, image, category, title, description, user, createdAt }) => 
            <DataItem key={id} image={image} category={category} title={title} description={description} user={user} createdAt={createdAt}/>)
        }</div> : <h2 className='center'>No posts found.</h2>}
    </section>
  )
}

export default PostCategory;
