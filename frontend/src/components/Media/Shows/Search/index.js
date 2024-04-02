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
            <div className='show-zone'>
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
                                <Link to={`/shows/show/${show._id}`}>
                                    <img src={show.coverImage} alt={show.name} />

                                    {/* somehow pass the information of the show to the singleShow page when clicked on */}
                                </Link>
                                
                                <div className='info'>
                                    <h2>{show.name}</h2>
                                </div>  
                                <h2>{show.grade} {show.score} </h2>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}   

export default Shows;
