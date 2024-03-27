document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
    .then(response => {
      if (response.status === 200) {
        window.location.href = '/';
      } else if (response.status === 401) {
        // Display an error message for incorrect password
        alert('Password incorrect.');
      } else {
        // Display a general error message
        alert('An error occurred. Please try again.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
});


