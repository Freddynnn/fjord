import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.scss'

const Shows = ({ user }) => {
    const [shows, setShows] = useState([]);
    const [search, setSearch] = useState(''); 
    const [showsFetched, setShowsFetched] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
       fetchShows();
    }, []);

    const fetchShows = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/media/${user._id}/show`);
            setShows(response.data);
            setShowsFetched(true);
            console.log('Shows fetched:', response.data); // Print the results of the request to the console
        } catch (error) {
            console.error('Error fetching user shows:', error);
        }
    };

    const handleShowClick = (id) => {
        navigate('/shows/show/' + id);
    }

    const filteredShows = shows.filter((show) =>
        show.name.toLowerCase().includes(search.toLowerCase()) 
    );

    return (
        <div className='container'>
            <div className='text-zone'>
                <span className="show-search-bar">
                    <h1>
                        SHOWS
                    </h1>
                    <input
                        type="text"
                        placeholder="Search shows ..."
                        value={search} 
                        onChange={(e) => setSearch(e.target.value)} 
                    />
                </span>

                <div className='show-results'>
                    <ul className='show-list'>         
                        {filteredShows.map((show) => (

                            // list of all shows
                            <li key={show._id}>
                                <Link to={`/shows/show/${show._id}`} state={{ show }}>
                                    <img src={show.coverImage} alt={show.name} />
                                </Link>
                                
                                <div className='title'>
                                    <h2>{show.grade} {show.score} </h2>
                                    <h2>{show.name}</h2>
                                </div>  
                                
                                {/* <button className="button" onClick={() => handleShowClick(show._id)}>
                                    View
                                </button> */}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* {searchResults.length > 0 && (
                    <div className='search-results'>
                       <ul>
                            {searchResults.map((item, index) => {
                                const imageUrl = item.i ? item.i.imageUrl : "https://m.media-amazon.com/images/M/MV5BYzZjMTk5NjctMDg1Yy00N2I1LTk1NTUtODcwOWRlOWVkNjlmXkEyXkFqcGdeQXVyMTk2ODc0MjY@._V1_.jpg";
                                const title = item.l;
                                const type = item.q;

                                return (
                                    <li key={index}>  
                                        <Link to="/new" state={{ item}}>
                                            <img src={imageUrl} alt={title} />
                                        </Link>
                                        <div className='title'>
                                            <h2>{title}</h2>
                                        </div>  
                                    </li>        
                                );
                            })}
                        </ul>
                    </div>
                )} */}
            </div>
        </div>
    );
}   

export default Shows;
