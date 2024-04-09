import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import ReactSlider from 'react-slider'
import MediaList from '../../../MediaList';
import MediaFilters from '../../../MediaFilters';
import axios from 'axios';
import './index.scss'

const Books = ({ user }) => {
    const grades = ['F', 'D-', 'D', 'D+', 'C-', 'C', 'C+', 'B-', 'B', 'B+', 'A-', 'A', 'A+', 'S-', 'S', 'S+'];
    const sortOptions = [
        { label: 'Grade: High to Low', value: 'grade_desc' },
        { label: 'Grade: Low to High', value: 'grade_asc' },
        { label: 'Score: High to Low', value: 'score_desc' },
        { label: 'Score: Low to High', value: 'score_asc' },
        { label: 'Watch Date', value: 'watch_date' }
    ];

    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState(''); 
    const [gradeRange, setGradeRange] = useState([0, grades.length - 1]);
    const [scoreRange, setScoreRange] = useState([0, 10]);
    const [sortBy, setSortBy] = useState('');
    const [booksFetched, setBooksFetched] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
       fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/media/${user._id}/book`);
            setBooks(response.data);
            setBooksFetched(true);
        } catch (error) {
            console.error('Error fetching user books:', error);
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

    const filteredBooks = books.filter((book) =>
        book.name.toLowerCase().includes(search.toLowerCase())
        && (gradeRange[0] <= grades.indexOf(book.grade) && grades.indexOf(book.grade) <= gradeRange[1])
        && (scoreRange[0] <= book.score && book.score <= scoreRange[1])
    );

    const sortBooks = (books) => {
        switch (sortBy) {
            case 'score_asc':
                return books.slice().sort((a, b) => a.score - b.score);
            case 'score_desc':
                return books.slice().sort((a, b) => b.score - a.score);
            case 'grade_asc':
                return books.slice().sort((a, b) => grades.indexOf(a.grade) - grades.indexOf(b.grade));
            case 'grade_desc':
                return books.slice().sort((a, b) => grades.indexOf(b.grade) - grades.indexOf(a.grade));
            case 'watch_date':
                return books.slice().sort((a, b) => new Date(a.watchDate) - new Date(b.watchDate));
            default:
                return books;
        }
    };

    const sortedBooks = sortBooks(filteredBooks);
    
    return (
        <div className='container'>
            <div className='media-zone'>
                <span className="media-search-bar">
                    <h1>
                        BOOKS
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

                <MediaList mediaItems={sortedBooks} mediaType="books" />
            </div>
        </div>
    );
}   

export default Books;