// assignment9/exercise-ui/src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ExerciseList from '../components/ExerciseList';

function HomePage({ setExerciseToEdit }) {
    const [exercises, setExercises] = useState([]);
    const navigate = useNavigate(); 

    const onDelete = async _id => {
        const response = await fetch(`/exercises/${_id}`, {method: 'DELETE'});
        if(response.status === 204) {
            setExercises(exercises.filter(m => m._id !== _id));
        } else {
            console.error(`Failed to delete exercise with _id = ${_id}, status code = ${response.status}`);
        }
    };

    const onEdit = exercise => {
        setExerciseToEdit(exercise);
        navigate('/edit-exercise'); 
    }

    const loadExercises = async () => {
        const response = await fetch('/exercises');
        const data = await response.json();
        setExercises(data);
    }

    useEffect(() => {
        loadExercises();
    }, []);

    return (
        <>
            <div>
                <h2>Exercise Tracker</h2>
                <h3>Full Stack MERN App Demonstration</h3>
                <Link to="/" className="button">Home</Link>
                <Link to="/add-exercise" className="button">Add</Link>
            </div>
            <div>
                <ExerciseList exercises={exercises} onDelete={onDelete} onEdit={onEdit}></ExerciseList>
            </div>
            <footer>
                <p>&copy; 2024 Jackson Kelley</p>
            </footer>
        </>
    );
}

export default HomePage;
