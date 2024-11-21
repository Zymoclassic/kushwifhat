import React, { useState } from 'react';
import DataItem from '../../components/DataItem';
import { Placeholder } from '../../assets/js/file';

const AllPosts = () => {
  const [posts, setPosts] = useState(Placeholder);

  return (
    <section className="allAuthorsContainer">
      {posts.length > 0 ? <div className='container postsContainer'>
        {
          posts.map(({id, image, category, title, description, user}) => 
            <DataItem key={id} image={image} category={category} title={title} description={description} user={user} />)
        }</div> : <h2 className='center'>No posts found.</h2>}
    </section>
  )
}

export default AllPosts;
