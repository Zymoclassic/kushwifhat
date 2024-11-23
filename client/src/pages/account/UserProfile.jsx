import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import user from '../../assets/images/user3.jpg';
import '../../assets/css/user.css';

const UserProfile = () => {
  const [avatar, setAvatar] = useState(user);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  return (
    <section className='profile'>
      <div className="container profileContainer">
        <Link to={`/posts/user/:id`} className='btn'>My posts</Link>

        <div className="profileDetails">
          <div className="imageWrapper">
            <div className="profileImage">
              <img src={avatar} alt="" />
            </div>
            {/* update DP */}
            <form action="" className="imageForm">
              <input type="file" name='avatar' id='avatar' accept='png, jpg, jpeg' onChange={e => setAvatar(e.target.files[0])} />
              <label htmlFor="avatar"><i className="uil uil-edit"></i></label>
            </form>
            <button className="profileImage_btn"><i className="uil uil-check"></i></button>
          </div>

          <h1>Koly Zymo</h1>

          <form action="" className="form profileForm">
            <p className='formError_message'>Sorry, an error occured!</p>
            <input type="text" placeholder='Full Name' value={name} onChange={e => setName(e.target.value)} />
            <input type="email" placeholder='Email Address' value={email} onChange={e => setEmail(e.target.value)} />
            <input type="passwprd" placeholder='Current Password' value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} />
            <input type="passwprd" placeholder='New Password' value={newPassword} onChange={e => setNewPassword(e.target.value)} />
            <input type="passwprd" placeholder='Confirm New Password' value={confirmNewPassword} onChange={e => setConfirmNewPassword(e.target.value)} />
            <button type='submit' className='btn primary'>Change details</button>
          </form>

        </div>

      </div>
    </section>
  )
}

export default UserProfile;
