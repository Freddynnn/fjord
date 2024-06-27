import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import MediaList from '../../../MediaList';
import MediaFilters from '../../../MediaFilters';
import axios from 'axios';
import './index.scss'

const Music = ({ user }) => {
    const [music, setMusic] = useState([]);
    const [search, setSearch] = useState(''); 
    const [musicFetched, setMusicFetched] = useState(false);
    const [filteredMusic, setFilteredMusic] = useState(music);
    const navigate = useNavigate();

    useEffect(() => {
       fetchMusic();
    }, []);

    const fetchMusic = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:3001/media/${user._id}/music`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            setMusic(response.data);
            setMusicFetched(true);
        } catch (error) {
            console.error('Error fetching user Music:', error);
        }
    };

    useEffect(() => {
        if (musicFetched) {
            setFilteredMusic(music);
        }
    }, [musicFetched]);
    
    return (
        <div className='container'>
            <div className='media-zone'>
                <span className="media-search-bar">
                    <h1>
                        MUSIC
                    </h1>
                    <input
                        type="text"
                        placeholder="Search music ..."
                        value={search} 
                        onChange={(e) => setSearch(e.target.value)} 
                    />
                </span> 

                <MediaFilters 
                    initialMedia={music}
                    search={search}
                    onFilter={setFilteredMusic}
                />

                <MediaList mediaItems={filteredMusic} mediaType="music" />
            </div>
        </div>
    );
}   

export default Music;