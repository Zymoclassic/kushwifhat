import React, { useState } from 'react';

import user1 from '../../assets/images/user1.jpg';
import user2 from '../../assets/images/user2.jpg';
import user3 from '../../assets/images/user3.jpg';
import user4 from '../../assets/images/user4.jpg';
import user5 from '../../assets/images/user5.jpg';
import user6 from '../../assets/images/user6.jpg';

const authorsData = [
    {id: 1, image: user1, name: "Micah", posts: 5},
    {id: 2, image: user2, name: "Richard", posts: 1},
    {id: 3, image: user3, name: "Eloise", posts: 7},
    {id: 4, image: user4, name: "Barkley", posts: 2},
    {id: 5, image: user5, name: "Kingsley", posts: 3},
    {id: 6, image: user6, name: "Yakoma", posts: 6}
]

const Authors = () => {
    const [authors, setAuthors] = useState(authorsData);

  return (
    <section className='authors'>
        {authors.length > 0 ? <div className="container authorContainer">
            {
                authors.map()
            }

        </div> : <h2 className='center'>No Authors found</h2> }
      
    </section>
  )
}

export default Authors;
