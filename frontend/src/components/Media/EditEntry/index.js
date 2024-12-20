import { Link, useNavigate , useLocation  } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import AnimateLetters from '../../AnimatedLetters';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileImage, faFileImport, faUpload } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'; 
import './index.scss'

const EditEntry = ({user, media}) => {

    const navigate = useNavigate();
    const location = useLocation();
    // console.log("Props received by EditEntry:", { navigate, location });
    const [formData, setFormData] = useState({
        name: '',
        watchDate: '',
        notes: '',
        score: '',
        grade: '',
        type: '',
        coverImage: '',
        userID: ''
    });

    const grades = ['F', 'D-', 'D', 'D+', 'C-', 'C', 'C+', 'B-', 'B', 'B+', 'A-', 'A', 'A+', 'S-', 'S', 'S+'];
    const mediaTypes = ['Movie', 'Show', 'Book', 'Music'];
    const minColor = [250, 60, 60]; 
    const maxColor = [70, 100, 255]; 


    useEffect(() => {
        console.log("Location object:", location);
        console.log("User object: ", user);
        console.log("formData userID: ", formData.userID);

        // set the media item from IMDb
        if (location?.state?.media) {
            const { media } = location.state;
            setFormData({
                name: media ? media.title : '',
                type: media.type, 
                coverImage: media ? media.imageUrl : ''
            });
        }     
    }, [location?.state]);

    
    // set the data from editting entry
    useEffect(() => {
        // Fill in the form fields with media information
        if (media) {
            const watchDate = media.watchDate ? new Date(media.watchDate).toISOString().split('T')[0] : '';

            setFormData({
                name: media.name || '',
                watchDate: watchDate || '',
                notes: media.notes || '',
                score: media.score || '',
                grade: media.grade,
                type: media.type || '',
                coverImage: media.coverImage || '',
                userID: media.userID || ''
            });
        }
    }, [media]);

    // Function to handle the edit form submission if media exists
    const handleEditSubmit = async (token) => {
        try {
            const response = await axios.patch(`${process.env.REACT_APP_API_URL}/media/${media._id}`, formData, {
                headers: { Authorization: `Bearer ${token}` },
                timeout: 10000, // Set a longer timeout (in milliseconds)
            });
            if (response.status === 200) {
                console.log("Successful edit");
            }
        } catch (err) {
            console.error('Error submitting edit:', err);
        }
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        // console.log('updated', name, "to:", value );
        // console.log("User object: ", user);
        // console.log("formData userID: ", formData.userID);
        
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0]; // Get the first selected file
        setFormData({ ...formData, coverImage: file }); // Update the formData state with the selected image file
    };

    const handleSubmit = async (e) => {
        console.log("User object: ", user);
        console.log("formData userID: ", formData.userID);
        e.preventDefault();
        try {

            // Reformat entries
            const gradeLetter = grades[formData.grade];
            const watchDate = new Date(formData.watchDate);
            const score = parseFloat(formData.score);
            const userID = user._id;

            // Create a new object with the reformatted data
            const requestData = {
                ...formData,
                grade: gradeLetter,
                watchDate,
                score,
                userID
            };

            // Get the JWT token from local storage
            const token = localStorage.getItem('token');

            if (media) {
                // Send a patch request if media exists
                await handleEditSubmit(token);
            } else {
                // Send a post request if it's a new entry
                await axios.post('${process.env.REACT_APP_API_URL}/media/new', requestData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }
            
            // redirect to the media type's page
            let mediaTypePlural;
            formData.type === 'Music' ? mediaTypePlural = formData.type.toLowerCase() : mediaTypePlural = formData.type.toLowerCase() + 's';
            navigate(`/${mediaTypePlural}`);

        } catch (error) {
            console.error('Error submitting new entry:', error);
        }
    };


    const getValueColor = (value, max, min_color, max_color) => {
        // Calculate the percentage of the value relative to the max
        const percentage = value / max;
    
        // Extract RGB components of min_color and max_color
        const [minRed, minGreen, minBlue] = min_color;
        const [maxRed, maxGreen, maxBlue] = max_color;
    
        // Interpolate between min_color and max_color based on the percentage
        const red = Math.round(minRed + (maxRed - minRed) * percentage);
        const green = Math.round(minGreen + (maxGreen - minGreen) * percentage);
        const blue = Math.round(minBlue + (maxBlue - minBlue) * percentage);
    
        // Convert RGB values to hexadecimal format
        const color = `#${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}${blue.toString(16).padStart(2, '0')}`;
    
        return color;
    };
    
    



    return (
        <div className="container">
            <form className="entry-form" onSubmit={handleSubmit}>
                <div className='visuals-container'>
                    <div className='img-container'>
                        
                        {/* <input type="file" onChange={handleImageChange} accept="image/*" /> */}
                        <div className="image-upload-container">
                            <input 
                                type="file" 
                                id="fileInput" 
                                onChange={handleImageChange} 
                                accept="image/*" 
                                style={{ display: 'none' }} 
                            />
                            <label htmlFor="fileInput" className="upload-icon">
                                <FontAwesomeIcon icon={faFileImport} />
                            </label>
                        </div>
                        {formData.coverImage ? (
                            formData.coverImage instanceof File ? (
                                <img src={URL.createObjectURL(formData.coverImage)} alt="Uploaded Image" />
                            ) : (
                                <img src={formData.coverImage} alt="Uploaded Image" />
                            )
                        ) : (
                            <img src="https://m.media-amazon.com/images/M/MV5BYzZjMTk5NjctMDg1Yy00N2I1LTk1NTUtODcwOWRlOWVkNjlmXkEyXkFqcGdeQXVyMTk2ODc0MjY@._V1_.jpg" alt="Select an Image" />
                        )}
                    </div>
                   
                </div>
         
                <div className='input-container'>

                    
                    <div className='input-header'>
                        <div className='title'>
                            <input type="text" name="name" placeholder='NEW ENTRY✎' value={formData.name} onChange={handleChange}  />
                        </div>     
                        <div className='rating-info'>
                            <span className='grade' style={{ color: formData.grade?getValueColor(formData.grade, 15, minColor, maxColor): "#a54f98" }}>
                                {formData.grade?grades[formData.grade]:"C+"}
                            </span>
                            
                            <span className='score' style={{ color: formData.score?getValueColor(formData.score, 10, minColor, maxColor): "#a54f98" }}>
                                {formData.score?formData.score:"5"}
                            </span>
                            
                                <button type="submit">ADD ENTRY</button>
                            
                        </div>
                    </div>



                    <div className='input-entries'>
                        <div className='label-input'>
                            <label>Type:</label>
                            <select name="type" value={formData.type} onChange={handleChange}>
                                <option value="">Select Type</option>
                                {mediaTypes.map((type, index) => (
                                    <option key={index} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>
                        <div className='label-input'>
                            <label>Watched:</label>
                            <input type="date" name="watchDate" value={formData.watchDate} onChange={handleChange} />
                        </div>
                        <div className='label-input'>
                            <label>Grade:</label>
                            <input 
                                type="range" 
                                name="grade" 
                                value={formData.grade} 
                                min="0" 
                                max={grades.length - 1}  
                                step="1" 
                                onChange={handleChange} 
                            />
                        </div>
                        <div className='label-input'>
                            <label>score:</label>
                            <input 
                                type="range" 
                                name="score" 
                                value={formData.score} 
                                min="0" 
                                max="10" 
                                step="0.1" 
                                onChange={handleChange} 
                            />
                        </div>
                        
                        <div className='label-textarea'>
                            <label>Notes:</label>
                            <textarea name="notes" value={formData.notes} onChange={handleChange} />
                        </div>
                    </div>

                </div>

            </form>
        </div>
    );
};

export default EditEntry; 

