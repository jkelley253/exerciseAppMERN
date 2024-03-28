// assignment9/exercise-rest/server.mjs
import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import { createExercise, getAllExercises, getExerciseById, updateExercise, deleteExercise } from './exercises_controller.mjs';

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_CONNECT_STRING = process.env.MONGODB_CONNECT_STRING;

app.use(express.json());

mongoose.connect(MONGODB_CONNECT_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => console.error('Error connecting to MongoDB:', error));

app.post('/exercises', createExercise);
app.get('/exercises', getAllExercises);
app.get('/exercises/:id', getExerciseById);
app.put('/exercises/:id', updateExercise);
app.delete('/exercises/:id', deleteExercise);
