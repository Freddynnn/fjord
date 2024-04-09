import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import ReactSlider from 'react-slider'
import MediaList from '../../MediaList';
import MediaFilters from '../../MediaFilters';
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
            <div className='media-zone'>
                <span className="media-search-bar">
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

                <MediaFilters 
                    grades={grades}
                    sortBy={sortBy}
                    handleSortChange={handleSortChange}
                    sortOptions={sortOptions}
                    gradeRange={gradeRange} 
                    setGradeRange={setGradeRange} 
                    clearGradeRange={clearGradeRange}
                    scoreRange={scoreRange}
                    setScoreRange={setScoreRange}
                    clearScoreRange={clearScoreRange}
                />
                <MediaList mediaItems={sortedShows} mediaType="shows" />
            </div>
        </div>
    );
}   

export default Shows;