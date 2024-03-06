// Fetch the available workouts
fetch('/public/script/workoutbank2.js')
    .then(response => response.json())
    .then(workouts => {
        // Render the form
        const form = document.createElement('form');
        form.addEventListener('submit', handleSubmit);

        const nameInput = document.createElement('input');
        nameInput.name = 'name';
        form.appendChild(nameInput);

        workouts.forEach(workout => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = 'workouts';
        checkbox.value = workout._id;
        form.appendChild(checkbox);
        });

        document.body.appendChild(form);
});

function handleSubmit(event) {
    event.preventDefault();

    // Gather the data from the form
    const formData = new FormData(event.target);
    const routine = {
        name: formData.get('name'),
        workouts: formData.getAll('workouts').map(id => ({ workout: id })),
    };

    // Send the Routine object to the server
    fetch('/api/routines', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(routine),
    });
}