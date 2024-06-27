const express = require('express');
const router = express.Router();
const { addSearch, getSearchesByType, getRecentSearches, removeSearch } = require('../controllers/search');
const authenticateToken = require('../middleware/auth');

// Get recent searches (protected)
router.get('/search/all', authenticateToken, getRecentSearches);

// Add a new search (protected)
router.post('/search/add', authenticateToken, addSearch);

// Get searches by type for a specific user (protected)
router.get('/search/:userID/:type', authenticateToken, getSearchesByType);

// Remove a search entry (protected)
router.delete('/search/:ID', authenticateToken, removeSearch);

module.exports = router;
