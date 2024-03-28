// assignment9/exercise-ui/src/components/EditExerciseList.js:
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const EditExercisePage = ({ exerciseToEdit }) => {
    const [name, setName] = useState(exerciseToEdit.name);
    const [reps, setReps] = useState(exerciseToEdit.reps);
    const [weight, setWeight] = useState(exerciseToEdit.weight);
    const [unit, setUnit] = useState(exerciseToEdit.unit);
    const [date, setDate] = useState(exerciseToEdit.date);

    const navigate = useNavigate();

    const formatDate = (inputDate) => {
        const dateObject = new Date(inputDate);
        const month = String(dateObject.getMonth() + 1).padStart(2, '0');
        const day = String(dateObject.getDate()).padStart(2, '0');
        const year = String(dateObject.getFullYear()).slice(-2);
        return `${month}-${day}-${year}`;
    };

    const editExercise = async () => {
        // Check if the date format is MM-DD-YY
        const dateFormat = /^\d{2}-\d{2}-\d{2}$/;
        if (!dateFormat.test(date)) {
            alert("Please enter the date in MM-DD-YY format.");
            return;
        }

        // Check if reps or weight are negative or zero
        if (parseInt(reps) <= 0 || parseInt(weight) <= 0) {
            alert("Reps and weight must be positive numbers.");
            return;
        }

        const editedExercise = { name, reps, weight, unit, date };
        const response = await fetch(`/exercises/${exerciseToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify(editedExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200) {
            alert("Successfully edited the exercise");
        } else {
            alert(`Failed to edit exercise, status code = ${response.status}`);
        }
        navigate('/');
    };

    return (
        <div>
            <h1>Exercise Tracker</h1> 
            <h2>Full Stack MERN App Demonstration</h2>
            <div> 
                <Link to="/" className="button">Home</Link>
                <Link to="/add-exercise" className="button">Add</Link>
            </div>
            <p>Edit exercise and save</p>
            <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)} />
            <input
                type="number"
                value={reps}
                onChange={e => setReps(e.target.value)} />
            <input
                type="number"
                value={weight}
                onChange={e => setWeight(e.target.value)} />
            <input
                type="text"
                value={unit}
                onChange={e => setUnit(e.target.value)} />
            <input
                type="text"
                placeholder="Date (MM-DD-YY)"
                value={date}
                onChange={e => setDate(e.target.value)} />
            <button onClick={editExercise}>Save</button>
            <footer>
                <p>&copy; 2024 Jackson Kelley</p> 
            </footer>
        </div>
    );
}

export default EditExercisePage;

