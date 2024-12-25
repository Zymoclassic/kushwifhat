import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/authors.css';
import axios from 'axios';
import Loading from '../../components/Loading';

const Authors = () => {

    const [authors, setAuthors] = useState({});
    const [error, setError] = useState(null);
    const [loader, setLoader] = useState(null);

    useEffect(() => {
        setLoader(true)
        const loadUsers = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/user`)
                setAuthors(response.data.users)
            } catch (err) {
                setError(err.response.data.message)
            }
            setLoader(false)
        }
        loadUsers();
    }, [])

    if(loader) {
        return <Loading />
    }

  return (
    <section className='authors'>
        {authors.length > 0 ? <div className="authorContainer">
            {
                authors.map(({_id: id, image, name, blogs}) => {
                    return <Link to={`/posts/user/${id}`} key={id} className='author' >
                        <div className="authorImage">
                            <img src={`${process.env.REACT_APP_UPLOADS_URL}/uploads/${image}`} alt={name} />
                        </div>
                        <div className="authorInfo">
                            <h6>{name}</h6>
                            <p>{blogs.length} {blogs.length <= 1 ? 'Post' : 'Posts'}</p>
                        </div>
                    </Link>
                })
            }

        </div> : <h2 className='center'>No Authors found</h2> }
      
    </section>
  )
}

export default Authors;
