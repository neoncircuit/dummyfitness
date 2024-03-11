window.onload = function() {
    fetch('/dashboard')
        .then(response => response.json())
        .then(data => {
            // Create a welcome message using the user's first name
            const welcomeMessage = `Welcome, ${data.firstName}!`;
            
            // Create a heading element for the welcome message
            const heading = document.createElement('h1');
            heading.textContent = welcomeMessage;
            
            // Append the heading element to the body of the page
            document.body.appendChild(heading);
            
            // Display the user's other information as needed
            // ...
    })
        .catch((error) => {
        console.error('Error:', error);
    });
}