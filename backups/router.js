function routePath() {
  const path = window.location.pathname;

  switch (path) {
    case '/bmi':
      loadPage('/views/bmi.html');
      break;
    case '/workouts':
      loadPage('/views/workouts.html'); 
      break;
    case '/workout-details':
      loadPage('/views/workout-details.html'); 
      break;  
    case '/feedback':
      loadPage('/views/feedback.html');
      break;
    default:
      loadPage('/views/index.html'); // Default to index.html for '/'
  }
}

function loadPage(page) {
  fetch(page)
    .then(response => response.text())
    .then(html => {
      document.querySelector('body').innerHTML = html;
      const script = document.createElement('script');
      script.src = page.replace('.html', '.js');
      document.body.appendChild(script);
    })
    .catch(error => {
      console.error('Error loading page:', error);
    });
}

window.onload = function () {
  routePath();

  const links = document.querySelectorAll('nav li a');

  links.forEach(link => {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      const page = this.getAttribute('href');
      loadPage(page);
    });
  });
};
