import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../assets/css/authors.css';
import axios from 'axios';
import Loading from '../../components/Loading';
import { UserContext } from '../../context/userContext';

const Authors = () => {

    const {currentUser} = useContext(UserContext);
    const navigate = useNavigate();
    const [toggleModal, setToggleModal] = useState(false);

    const toggleTab = () => {
        setToggleModal(true);
    }
  
  
    const redirect = () => {
      setToggleModal(false); // Close menu when a link is clicked
      navigate("/user/login")
    };

    //Check if a user is logged in, redirect to the log in page if not
    useEffect(() => {
        if(!currentUser || !currentUser.id) {
           toggleTab();
        }
    }, [currentUser, navigate])
    

    const [authors, setAuthors] = useState([]);
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
                alert(error || "Error in network connection.")
            }
            setLoader(false)
        }
        loadUsers();
    }, [error])

    if(loader) {
        return <Loading />
    }

  return (
    <section className='authors'>
        {authors.length > 0 ? <div className="authorContainer">
            {
                authors.map(({_id: id, image, name, blogs}) => {
                    return <Link to={`/user/${id}`} key={id} className='author' >
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

        <div className={toggleModal === true ? "modal active_modal" : "modal"}>
            <div className='modal-content'>
                <h6>Please log in or create an account to view this page</h6>
                <button className='btn sm primary' onClick={redirect}>Ok</button>
            </div>
        </div>  
      
    </section>
  )
}

export default Authors;
