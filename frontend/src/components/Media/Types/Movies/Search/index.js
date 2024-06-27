import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import MediaList from '../../../MediaList';
import MediaFilters from '../../../MediaFilters';
import axios from 'axios';
import './index.scss'

const Movies = ({ user }) => {
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState(''); 
    const [moviesFetched, setMoviesFetched] = useState(false);
    const [filteredMovies, setFilteredMovies] = useState(movies);
    const navigate = useNavigate();

    useEffect(() => {
       fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:3001/media/${user._id}/movie`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            setMovies(response.data);
            setMoviesFetched(true);
        } catch (error) {
            console.error('Error fetching user movies:', error);
        }
    };

    useEffect(() => {
        if (moviesFetched) {
            setFilteredMovies(movies);
        }
    }, [moviesFetched]);
    
    return (
        <div className='container'>
            <div className='media-zone'>
                <span className="media-search-bar">
                    <h1>
                        MOVIES
                    </h1>
                    <input
                        type="text"
                        placeholder="Search movies ..."
                        value={search} 
                        onChange={(e) => setSearch(e.target.value)} 
                    />
                </span> 

                <MediaFilters 
                    initialMedia={movies}
                    search={search}
                    onFilter={setFilteredMovies}
                />

                <MediaList mediaItems={filteredMovies} mediaType="movies" />
            </div>
        </div>
    );
}   

export default Movies;