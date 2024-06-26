const mongoose = require('mongoose');
const Media = require('../models/media');
const axios = require('axios');

// Async function to search media entries using IMDb API
const searchVisMedia = async (req, res) => {
    const { query } = req.query; 

    if (!query) {
        return res.status(400).json({ error: 'Search query is required' });
    }
    const options = {
        method: 'GET',
        url: 'https://imdb8.p.rapidapi.com/auto-complete',
        params: { q: query }, // Set the query parameter here
        headers: {
            'X-RapidAPI-Key': 'e97702b45cmsh23d2eed61a0e25ap12d651jsnf39835a734ed',
            'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
        }
    };
    try {
        const response = await axios.request(options);
        const data = response.data;
        // Check if the response contains data
        if (data) {
            return res.status(200).json(data);
        } else {
            return res.status(404).json({ error: 'No data found' });
        }
    } catch (error) {
        console.error('Error searching for media:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const searchMusic = async (req, res) => {
    const { query } = req.query; 

    if (!query) {
        return res.status(400).json({ error: 'Search query is required' });
    }

    const options = {
        method: 'GET',
        url: 'https://spotify23.p.rapidapi.com/search/',
        params: { q: query }, // Set the query parameter here
        headers: {
            'X-RapidAPI-Key': 'e97702b45cmsh23d2eed61a0e25ap12d651jsnf39835a734ed',
            'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        const data = response.data;
        // Check if the response contains data
        if (data) {
            return res.status(200).json(data);
        } else {
            return res.status(404).json({ error: 'No data found' });
        }
    } catch (error) {
        console.error('Error searching for media:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const searchBooks = async (req, res) => {
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ error: 'Search query is required' });
    } else {
        // parse the query to have '+' between any spaces
        const parsedQuery = query.trim().replace(/\s+/g, '+');

        const options = {
            method: 'GET',
            url: `https://hapi-books.p.rapidapi.com/search/${parsedQuery},`,
            headers: {
              'x-rapidapi-key': 'e97702b45cmsh23d2eed61a0e25ap12d651jsnf39835a734ed',
              'x-rapidapi-host': 'hapi-books.p.rapidapi.com'
            }
          };
          
          try {
            const response = await axios.request(options);
            const data = response.data;
            
            // Check if the response contains data
            if (data && data.length > 0) { 
                return res.status(200).json(data);
            } else {
                return res.status(404).json({ error: 'No data found' });
            }
        } catch (error) {
            console.error('Error searching for media:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // const options = {
    //     method: 'GET',
    //     url: 'https://goodreads12.p.rapidapi.com/searchBooks',
    //     params: {keyword: query},
    //     headers: {
    //         'x-rapidapi-key': 'e97702b45cmsh23d2eed61a0e25ap12d651jsnf39835a734ed',
    //         'x-rapidapi-host': 'goodreads12.p.rapidapi.com'
    //       }
    // };

    // try {
    //     const response = await axios.request(options);
    //     const data = response.data;
    //     // Check if the response contains data
    //     if (data) {
    //         return res.status(200).json(data);
    //     } else {
    //         return res.status(404).json({ error: 'No data found' });
    //     }
    // } catch (error) {
    //     console.error('Error searching for media:', error);
    //     return res.status(500).json({ error: 'Internal Server Error' });
    // }
};


// Function to list all media entries for a specific user
const getMediaByType = async (req, res) => {
    const userID = req.params.userID;
    const type = req.params.type;

    try {
        // Perform a case-insensitive search using a regular expression
        const userMedia = await Media.find({ 
            userID,
            type: { $regex: new RegExp(type, 'i') } 
        });

        if (!userMedia || userMedia.length === 0) {
            return res.status(404).json({ error: `No media found for userID: ${userID} and type: ${type}` });
        }

        return res.status(200).json(userMedia);
    } catch (error) {
        console.error('Error fetching media:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};



// Function to get a specific media entry by its ID
const getMediaByID = async (req, res) => {
    const { ID } = req.params;

    if (!mongoose.Types.ObjectId.isValid(ID)) {
        return res.status(404).json({ error: 'Invalid media ID' });
    }

    try {
        const media = await Media.findById(ID);
        if (!media) {
            return res.status(404).json({ error: 'Media not found' });
        }
        return res.status(200).json(media);
    } catch (error) {
        console.error('Error fetching media:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Function to add a new media entry to the database
const createMedia = async (req, res) => {
    const { name, watchDate, notes, score, grade, type, coverImage, userID } = req.body;
    const newMedia = new Media({ name, watchDate, notes, score, grade, type, coverImage, userID });

    
    try { 
        await newMedia.save();
        res.status(201).json({ message: 'Media created successfully', media: newMedia });
    } catch (error) {
        console.error('Error creating media:', error);
        res.status(500).json({ error: 'Error 500 creating media' });
    }
};

// Function to delete a specific media entry by its ID
const deleteMediaByID = async (req, res) => {
    const { ID } = req.params;

    if (!mongoose.Types.ObjectId.isValid(ID)) {
        return res.status(404).json({ error: 'Invalid media ID' });
    }

    try {
        const deletedMedia = await Media.findByIdAndDelete(ID);
        if (!deletedMedia) {
            return res.status(404).json({ error: 'Media not found' });
        }
        return res.status(200).json(deletedMedia);
    } catch (error) {
        console.error('Error deleting media:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Function to edit the information of a specific media entry by its ID
const editMediaByID = async (req, res) => {
    const { ID } = req.params;

    if (!mongoose.Types.ObjectId.isValid(ID)) {
        return res.status(404).json({ error: 'Invalid media ID' });
    }

    try {
        const updatedMedia = await Media.findByIdAndUpdate(ID, req.body, { new: true });
        if (!updatedMedia) {
            return res.status(404).json({ error: 'Media not found' });
        }
        return res.status(200).json(updatedMedia);
    } catch (error) {
        console.error('Error updating media:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getMediaByType,
    getMediaByID,
    createMedia,
    deleteMediaByID,
    editMediaByID,
    searchVisMedia,
    searchMusic,
    searchBooks
};
