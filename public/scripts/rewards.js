// Import the User model
const User = require('/models/user.js');

async function updateRewardPoints(userId, pointsToAdd) {
  try {
    // Find the user by their ID
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Add the points to the user's current points
    user.points += pointsToAdd;

    // Save the updated user
    await user.save();

    return user.points;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function getRewardPoints(userId) {
  try {
    // Find the user by their ID
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Return the user's points
    return user.points;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

module.exports = { updateRewardPoints, getRewardPoints };