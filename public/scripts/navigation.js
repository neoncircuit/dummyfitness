const navigationContent = `
<nav>
    <button class="nav-toggle" aria-label="toggle navigation">
        <span class='hamburger'></span>
    </button>
    <ul class="nav-links">
        <li class="logo"><a href="/">Home<span class="mini"></span></a></li>
        <li><a href="/workouts">Workouts</a></li>
        <li><a href="/routines">Routines</a></li>
        <li><a href="#" id="tools">Tools</a>
            <ul class="dropdown" id="tools-dropdown">
                <li><a href="/bmi">BMI Calculator</a></li>
                <li><a href="/bodyfat">Body Fat Calculator</a></li>
                <li><a href="/calorie">Calories Calculator</a></li>
            </ul>
        </li>
        <li><a href="/feedback">Feedback</a></li>
        <li id="user-nav"></li>
    </ul>
</nav>
`;

document.addEventListener('DOMContentLoaded', function() {
  const navigationElement = document.getElementById('navigation');
  
  // Only set innerHTML if navigationElement is not null
  if (navigationElement) {
    navigationElement.innerHTML = navigationContent;
  }

  // Select the nav-toggle button and the nav-links
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  // Add click event listener to nav-toggle button
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('nav-open');
  });

  // Add click event listener to each nav link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.toggle('nav-open');
    });
  });

  // Check session and update navigation bar
  fetch('/check-session')
    .then(response => response.json())
    .then(data => {
      const navBar = document.getElementById('user-nav');
      if (data.loggedIn) {
        navBar.innerHTML = `
          <p>Welcome, ${data.firstName}!</p>
          <button id="logout-button">Logout</button>
        `;
        document.getElementById('logout-button').addEventListener('click', logout);
      } else {
        navBar.innerHTML = `
          <button id="login-button">Login</button>
        `;
        document.getElementById('login-button').addEventListener('click', login);
      }
    });

  function login() {
    // Redirect to login page
    window.location.href = '/login';
  }

  function logout() {
    // Make AJAX call to logout route
    fetch('/logout', { method: 'POST' })
      .then(response => response.json())
      .then(data => {
        // Redirect to login page
        window.location.href = '/login';
      });
  }
});

document.addEventListener('click', function(event) {
  const nav = document.querySelector('nav ul');
  const navToggle = document.querySelector('.nav-toggle');
  const isClickInsideNav = nav.contains(event.target);
  const isClickOnToggle = navToggle.contains(event.target);

  if (!isClickInsideNav && !isClickOnToggle && nav.classList.contains('nav-open')) {
      nav.classList.remove('nav-open');
  }
});