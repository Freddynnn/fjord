const express = require('express');
const router = express.Router();
const { addSearch, getSearchesByType, getRecentSearches, removeSearch } = require('../controllers/search');

router.get('/search/all', getRecentSearches);

router.post('/search/add', addSearch); 
router.get('/search/:userID/:type', getSearchesByType);
router.delete('/search/:ID', removeSearch); 

module.exports = router;
