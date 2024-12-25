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
  }, [id]);



  const updateUser = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}/user/editdetails`, userInfo, { withCredentials: true });
      const updatedUser = await response.data;
      alert()
      if(!updatedUser) {
        setUpdateErr("Couldn't update the user information,Please try again later.")
      }
      navigate(`/user/${id}`)
    } catch (err) {
      setUpdateErr(err.response.data.message)
    }
  }




  useEffect(() => {
    const loadUserDetails = async () => {

      setLoader(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/user/${id}`);
        setUserDetails(response.data.user);
        console.log(response.data)
      } catch (err) {
        setError(err.response.data.message);
      }
      setLoader(false);
    }
    loadUserDetails();
  }, [id])

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
            <form action="" className="imageForm">
              <input type="file" name='avatar' id='avatar' accept='png, jpg, jpeg' onChange={e => setAvatar(e.target.files[0])} />
              <label htmlFor="avatar"><i className="uil uil-edit"></i></label>
            </form>
            <button className="profileImage_btn"><i className="uil uil-check"></i></button>
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

        </div>

      </div>
    </section>
  )
}

export default UserProfile;
