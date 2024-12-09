const mongoose = require('mongoose');
const Watchlist = require('../models/watchlist');
const axios = require('axios');


// Function to add recent Watchlist to the database
const addWatchlist = async (req, res) => {
    const { name, type, coverImage, userID } = req.body;
    const newWatchlistItem = new Watchlist({name, type, coverImage, userID});

    try { 
        await newWatchlistItem.save();
        res.status(201).json({ message: 'Watchlist saved successfully', watchlist: newWatchlistItem });
    } catch (error) {
        console.error('Error saving Watchlist:', error);
        res.status(500).json({ error: 'Error 500 saving Watchlist' });
    }
};

// Function to list Watchlist entries by media type 
const getWatchlistsByType = async (req, res) => {
    const userID = req.params.userID;
    const type = req.params.type;

    try {
        // Perform a case-insensitive Watchlist using a regular expression
        const userWatchlists = await Watchlist.find({ 
            userID,
            type: { $regex: new RegExp(type, 'i') } 
        }).sort({ createdAt: -1 }).limit(10);

        if (!userWatchlists || userWatchlists.length === 0) {
            return res.status(404).json({ error: `No watchlist found for userID: ${userID} and type: ${type}` });
        }

        return res.status(200).json(userWatchlists);
    } catch (error) {
        console.error('Error fetching watchlists:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getWatchlistByName = async (req, res) => {
    const userID = req.params.userID;
    const name = req.query.name;

    try {
        // Perform a case-insensitive Watchlist using a regular expression
        const userWatchlists = await Watchlist.find({ 
            userID,
            name: { $regex: new RegExp(type, 'i') } 
        }).sort({ createdAt: -1 }).limit(10);

        if (!userWatchlists || userWatchlists.length === 0) {
            return res.status(404).json({ error: `No watchlist found for userID: ${userID} and type: ${type}` });
        }

        return res.status(200).json(userWatchlists);
    } catch (error) {
        console.error('Error fetching watchlists:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }


}



// Function to remove a Watchlist (placeholder)
const removeWatchlist = async (req, res) => {
    const { ID } = req.params;

    if (!mongoose.Types.ObjectId.isValid(ID)) {
        return res.status(404).json({ error: 'Invalid watchlist ID' });
    }

    try {
        const deletedWatchlist = await Watchlist.findByIdAndDelete(ID);
        if (!deletedWatchlist) {
            return res.status(404).json({ error: 'watchlist not found' });
        }
        return res.status(200).json(deletedWatchlist);
    } catch (error) {
        console.error('Error deleting watchlist:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};



module.exports = {
    addWatchlist,
    getWatchlistsByType,
    removeWatchlist
};
