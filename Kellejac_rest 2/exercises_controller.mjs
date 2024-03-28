// assignment9/exercise-rest/exercises_controller.mjs
import { Exercise } from './exercise_model.mjs';
import { isDateValid } from './ut.mjs';

const createExercise = async (req, res) => {
    try {
        const { name, reps, weight, unit, date } = req.body;

        if (!name || !reps || !weight || !unit || !date || !isDateValid(date)) {
            return res.status(400).json({ error: "Invalid request" });
        }

        const exercise = new Exercise({ name, reps, weight, unit, date });
        const result = await exercise.save();
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getAllExercises = async (req, res) => {
    try {
        const exercises = await Exercise.find();
        res.status(200).json(exercises);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getExerciseById = async (req, res) => {
    try {
        const exercise = await Exercise.findById(req.params.id);
        if (!exercise) {
            return res.status(404).json({ message: 'Exercise not found' });
        }
        res.status(200).json(exercise);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateExercise = async (req, res) => {
    try {
        const { name, reps, weight, unit, date } = req.body;

        if (!name || !reps || !weight || !unit || !date || !isDateValid(date)) {
            return res.status(400).json({ error: "Invalid request" });
        }

        const exercise = await Exercise.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!exercise) {
            return res.status(404).json({ message: 'Exercise not found' });
        }
        res.status(200).json(exercise);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteExercise = async (req, res) => {
    try {
        const exercise = await Exercise.findByIdAndDelete(req.params.id);
        if (!exercise) {
            return res.status(404).json({ message: 'Exercise not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export { createExercise, getAllExercises, getExerciseById, updateExercise, deleteExercise };
