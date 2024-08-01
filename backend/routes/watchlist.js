const express = require('express');
const router = express.Router();
const { addWatchlist, getWatchlistsByType, removeWatchlist } = require('../controllers/watchlist');
const authenticateToken = require('../middleware/auth');

// Add a new watchlist (protected)
router.post('/watchlist/add', authenticateToken, addWatchlist);

// Get watchlists by type for a specific user (protected)
router.get('/watchlist/:userID/:type', authenticateToken, getWatchlistsByType);

// Remove a watchlist entry (protected)
router.delete('/watchlist/:ID', authenticateToken, removeWatchlist);

module.exports = router;
