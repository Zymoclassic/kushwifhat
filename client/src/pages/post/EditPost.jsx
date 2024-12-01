import React, { useState } from 'react';


const EditPost = () => {

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Uncategorized');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const postCategories = [ "Uncategorized", "Entertainment", "Education", "Finance", "Technology", "Sport", "Art", "Agriculture" ];

  return (
    <section className='createPost'>
      <div className="container">
        <h2>Edit Post</h2>
        <p className="formErrorMessage">An error occured!</p>
        <form className="form createPostForm">
          <input type="text" placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} autoFocus/>
          <select name="category" value={category} onChange={e => setCategory(e.target.value)} id="">
            {postCategories.map(pc => <option key={pc}>{pc}</option>)}
          </select>
          <input type="file" onChange={e => setImage(e.target.files[0])} accept='png, jpg, jpeg' />
          <textarea type="text" placeholder='Description' value={description} onChange={e => setDescription(e.target.value)} />
          <button type='submit' className="btn primary">Update Post</button>
        </form>
      </div>
    </section>
  )
}

export default EditPost;
