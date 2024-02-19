import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.scss'

const Movies = ({ user }) => {
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState(''); 
    const [moviesFetched, setMoviesFetched] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const skyContainer = document.getElementById('skyContainer');

        const fetchMovies = async () => {
            try {
                const response = await axios.get(`https://starmap-43wf.onrender.com/constellations/${user._id}`);
                setMovies(response.data);
                setMoviesFetched(true);
            } catch (error) {
                console.error('Error fetching user movies:', error);
            }
        };
    }, []);


    const handleMovieClick = (id) => {
        navigate('/movies/movie/' + id);
    }


    // need to return the movies and map them into a list, 
    // which we then structure the same way as the IMDb search page

    return (
        <div className='container'>
            <div className='text-zone'>
                <h1>
                   MOVIES
                </h1>

                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search movies ..."
                        searchQuery={search} // Use search state for input value
                        onChange={(e) => setSearch(e.target.value)} // Update search state
                    />
                </div>

                <p>
                    iloveyoujo     
                </p>

                {/* <ul className="list">
                    {value
                        ? movies
                            .filter((movie) => contact.groups.includes(value?.label))
                            .map((movie) => (
                                <li key={movie._id}>
                                    <p>{movie.name}</p>
                                    <Button className="button" onClick={() => handleContactClick(movie._id)}>
                                        View
                                    </Button>
                                </li>
                            ))
                        : movies.map((movie) => (
                            <li key={movie._id}>
                                <p>{movie.name}</p>
                                <Button className="button" onClick={() => handleContactClick(movie._id)}>
                                    View
                                </Button>
                            </li>
                        ))}
                </ul> */}
            </div>


        </div>
    );
}   

export default Movies;