const express = require('express');
const router = express.Router();
const {
    getMediaByType,
    getMediaByID,
    createMedia,
    deleteMediaByID,
    editMediaByID,
    searchVisMedia,
    searchMusic,
    searchBooks
} = require('../controllers/media');
const authenticateToken = require('../middleware/auth');

// All media routes
router.get('/media/:userID/:type', authenticateToken, getMediaByType); 

router.get('/imdb/search', searchVisMedia);  // Searches IMDB for new entry to add
router.get('/spotify/search', searchMusic);  // Searches Spotify API
router.get('/books/search', searchBooks);    // Searches Goodreads API for books
router.post('/media/new', authenticateToken, createMedia); // Adds new entry (with ratings, etc. to MongoDB)

router.get('/media/:ID', authenticateToken, getMediaByID); 
router.delete('/media/:ID', authenticateToken, deleteMediaByID); 
router.patch('/media/:ID', authenticateToken, editMediaByID); 

module.exports = router;
