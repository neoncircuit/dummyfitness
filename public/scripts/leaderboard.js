// Fetch the leaderboard data from your server
fetch('/api/leaderboard')
  .then(response => response.json())
  .then(leaderboard => {
    // Get a reference to the leaderboard table body
    const tbody = document.getElementById('leaderboardTable').getElementsByTagName('tbody')[0];

    // Loop through the leaderboard data
    leaderboard.forEach((user, index) => {
      const row = tbody.insertRow();

      // Insert cells for the rank, name, and points
      const rankCell = row.insertCell();
      const nameCell = row.insertCell();
      const pointsCell = row.insertCell();

      // Set the cell values
      const rank = index + 1;
      if (rank === 1) {
        rankCell.textContent = `${rank} 🥇`; // Gold medal emoji
      } else if (rank === 2) {
        rankCell.textContent = `${rank} 🥈`; // Silver medal emoji
      } else if (rank === 3) {
        rankCell.textContent = `${rank} 🥉`; // Bronze medal emoji
      } else {
        rankCell.textContent = rank;
      }
      nameCell.textContent = user.username;
      pointsCell.textContent = user.totalPointsEarned;
    });
  })
.catch(error => console.error('Error:', error));