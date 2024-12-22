import React from 'react';
import loading from '../assets/images/loading.gif';

const Loading = () => {

  return (
    <section className='loading'>
      <div className="loader_image">
        <img src={loading} alt="" />
      </div>
    </section>
  )
}

export default Loading
