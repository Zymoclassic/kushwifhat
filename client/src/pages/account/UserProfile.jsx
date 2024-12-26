import React, { useState, useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../../assets/css/user.css';
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from '../../components/Loading';

const UserProfile = () => {

  // get request states for changedp
  const {id} = useParams();
  const [userDetails, setUserDetails] = useState({});
  const navigate = useNavigate();

  const [uploadErr, setUploadErr] = useState(null);
  const [updateErr, setUpdateErr] = useState(null);

  const [toggleModal, setToggleModal] = useState(false);
  const { currentUser } = useContext(UserContext);
  const [loader, setLoader] = useState(null);
  const [error, setError] = useState(null);

  // post request state for changedp
  const [avatar, setAvatar] = useState('');

  // post request states for edit details
  const [userInfo, setUserInfo] = useState({
    name:'',
    email:'',
    currentPassword:'',
    newPassword:'',
    newConfirmPassword:''
  })

  const changeInputHandler = (e) => {
    setUserInfo(prevState => {
      return {...prevState, [e.target.name] : e.target.value }
    })
  }

  useEffect(() => {
    if(!currentUser?.id) {
      navigate("/user/login")
    }
  }, [id, currentUser?.id, navigate]);

  const toggleTab = () => {
    setToggleModal(true);
  };

  const confirmNotification = () => {
    setToggleModal(false); // Close menu when a link is clicked
    window.location.reload();
  };


  // user details update
  const updateUser = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}/user/editdetails`, userInfo, { withCredentials: true });
      const updatedUser = await response.data;
      console.log(updateUser);
      if(updatedUser) {
        toggleTab();
      } else {
        setUpdateErr("Couldn't update the user information,Please try again later.")
      }
    } catch (err) {
      setUpdateErr(err.response.data.message)
    }
  }

  // user dp update
  const updateUserImage = async (e) => {
    e.preventDefault();
    setUploadErr(null); // Reset error message
    setLoader(true); // Show loader while processing
  
    try {
      // Constructing FormData for file upload
      const formData = new FormData();
      formData.append('image', avatar);
  
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/user/changedp`,
        formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data', // Ensure the correct headers for file uploads
          },
        }
      );
  
      const updatedImage = await response.data;
      alert("Upload successful")
      console.log(updatedImage);
  
      if (updatedImage) {
        toggleTab(); // Show the modal for successful update
        // Optionally update the userDetails state to reflect the new image without reloading
        setUserDetails((prevDetails) => ({
          ...prevDetails,
          image: updatedImage.image, // Assuming the response contains the updated image path
        }));
      } else {
        setUploadErr("Couldn't update the display picture. Please try again later.");
        alert(uploadErr)
      }
    } catch (err) {
      setUploadErr(err.response?.data?.message || 'An error occurred while updating the display picture.');
      alert(uploadErr)
    }
  
    setLoader(false); // Hide loader after processing
  };
  

  useEffect(() => {
    const loadUserDetails = async () => {

      setLoader(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/user/${id}`);
        setUserDetails(response.data.user);
      } catch (err) {
        setError(err.response.data.message);
      }
      setLoader(false);
    }
    navigate(`/user/${id}`)
    loadUserDetails();
  }, [id, navigate])

  if(loader) {
    return <Loading />
  }



  return (
    <section className='profile'>
      <div className="container profileContainer">
        <Link to={`/posts/user/${userDetails._id}`} className='btn'>My posts</Link>

        <div className="profileDetails">
          <div className="imageWrapper">
            <div className="profileImage">
              <img src={`${process.env.REACT_APP_UPLOADS_URL}/uploads/${userDetails.image}`} alt={userDetails.name} />
            </div>
            {/* update DP */}
            <form onSubmit={updateUserImage} className="imageForm">
              <input type="file" name='image' id='avatar' accept='image/png, image/jpg, image/jpeg, image/gif' onChange={e => {setAvatar(e.target.files[0]); updateUserImage(e);}} />
              <label htmlFor="avatar"><i className="uil uil-edit"></i></label>
            </form>
            {/* <button className="profileImage_btn"><i className="uil uil-check"></i></button> */}
          </div>

          <h1>{userDetails.name}</h1>
          <p>{userDetails.email}</p>

          <form onSubmit={updateUser} className="form profileForm">
            {updateErr && <p className='formError_message'>{updateErr}</p>}
            <input type="text" name="name" placeholder='Full Name' value={userInfo.name} onChange={changeInputHandler} />
            <input type="email" name="email" placeholder='Email Address' value={userInfo.email} onChange={changeInputHandler} />
            <input type="password" name="currentPassword" placeholder='Current Password' value={userInfo.currentPassword} onChange={changeInputHandler} />
            <input type="password" name="newPassword" placeholder='New Password' value={userInfo.newPassword} onChange={changeInputHandler} />
            <input type="password" name="confirmNewPassword" placeholder='Confirm New Password' value={userInfo.confirmNewPassword} onChange={changeInputHandler} />
            <button type='submit' className='btn primary'>Change details</button>
          </form>

          <div className={toggleModal === true ? "profile-modal active_modal" : "profile-modal"}>
            <div className='profile-modal-content'>
              <h6>Profile Information successfully updated</h6>
              <button className='btn sm primary' onClick={confirmNotification}>OK</button>
            </div>
        </div>   
        </div>

      </div>
    </section>
  )
}

export default UserProfile;
