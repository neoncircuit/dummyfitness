class Reward {
    constructor(name, description, cost) {
      this.name = name;
      this.description = description;
      this.cost = cost;
      this.claimed = false; 
    }
  
    // Method to display the reward on the page
    display(index) {
        const rewardDiv = document.createElement('div');
        rewardDiv.classList.add('reward'); // Use class for styling
    
        // Set the content of the reward div
        rewardDiv.innerHTML = `
        <h2>${this.name}</h2>
        <p>${this.description}</p>
        <p>Cost: ${this.cost} points</p>
        ${this.claimed ? '<p>Claimed</p>' : `<button onclick="redeemReward(${index})">Redeem</button>`}
        `;
    
        // Add the reward div to the rewards container
        const rewardsContainer = document.getElementById('rewardsContainer');
        rewardsContainer.appendChild(rewardDiv);
    }
  
  
    // Method to claim the reward
    claim() {
      this.claimed = true;
    }
}
  
  
// List of available rewards
const rewards = [
    new Reward(
        'Personalized Nutrition Guide', 
        'Unlock a nutrition guide tailored to your needs, including custom made recipes that are not only healthy, but more importantly delicious', 
        5
    ),
    new Reward(
        'Grab Food Voucher', 
        'Redeem a Grab Food Voucher to use when ordering takeaway at your favourite restaurants listed on Grab', 
        100
    ),
    new Reward(
        'One-on-One coaching monthly subscription', 
        'Unlock a one-on-one video coaching session with a fitness coach, offering personalized advice, motivation, and adjustments to your fitness plan.', 
        600
    ),
];

// Function to display the rewards on the page
function displayRewards() {
    rewards.forEach((reward, index) => reward.display(index));
}

function redeemReward(rewardIndex) {
  // Check if the user has enough points to redeem the reward
  const userPoints = parseInt(document.getElementById('userPoints').textContent.split(' ')[1]);
  if (userPoints < rewards[rewardIndex].cost) {
    alert('You do not have enough points to redeem this reward.');
    return;
  }

  // Display a confirmation dialog
  const confirmRedeem = confirm('Are you sure you want to redeem this reward?');
  
  // If the user confirmed, proceed with the redemption
  if (confirmRedeem) {
    // Send a POST request to the server to redeem the reward
    fetch(`/redemption/${rewardIndex}`, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rewards[rewardIndex]) // Include the reward data in the request body
    })
      .then(response => {
        if (response.ok) {
          // If the request was successful, claim the reward and reload the page
          rewards[rewardIndex].claim();
          location.reload();
        } else {
          // If the request failed, log the status
          console.error(`Error: ${response.status}`);
        }
      })
      .catch(error => console.error('Error:', error));
  }
}

document.addEventListener('DOMContentLoaded', (event) => {
    const pointsElement = document.querySelector('#userPoints');

    function getUser() {
        return fetch(`/api/user`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log(data); // Log the data
            return data.user;
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    getUser().then(user => {
        console.log(user);
        pointsElement.textContent = `Points: ${user.points}`;
    });
});

window.onload = function() {
  fetch('/claimedRewards')
    .then(response => response.json())
    .then(claimedRewards => {
      // For each claimed reward, find the corresponding reward in the rewards array and set claimed to true
      claimedRewards.forEach(claimedReward => {
        const reward = rewards.find(r => r.name === claimedReward.name);
        if (reward) {
          reward.claimed = true;
        }
      });

      // Display the rewards
      displayRewards();
    })
    .catch(error => console.error('Error:', error));
};