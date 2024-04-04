import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; 
import { Link } from 'react-router-dom';
import EditEntry from '../../EditEntry/index'
import axios from 'axios';

const SingleShow = ({ user }) => {
    const [show, setShow] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        fetchShow();
    }, []);

    const fetchShow = async () => {
        try {
            const response = await axios.get('http://localhost:3001/media/'+ id);
            setShow(response.data);
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
                const response = await axios.delete('http://localhost:3001/media/'+ id);
                setShow(null);
            } catch (err) {
                console.error(err);
            }
            navigate('/shows');
        }
    }

    

    return (
        <EditEntry
            user={user}    
            media={show}        
        />

        // this add entry button has to patch the entry using handleEditSubmit()
        
    );
      
}

export default SingleShow;
