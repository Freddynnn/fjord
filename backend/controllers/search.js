const mongoose = require('mongoose');
const Search = require('../models/search');
const axios = require('axios');


// Function to add recent search to the database
const addSearch = async (req, res) => {
    const { name, type, coverImage, userID } = req.body;
    const newSearchItem = new Search({name, type, coverImage, userID});

    try { 
        await newSearchItem.save();
        res.status(201).json({ message: 'Search saved successfully', search: newSearchItem });
    } catch (error) {
        console.error('Error saving search:', error);
        res.status(500).json({ error: 'Error 500 saving search' });
    }
};

// Function to list search entries by media type 
const getSearchesByType = async (req, res) => {
    const userID = req.params.userID;
    const type = req.params.type;

    try {
        // Perform a case-insensitive search using a regular expression
        const userSearches = await Search.find({ 
            userID,
            type: { $regex: new RegExp(type, 'i') } 
        }).sort({ createdAt: -1 }).limit(10);

        if (!userSearches || userSearches.length === 0) {
            return res.status(404).json({ error: `No searches found for userID: ${userID} and type: ${type}` });
        }

        return res.status(200).json(userSearches);
    } catch (error) {
        console.error('Error fetching searches:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Function to get all recent searches (placeholder)
const getRecentSearches = async (req, res) => {
    try {
        const searches = await Search.find({ userID: req.query.userID }).sort({ createdAt: -1 }).limit(10);
        res.status(200).json(searches);
    } catch (error) {
        console.error('Error fetching searches:', error);
        res.status(500).json({ error: 'Error fetching searches' });
    }
};

// Function to remove a search (placeholder)
const removeSearch = async (req, res) => {
    const { ID } = req.params;

    if (!mongoose.Types.ObjectId.isValid(ID)) {
        return res.status(404).json({ error: 'Invalid search ID' });
    }

    try {
        const deletedSearch = await Search.findByIdAndDelete(ID);
        if (!deletedSearch) {
            return res.status(404).json({ error: 'Search not found' });
        }
        return res.status(200).json(deletedSearch);
    } catch (error) {
        console.error('Error deleting Search:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};



module.exports = {
    addSearch,
    getSearchesByType,
    getRecentSearches,
    removeSearch
};
