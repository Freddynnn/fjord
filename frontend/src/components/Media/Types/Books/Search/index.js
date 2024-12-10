import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import MediaList from '../../../MediaList';
import MediaFilters from '../../../MediaFilters';
import axios from 'axios';
import './index.scss'

const Books = ({ user }) => {
    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState(''); 
    const [booksFetched, setBooksFetched] = useState(false);
    const [filteredBooks, setFilteredBooks] = useState(books);
    const navigate = useNavigate();

    useEffect(() => {
       fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/media/${user._id}/book`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            setBooks(response.data);
            setBooksFetched(true);
        } catch (error) {
            console.error('Error fetching user books:', error);
        }
    };

    useEffect(() => {
        if (booksFetched) {
            setFilteredBooks(books);
        }
    }, [booksFetched]);
    
    return (
        <div className='container'>
            <div className='media-zone'>
                <span className="media-search-bar">
                    <h1>
                        BOOKS
                    </h1>
                    <input
                        type="text"
                        placeholder="Search books ..."
                        value={search} 
                        onChange={(e) => setSearch(e.target.value)} 
                    />
                </span> 

                <MediaFilters 
                    initialMedia={books}
                    search={search}
                    onFilter={setFilteredBooks}
                />

                <MediaList mediaItems={filteredBooks} mediaType="books" />
            </div>
        </div>
    );
}   

export default Books;