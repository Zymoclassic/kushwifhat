import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../context/userContext';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from '../../components/Loading';
  


const EditPost = () => {

  const {id} = useParams();

  const { currentUser } = useContext(UserContext);
  const [loader, setLoader] = useState(true)

  const postCategories = [ "uncategorized", "entertainment", "health", "romance", "education", "finance", "technology", "sport", "art", "agriculture", "politics" ];

  const navigate = useNavigate()

  useEffect(() => {
    if(!currentUser?.id) {
      navigate(`/user/${id}`)
    }
  }, [currentUser, id, navigate])

  const [postDetails, setPostDetails] = useState({
    title: '',
    description: '',
    category: '',
    user: currentUser.id
  })
  
  const [image, setImage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/${id}`);
        console.log(response.data)
        setPostDetails({
          ...postDetails, // Preserve existing state values
          title: response.data.blog.title, // Update only the title
          description: response.data.blog.description, // Update other fields as needed
          category: response.data.blog.category,
        });
      } catch (err) {
        console.error('Error fetching post:', err); // Log error to console
        setError('Failed to fetch post details.'); // Update error state
      } finally {
        setLoader(false);
      }
    };

    if (id) getPost(); // Ensure `id` is valid before making API call
  }, [id]); // Run effect only when `id` changes

  const changeInputHandler = (e) => {
    setPostDetails(prevState => {
      return {...prevState, [e.target.name] : e.target.value }
    })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && ["image/png", "image/jpeg", "image/jpg", "image/gif"].includes(file.type)) {
      setImage(file);
    } else {
      setError("Please upload a valid image file (png, jpg, jpeg).");
    }
  };
  

  // post details
  const updatePost = async (e) => {
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
      const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}/posts/${id}`, postData, { withCredentials: true  });
      const updatedPost = await response.data;
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

  if(loader) {
    return <Loading />
  }


  return (
    <section className='createPost'>
      <div className="container">
        <h2>Edit Post</h2>
        {error && <p className="formErrorMessage">{error}</p>}
        <form className="form createPostForm" onSubmit={updatePost}>
          <input type="text" placeholder='Title' name = 'title' value={postDetails.title} onChange={changeInputHandler} autoFocus/>
          <select name="category" value={postDetails.category} onChange={changeInputHandler} id="">
            {postCategories.map(pc => <option key={pc}>{pc}</option>)}
          </select>
          <input type="file" onChange={handleImageChange} accept='png, jpg, jpeg' />
          <textarea type="text" name='description' placeholder='Description' value={postDetails.description} onChange={changeInputHandler} />
          <button type='submit' className="btn primary">Update Post</button>
        </form>
      </div>
    </section>
  )
}

export default EditPost;
