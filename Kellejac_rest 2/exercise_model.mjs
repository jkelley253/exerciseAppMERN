// assignment9/exercise-rest/exercise_model.mjs
import mongoose from 'mongoose';

const exerciseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    unit: { type: String, enum: ['kgs', 'lbs'], required: true },
    date: { type: String, required: true }
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

export { Exercise };
