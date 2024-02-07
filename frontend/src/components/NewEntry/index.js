import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import AnimateLetters from '../AnimatedLetters';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'; 
import './index.scss'

const NewEntry = () => {
    
    return (
        <div className='container about-page'>
            <div className='text-zone'>
                <h1>
                   COMING SOON !!!
                </h1>
                <p>
                    We're workin on it  =P     
                </p>

            </div>            
        </div>
    );
}   

export default NewEntry;