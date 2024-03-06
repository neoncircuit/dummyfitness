function handleGeneralFeedback(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const feedbackType = formData.get('feedbackType');
  const additionalFeedback = formData.get('additionalFeedback');
  const rating = formData.get('rating');

  if (!feedbackType || !rating) {
    document.getElementById('feedbackNotification').innerText = "Please fill in all required fields (Feedback Type, and Rating).";
    return;
  }

  const userId = localStorage.getItem('userId'); // get the user's ID from local storage

  const feedbackEntry = {
    userId,
    feedbackType,
    additionalFeedback,
    rating,
    timestamp: new Date().toISOString(),
  };

  fetch('/submit-feedback', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(feedbackEntry),
  })
  .then(response => response.json())
  .then(data => {
    document.getElementById('feedbackNotification').innerText = data.message;
    event.target.reset();
  })
  .catch(error => {
    document.getElementById('feedbackNotification').innerText = "An error occurred while submitting your feedback.";
  });
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('generalFeedbackForm').addEventListener('submit', handleGeneralFeedback);
});