import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactSlider from 'react-slider'
import './index.scss'

const MediaFilters = ({initialMedia, search, onFilter }) => {
    const grades = ['F', 'D-', 'D', 'D+', 'C-', 'C', 'C+', 'B-', 'B', 'B+', 'A-', 'A', 'A+', 'S-', 'S', 'S+'];
    const sortOptions = [
        { label: 'Grade: High to Low', value: 'grade_desc' },
        { label: 'Grade: Low to High', value: 'grade_asc' },
        { label: 'Score: High to Low', value: 'score_desc' },
        { label: 'Score: Low to High', value: 'score_asc' },
        { label: 'Watch Date', value: 'watch_date' }
    ];
    const [gradeRange, setGradeRange] = useState([0, grades.length - 1]);
    const [scoreRange, setScoreRange] = useState([0, 10]);
    const [sortBy, setSortBy] = useState('');

    const clearGradeRange = () => {setGradeRange([0,grades.length-1]);};
    const clearScoreRange = () => { setScoreRange([0,10]);};
    const handleSortChange = (e) => {setSortBy(e.target.value);};

    useEffect(() => {
        filterMedia();
    }, []);

    useEffect(() => {
        filterMedia();
    }, [search, gradeRange, scoreRange, sortBy]);

    const sortMedia = (media) => {
        switch (sortBy) {
            case 'score_asc':
                return media.slice().sort((a, b) => a.score - b.score);
            case 'score_desc':
                return media.slice().sort((a, b) => b.score - a.score);
            case 'grade_asc':
                return media.slice().sort((a, b) => grades.indexOf(a.grade) - grades.indexOf(b.grade));
            case 'grade_desc':
                return media.slice().sort((a, b) => grades.indexOf(b.grade) - grades.indexOf(a.grade));
            case 'watch_date':
                return media.slice().sort((a, b) => new Date(a.watchDate) - new Date(b.watchDate));
            default:
                return media;
        }
    };

    const filterMedia = () => {
        const filteredMedia = initialMedia.filter((release) =>
            release.name.toLowerCase().includes(search.toLowerCase())
            && (gradeRange[0] <= grades.indexOf(release.grade) && grades.indexOf(release.grade) <= gradeRange[1])
            && (scoreRange[0] <= release.score && release.score <= scoreRange[1])
        );
        const sortedMedia = sortMedia(filteredMedia);
        onFilter(sortedMedia);
    };

    

    return (
        <div className="filters">
            <span className='filter'>
                <label>GRADE:</label>
                <ReactSlider
                    className="horizontal-slider"
                    thumbClassName="slider-thumb"
                    trackClassName="slider-track"
                    defaultValue={[0, 15]}
                    value={gradeRange}
                    max={15}
                    min={0}
                    step={1}
                    ariaLabel={['Lower thumb', 'Upper thumb']}
                    ariaValuetext={state => `Thumb value ${state.valueNow}`}
                    renderThumb={(props, state) => <div {...props}>{grades[state.valueNow]}</div>}
                    pearling
                    minDistance={0.1}
                    onChange={(value) => setGradeRange(value)}
                />
                <button onClick={clearGradeRange}>Clear</button>

            </span>
            <span className='filter'>
                <label>RATING:</label>
                <ReactSlider
                    className="horizontal-slider"
                    thumbClassName="slider-thumb"
                    trackClassName="slider-track"
                    thumbvalue={10}
                    defaultValue={[0, 10]}
                    value={scoreRange}
                    max={10}
                    min={0}
                    step={0.1}
                    ariaLabel={['Lower thumb', 'Upper thumb']}
                    ariaValuetext={state => `Thumb value ${state.valueNow}`}
                    renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                    pearling
                    minDistance={0.1}
                    onChange={(value) => setScoreRange(value)}
                />
                <button onClick={clearScoreRange}>Clear</button>
            </span>

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
    );
};

export default MediaFilters;