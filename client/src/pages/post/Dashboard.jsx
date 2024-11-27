import React, { useState } from 'react';
import { Placeholder } from '../../assets/js/file';
import { Link } from 'react-router-dom';
import '../../assets/css/dashboard.css';

const Dashboard = () => {
  const [userPosts, setUserPosts] = useState(Placeholder);

  return (
    <section className='dashboard'>
      {
        userPosts.length > 0 ? <div className="container postContainer">
          {
            userPosts.map(post => {
              return <article key={post.id} className="dashboardPosts">
                <div className="postInfo">
                  <div className="postImg">
                    <img src={post.image} alt="" />
                  </div>
                  <h5>{post.title}</h5>
                </div>
                <div className="postAction">
                  <Link to={'/posts/:id'} className='btn sm'>View</Link>
                  <Link to={'/posts/:id/edit'} className='btn sm primary'>Edit</Link>
                  <Link to={'/posts/:id/delete'} className='btn sm danger'>Delete</Link>
                </div>
              </article>
            })
          }
        </div> : <h2 className="center">No posts found!</h2>
      }
    </section>
  )
}

export default Dashboard;

