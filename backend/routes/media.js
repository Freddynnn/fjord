const express = require('express');
const router = express.Router();
const {
    getMediaByType,
    getMediaByID,
    createMedia,
    deleteMediaByID,
    editMediaByID,
    searchVisMedia
} = require('../controllers/media');

// All media routes
router.get('/media/:userID/:type', getMediaByType); 

router.get('/media/new', searchVisMedia);  //searches IMDB for new entry to add
router.post('/media/new', createMedia); // adds new entry (with ratings, etc. to mongoDB)

router.get('/media/:ID', getMediaByID); 
router.delete('/media/:ID', deleteMediaByID); 
router.patch('/media/:ID', editMediaByID); 

module.exports = router;
