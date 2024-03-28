// assignment9/exercise-ui/src/pages/AddExercisePage.js:

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const AddExercisePage = () => {
    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('lbs');
    const [date, setDate] = useState('');

    const navigate = useNavigate();

    const addExercise = async () => {
        if (!name || !reps || !weight || !unit || !date) {
            alert("Please fill in all fields.");
            return;
        }

        // Check if reps or weight are negative or zero
        if (parseInt(reps) <= 0 || parseInt(weight) <= 0) {
            alert("Reps and weight must be positive numbers.");
            return;
        }

        // Validate date format (MM-DD-YY)
        const dateFormat = /^\d{2}-\d{2}-\d{2}$/;
        if (!dateFormat.test(date)) {
            alert("Please enter the date in MM-DD-YY format.");
            return;
        }

        const newExercise = { name, reps, weight, unit, date };
        const response = await fetch('/exercises', {
            method: 'POST', 
            body: JSON.stringify(newExercise),
            headers: {
                'Content-Type': 'application/json', 
            },
        });

        if(response.status === 201){
            alert("Successfully added the exercise");
            navigate('/');
        } else {
            alert(`Failed to add exercise, status code = ${response.status}`);
        }
    };

    return (
        <div>
            <h1>Exercise Tracker</h1>
            <h2>Full Stack MERN App Demonstration</h2>
            <h3>Add Exercise</h3>
            <div> 
                <Link to="/" className="button">Home</Link>
                <Link to="/add-exercise" className="button">Add</Link>
            </div>
            <p>Enter values for the exercise</p>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={e => setName(e.target.value)} />
            <input
                type="number"
                placeholder="Reps"
                value={reps}
                onChange={e => setReps(e.target.value)} />
            <input
                type="number"
                placeholder="Weight"
                value={weight}
                onChange={e => setWeight(e.target.value)} />
            <select
                value={unit}
                onChange={e => setUnit(e.target.value)}>
                <option value="lbs">lbs</option>
                <option value="kg">kg</option>
            </select>
            <input
                type="text"
                placeholder="Date (MM-DD-YY)"
                value={date}
                onChange={e => setDate(e.target.value)} />
            <button onClick={addExercise}>Add</button>
            <footer>
                <p>&copy; 2024 Jackson Kelley</p>
            </footer>
        </div>
    );
}

export default AddExercisePage;
