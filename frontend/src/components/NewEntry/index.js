import { Link, withRouter  } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import AnimateLetters from '../AnimatedLetters';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'; 
import './index.scss'

const NewEntry = ({ history }) => {
    const [formData, setFormData] = useState({
        name: '',
        watchDate: '',
        notes: '',
        score: '',
        grade: '',
        genre: '',
        type: '',
        coverImage: ''
    });

    const grades = ['F-', 'F', 'F+', 'D-', 'D', 'D+', 'C-', 'C', 'C+', 'B-', 'B', 'B+', 'A-', 'A', 'A+', 'S-', 'S', 'S+'];
    const mediaTypes = ['Movie', 'Show', 'Book', 'Music'];
    const minColor = [250, 60, 60]; 
    const maxColor = [70, 100, 255]; 

    // const history = useHistory();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0]; // Get the first selected file
        setFormData({ ...formData, image: file }); // Update the formData state with the selected image file
    };

    const handleSubmit = async (e) => {
        // ## NEED TO SET THE grade TO BE THE LETTER, NOT THE NUMBER
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/media/new', formData);
            history.push('/'); // Redirect to home page after successful submission
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
            <form onSubmit={handleSubmit}>
                <div className='title'>
                    <input type="text" name="name" placeholder='NEW ENTRY ✎' value={formData.name} onChange={handleChange}  />
                </div>      

                              
                <div className='input-fields'>
                    <div className='label-input'>
                        <label>Name:</label>
                        <input type="text" name="name" placeholder='Adventure time' value={formData.name} onChange={handleChange} />
                    </div>
                    <div className='label-input'>
                        <label>Watched:</label>
                        <input type="date" name="watchDate" value={formData.watchDate} onChange={handleChange} />
                    </div>
                    <div className='label-input'>
                        <label>Type:</label>
                        <select name="type" value={formData.type} onChange={handleChange}>
                            {/* <option value="">Movie</option> */}
                            {mediaTypes.map((type, index) => (
                                <option key={index} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>
                    <div className='label-input'>
                        <label>Genre:</label>
                        <input type="text" name="genre" placeholder='silly' value={formData.genre} onChange={handleChange} />
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

                <div className='visuals-container'>
                <div className='img-container'>
                    <input type="file" onChange={handleImageChange} accept="image/*" />
                    {formData.image ? (
                        <img src={URL.createObjectURL(formData.image)} alt="Uploaded Image" />
                    ) : (
                        <img src="https://m.media-amazon.com/images/M/MV5BYzZjMTk5NjctMDg1Yy00N2I1LTk1NTUtODcwOWRlOWVkNjlmXkEyXkFqcGdeQXVyMTk2ODc0MjY@._V1_.jpg" alt="Default Image" />
                    )}
                </div>


                    

                    <div className='visuals-info'>
                        <span className='grade' style={{ color: formData.grade?getValueColor(formData.grade, 17, minColor, maxColor): "#a54f98" }}>
                            {formData.grade?grades[formData.grade]:"C+"}
                        </span>
                        
                        <span className='score' style={{ color: formData.score?getValueColor(formData.score, 10, minColor, maxColor): "#a54f98" }}>
                            {formData.score?formData.score:"5"}
                        </span>
                        
                        <div>
                            <button type="submit">ADD ENTRY</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default NewEntry;

