import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.scss'

// const Movies = () => {
const Movies = ({ user }) => {
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState(''); 
    const [moviesFetched, setMoviesFetched] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
       fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/media/${user._id}/movie`);
            setMovies(response.data);
            setMoviesFetched(true);
        } catch (error) {
            console.error('Error fetching user movies:', error);
        }
    };

    const handleMovieClick = (id) => {
        navigate('/movies/movie/' + id);
    }

    // NEED TO FILTER ONLY MOVIES NOT ALL MEDIA


    // need to return the movies and map them into a list, 
    // which we then structure the same way as the IMDb search page

    const filteredMovies = movies.filter((movie) =>
        movie.name.toLowerCase().includes(search.toLowerCase()) 
        // && movie.type.toLowerCase() == 'movie'
    );

    

    return (
        <div className='container'>
            <div className='text-zone'>
                <h1>
                   MOVIES
                </h1>

                <div className="search-bar" >
                    <input
                        type="text"
                        placeholder="Search movies ..."
                        searchQuery={search} // Use search state for input value
                        onChange={(e) => setSearch(e.target.value)} // Update search state
                    />
                </div>
                {/* no search button,   just filtering the movies by name (default sorted by grade rankings) */}
                


                <p>
                    iloveyou jo   
                      
                </p>

                <div className='search-results'>
                       <ul className='movie-list'>         
                            {filteredMovies.map((movie) => {
                                <li key={movie._id}>
                                    <p>{movie.name}</p>
                                    <button className="button" onClick={() => handleMovieClick(movie._id)}>
                                        View
                                    </button>
                                </li>

                                // need all other values: watchdate, score, rating, image etc.
                                
                                // const imageUrl = item.i ? item.i.imageUrl : "https://m.media-amazon.com/images/M/MV5BYzZjMTk5NjctMDg1Yy00N2I1LTk1NTUtODcwOWRlOWVkNjlmXkEyXkFqcGdeQXVyMTk2ODc0MjY@._V1_.jpg";
                                // const title = item.l;
                                // const type = item.q;

                            })}
                        </ul>
                    </div>
                

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