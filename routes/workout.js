const express = require('express');
const router = express.Router();
const workoutController = require('../controllers/workoutController');
const verifyToken = require('../auth');


router.post('/addWorkout', workoutController.createWorkout);


router.get('/getMyWorkouts', verifyToken, workoutController.getMyWorkouts);

module.exports = router;