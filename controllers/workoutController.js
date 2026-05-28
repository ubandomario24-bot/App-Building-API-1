const Workout = require('../models/workout');

exports.createWorkout = async (req, res) => {
    try {
        const { name, duration, userId, status } = req.body;
        
        const newWorkout = new Workout({
            name,
            duration,
            userId,
            status
        });

        const savedWorkout = await newWorkout.save();
        return res.status(201).json(savedWorkout);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.addWorkout = async (req, res) => {
    try {
        const { name, duration } = req.body;
        const userId = req.user.id;

        const newWorkout = new Workout({
            userId,
            name,
            duration
            
        });

        const savedWorkout = await newWorkout.save();
        return res.status(201).json(savedWorkout);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


exports.getMyWorkouts = async (req, res) => {
    try {
        const userId = req.user.id;
        
        const workouts = await Workout.find({ userId });
        return res.status(200).json({ workouts });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};