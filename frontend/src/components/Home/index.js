import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './index.scss';
import AnimateLetters from '../AnimatedLetters';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'; // Import axios

const Home = () => {
    const [letterClass, setLetterClass] = useState('text-animate');
    const [line1Array, setLine1Array] = useState([]);
    
    const convertStringToArray = (str) => {
        return str.split('');
    };

    useEffect(() => {
        const line1 = 'Welcome to FJORD' ;
        setLine1Array(convertStringToArray(line1));
    }, []);

    return (
        <div className='container home-page'>
            <div className='text-zone'>
                <h1>
                    <AnimateLetters
                        letterClass={letterClass}
                        strArray={line1Array}
                        idx={12}
                    />
                    <br/>
                </h1>
                <h2>
                    Your one stop shop for media consumption tracking !!
                </h2>
                <h2>
                    As always, dedicated to my love Jo 
                </h2>
                <br/>
                <ul>
                    <li className='half'>
                        <Link to="/new-entry" className='flat-button add' data-after-text="ADD ENTRY MANUALLY">
                            <FontAwesomeIcon icon={faPlus} />
                        </Link>
                    </li>
                    <li className='half'>
                        <Link to="/search" className='flat-button find' data-after-text="SEARCH FOR MEDIA">
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Home;
