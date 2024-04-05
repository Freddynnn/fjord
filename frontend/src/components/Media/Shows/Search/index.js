import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import ReactSlider from 'react-slider'
import axios from 'axios';
import './index.scss'

const Shows = ({ user }) => {
    const grades = ['F', 'D-', 'D', 'D+', 'C-', 'C', 'C+', 'B-', 'B', 'B+', 'A-', 'A', 'A+', 'S-', 'S', 'S+'];
    const sortOptions = [
        { label: 'Grade: High to Low', value: 'grade_desc' },
        { label: 'Grade: Low to High', value: 'grade_asc' },
        { label: 'Score: High to Low', value: 'score_desc' },
        { label: 'Score: Low to High', value: 'score_asc' },
        { label: 'Watch Date', value: 'watch_date' }
    ];


    const [shows, setShows] = useState([]);
    const [search, setSearch] = useState(''); 
    const [gradeRange, setGradeRange] = useState([0, grades.length - 1]);
    const [scoreRange, setScoreRange] = useState([0, 10]);
    const [sortBy, setSortBy] = useState('');
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

    const clearGradeRange = () => {
        setGradeRange([0,grades.length-1]);
    };

    const clearScoreRange = () => {
        setScoreRange([0,10]);
    };

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };

    // const handleShowClick = (id) => {
    //     navigate('/shows/show/' + id);
    // }

    const filteredShows = shows.filter((show) =>
        show.name.toLowerCase().includes(search.toLowerCase())
        && (gradeRange[0] <= grades.indexOf(show.grade) && grades.indexOf(show.grade) <= gradeRange[1])
        && (scoreRange[0] <= show.score && show.score <= scoreRange[1])
    );

    const sortShows = (shows) => {
        switch (sortBy) {
            case 'score_asc':
                return shows.slice().sort((a, b) => a.score - b.score);
            case 'score_desc':
                return shows.slice().sort((a, b) => b.score - a.score);
            case 'grade_asc':
                return shows.slice().sort((a, b) => grades.indexOf(a.grade) - grades.indexOf(b.grade));
            case 'grade_desc':
                return shows.slice().sort((a, b) => grades.indexOf(b.grade) - grades.indexOf(a.grade));
            case 'watch_date':
                return shows.slice().sort((a, b) => new Date(a.watchDate) - new Date(b.watchDate));
            default:
                return shows;
        }
    };

    const sortedShows = sortShows(filteredShows);

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


                <div className="filters">
                    <span className='filter'>
                        <label>GRADE:</label>
                        <ReactSlider
                            className="horizontal-slider"
                            thumbClassName="slider-thumb"
                            trackClassName="slider-track"
                            defaultValue={[0, 15]}
                            max={15}
                            min={0}
                            step={1}
                            ariaLabel={['Lower thumb', 'Upper thumb']}
                            ariaValuetext={state => `Thumb value ${state.valueNow}`}
                            renderThumb={(props, state) => <div {...props}>{grades[state.valueNow]}</div>}
                            pearling
                            minDistance={0.1}
                        />
                        <button onClick={clearGradeRange}>Clear</button>

                    </span>
                    <span className='filter'>
                        <label>RATING:</label>
                        <ReactSlider
                            className="horizontal-slider"
                            thumbClassName="slider-thumb"
                            trackClassName="slider-track"
                            defaultValue={[0, 10]}
                            max={10}
                            min={0}
                            step={0.1}
                            ariaLabel={['Lower thumb', 'Upper thumb']}
                            ariaValuetext={state => `Thumb value ${state.valueNow}`}
                            renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                            pearling
                            minDistance={0.1}

                            // need the setScoreFilter to actually affect them
                        />
                        <button onClick={clearScoreRange}>Clear</button>

                    </span>
                
                        {/* <span className="filter">
                            <label>GRADE:</label>
                            <span>{gradeFilter}</span>
                            <input
                                type="range"
                                min="0"
                                max={grades.length - 1}
                                value={gradeFilter !== '' ? grades.indexOf(gradeFilter) : ''}
                                onChange={(e) => setGradeFilter(grades[e.target.value])}
                            />
                            <button onClick={clearGradeFilter}>Clear</button>
                        </span>
                        <span className="filter">
                            <label>SCORE:</label>
                            <span>{scoreFilter}</span>
                            <input
                                type="range"
                                min="0"
                                max="10"
                                step="0.1"
                                value={scoreFilter}
                                onChange={(e) => setScoreFilter(e.target.value)}
                            />
                            <button onClick={clearScoreFilter}>Clear</button>
                        </span> */}

                    <span className="filter">
                        <label>Sort By:</label>
                        <select value={sortBy} onChange={handleSortChange}>
                            <option value="">Select an option</option>
                            {sortOptions.map(option => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                    </span>
                </div>

                <div className='show-results'>
                    <ul className='show-list'>         
                        {sortedShows.map((show) => (

                            // list of all shows
                            <li key={show._id}>
                                <Link to={`/shows/show/${show._id}`} className="link-style">
                                    <img src={show.coverImage} alt={show.name} />
                                    <div className="info">
                                        <div className="grade-score">
                                            {show.grade} {show.score}
                                        </div>
                                        <div className="title">
                                            {show.name}
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}   

export default Shows;
