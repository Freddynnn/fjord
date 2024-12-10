import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; 
import { Link } from 'react-router-dom';
import EditEntry from '../../../EditEntry/index'
import axios from 'axios';

const Release = ({ user }) => {
    const [release, setRelease] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        fetchRelease();
    }, []);

    const fetchRelease = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('${process.env.REACT_APP_API_URL}/media/'+ id, {
                headers: {Authorization: `Bearer ${token}`}
            });
            setRelease(response.data);
        } catch (err) {
            console.error(err);
        }
    }

    // const handleEditClick = () => {
    //     setIsEditMode(true);
      
    //     // Map the show properties to the expected form fields
    //     setEditedShow({
    //         name: show.name || '',
    //         watchDate: show.watchDate || '', // Adjust as needed
    //         notes: show.notes || '',
    //         score: show.score || '',
    //         grade: show.grade || '',
    //         type: show.type || '',
    //         coverImage: show.coverImage || '',
    //         userID: show.userID || '', // Adjust as needed
    //     });
    // };
     

    const handleDeleteClick = async () => {
        if (window.confirm('Are you sure you want to delete your account? This action is irreversible.')) {
            try {
                const response = await axios.delete('${process.env.REACT_APP_API_URL}/media/'+ id);
                setRelease(null);
            } catch (err) {
                console.error(err);
            }
            navigate('/music');
        }
    }

    

    return (
        <EditEntry
            user={user}    
            media={release}        
        />

        // this add entry button has to patch the entry using handleEditSubmit()
        
    );
      
}

export default Release;
