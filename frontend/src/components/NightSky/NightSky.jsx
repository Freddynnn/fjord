// NightSky.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './NightSky.css';
import { useNavigate } from 'react-router-dom';
import { createStar, createShootingStar, createConstellation } from '../../utils/constellationUtils';

const NightSky = ({ user }) => {
    const navigate = useNavigate();
    const [constellations, setConstellations] = useState([]);
    const [constellationsFetched, setConstellationsFetched] = useState(false);

    useEffect(() => {
        const constellationsContainer = document.getElementById('constellationsContainer');

        const fetchConstellations = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/constellations/${user._id}`);
                setConstellations(response.data);
                setConstellationsFetched(true);
            } catch (error) {
                console.error('Error fetching user constellations:', error);
            }
        };


        // function to initialize all the stars and add them to the container
        const initializeStars = () => {
            for (let i = 0; i < 200; i++) {
                createStar(constellationsContainer);
            }
        }

        // initializing the constellations we fetched from the db
        const initializeConstellations = () => {
            const spawnRadius = 250; 
            const createdConstellations = [];
        
            const isOverlapping = (pos1, pos2) => {
                const distance = Math.sqrt(
                    Math.pow(pos2.left - pos1.left, 2) + Math.pow(pos2.top - pos1.top, 2)
                );
                return distance < spawnRadius;
            };
        
            const createRandomPosition = () => ({
                top: `${(Math.random() * ((906) / 2)) + 906 / 4 - 150}px`,
                left: `${(Math.random() * ((1707) / 2)) + 1707 / 4 - 180}px`,
            });
        
            const createUniquePosition = () => {
                let newPosition;
                do {
                    newPosition = createRandomPosition();
                    console.log('Generated position:', newPosition);
                } while (createdConstellations.some((existing) => isOverlapping(existing, newPosition)));
        
                console.log('All positions:', createdConstellations); // Add this log
        
                return newPosition;
            };
        
            constellations.forEach((constellationData) => {
                const width = '150px';
                const height = '180px';
        
                const newPosition = createUniquePosition();
                console.log('Adding constellation at:', newPosition);
        
                createdConstellations.push(newPosition);
        
                createConstellation(constellationsContainer, constellationData, navigate, width, height, newPosition.top, newPosition.left, true);
            });
        };
        
        
        


        // actually calling the functions above on conmponent mount
        if (!constellationsFetched) {
            fetchConstellations();
        } else {
            initializeConstellations();
            setTimeout(() => createShootingStar(constellationsContainer), Math.random() * 15000);
            initializeStars();
        }
    }, [constellationsFetched, navigate]);

    return <div id="constellationsContainer" className="constellations-container"></div>;
};

export default NightSky;
