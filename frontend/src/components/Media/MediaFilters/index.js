// MediaList.js
import React from 'react';
import { Link } from 'react-router-dom';
import ReactSlider from 'react-slider'
import './index.scss'

const MediaFilters = ({ grades, sortBy, handleSortChange, sortOptions, gradeRange, setGradeRange, clearGradeRange, scoreRange, setScoreRange, clearScoreRange }) => {
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