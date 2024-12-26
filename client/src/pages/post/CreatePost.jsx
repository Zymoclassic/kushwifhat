import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import axios from 'axios';
import Loading from '../../components/Loading';
  
const CreatePost = () => {

  const {currentUser} = useContext(UserContext);
  const navigate = useNavigate();

  const [postDetails, setPostDetails] = useState({
    title: '',
    description: '',
    category: '',
    user: currentUser.id
  })
  
  const [image, setImage] = useState('');
  const [error, setError] = useState('');
  const [loader, setLoader] = useState(null);

  const changeInputHandler = (e) => {
    setPostDetails(prevState => {
      return {...prevState, [e.target.name] : e.target.value }
    })
  }

  // post details
  const createPost = async (e) => {
    e.preventDefault()
    setError('')
    setLoader(true);
    const postData = new FormData();
    postData.set('title', postDetails.title)
    postData.set('description', postDetails.description)
    postData.set('category', postDetails.category)
    postData.set('user', postDetails.user || currentUser?.id)
    postData.set('image', image)

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/posts/create`, postData, { withCredentials: true  });
      const createdPost = await response.data;
      navigate(`/posts`)
      // if(createdPost) {
      //   toggleTab();
      // } else {
      //   setError("Couldn't update the user information,Please try again later.")
      // }
    } catch (err) {
      setError(err.response.data.message)
    }
    setLoader(false)
  }


  useEffect(() => {
    if(!currentUser?.id) {
      navigate("/user/login")
    }
  }, [currentUser.id, navigate])

  const postCategories = [ "uncategorized", "entertainment", "health", "romance", "education", "finance", "technology", "sport", "art", "agriculture", "politics" ];

  return (
    <section className='createPost'>
      <div className="container">
        <h2>Create Post</h2>
        {error && <p className="formErrorMessage">{error}</p>}
        <form className="form createPostForm" onSubmit={createPost}>
          <input type="text" placeholder='Title' name='title' value={postDetails.title} onChange={changeInputHandler} autoFocus/>
          <select name="category" value={postDetails.category} onChange={changeInputHandler} id="">
            {postCategories.map(pc => <option key={pc}>{pc}</option>)}
          </select>
          <input type="file" name='image' onChange={e => setImage(e.target.files[0])} accept='png, jpg, jpeg' />
          <textarea type="text" name='description' placeholder='Description' value={postDetails.description} onChange={changeInputHandler} />
          <button type='submit' className="btn primary">Create Post</button>
        </form>
      </div>
    </section>
  )
}

export default CreatePost;
