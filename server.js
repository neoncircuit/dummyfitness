const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');

const User = require('./models/user');
const Feedback = require('./models/feedback-schema');
const { Comment, Post } = require('./models/forum-schema');

require('dotenv').config();

mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

User.updateMany({ points: { $in: [null, undefined] } }, { points: 0 })
  .then(() => console.log('Points updated successfully'))
  .catch(err => console.error('Error updating users:', err));

const app = express();
app.use(bodyParser.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false },
}));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

app.use('/data', express.static('data'));

app.use('/assets', express.static(path.join(__dirname, 'public', 'assets')));

app.use('/csv', express.static(path.join(__dirname, 'public', 'csv')));

app.use('/css', express.static(path.join(__dirname, 'public', 'css')));

app.use('/feedback', express.static(path.join(__dirname, 'public', 'feedback')));

app.use('/scripts', express.static(path.join(__dirname, 'public', 'scripts')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'views', 'index.html'));
});

app.get('/bmi', checkAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'views', 'bmi.html'));
});

app.get('/bodyfat', checkAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'views', 'bodyfat.html'));
});

app.get('/calorie', checkAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'views', 'calorie.html'));
});

app.get('/workouts', checkAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'views', 'workouts.html'));
});

app.get('/workout-details', checkAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'views', 'workout-details.html'));
});

app.get('/routines', checkAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'views', 'routines.html'));
});

app.get('/routine-details', checkAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'views', 'routine-details.html'));
});


app.get('/feedback', checkAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'views', 'feedback.html'));
});

app.get('/forum', async (req, res) => {
  try {
      const posts = await Post.find().populate('author.id', 'username country').populate('comments.author.id', 'username country');
      const currentUser = await User.findById(req.session.userId); // Define currentUser
      res.json({ posts, currentUser });
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

app.get('/forums', checkAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'views', 'forum.html'));
});

app.get('/leaderboard', checkAuthenticated, async (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'views', 'leaderboard.html'));
});

app.get('/profile', checkAuthenticated, async (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'views', 'profile.html'));
});

app.get('/redemption', checkAuthenticated, async (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'views', 'redemption.html'));
});

app.get('/user', checkAuthenticated, async (req, res) => {
  try {
      const user = await User.findById(req.user._id);
      res.json(user);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'views', 'register.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'views', 'login.html'));
});

app.get('/check-session', async (req, res) => {
  if (req.session.userId) {
    try {
      const user = await User.findById(req.session.userId);
      if (!user) {
        res.send({ loggedIn: false });
      } else {
        res.send({ loggedIn: true, username: user.username, firstName: user.firstName });
      }
    } catch (err) {
      console.error('Error during findById:', err);
      res.status(500).send('Error checking session.');
    } 
  } else {
    res.send({ loggedIn: false });
  }
});

app.get('/api/user', async (req, res) => {
  try {
    const user = await User.findById(req.session.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ user });
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ message: 'Error fetching user' });
  }
});

app.put('/api/user', async (req, res) => {
  try {
    const user = await User.findById(req.session.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's points
    user.points = req.body.points;

    // Save the user
    await user.save();
    res.json({ message: 'User saved successfully', user });
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ message: 'Error updating user' });
  }
});

app.get('/api/leaderboard', async (req, res) => {
  try {
    // Find all users, sort them by points in descending order and then by the date they reached the points in ascending order, and exclude users with no points
    const users = await User.find({ points: { $gt: 0 } }).sort({ points: -1, dateReachedPoints: 1 });

    // Format the users for the leaderboard
    const leaderboard = users.map(user => ({
      username: user.username,
      points: user.points,
      totalPointsEarned: user.totalPointsEarned, // Include totalPointsEarned in the response
    }));

    res.json(leaderboard);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route for the redemption page
app.get('/redemption', checkAuthenticated, async (req, res) => {
  try {
    // Find the user and their available points and rewards
    const user = await User.findById(req.session.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Render the redemption page with the user's available points and the available rewards
    res.render('redemption', { points: user.points, rewards: user.claimedRewards });
  } catch (err) {
    console.error('Error in /redemption/:rewardIndex route:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to redeem a reward
app.post('/redemption/:rewardIndex', checkAuthenticated, async (req, res) => {
  try {
    // Find the user
    const user = await User.findById(req.session.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get the reward
    const reward = req.body;
    console.log('Reward:', reward);

    // Check if the reward has already been claimed
    const alreadyClaimed = user.claimedRewards.some(r => r.name === reward.name && r.claimed);
    if (alreadyClaimed) {
      return res.status(400).json({ message: 'This reward has already been claimed' });
    }

    // Check if the user has enough points to redeem the reward
    if (user.points < reward.cost) {
      return res.status(400).json({ message: 'Not enough points to redeem this reward' });
    }

    // Subtract the cost of the reward from the user's points
    user.points -= reward.cost;

    // Add the reward to the user's claimed rewards and set claimed to true
    user.claimedRewards.push({
      name: reward.name,
    });

    // Tell Mongoose that the claimedRewards array has been modified
    user.markModified('claimedRewards');

    // Save the updated user
    //await user.save();
    await user.save().then(() => console.log('Reward saved successfully'));

    // Log the updated user
    console.log('Updated user:', user);

    // Redirect the user back to the redemption page
    res.redirect('/redemption');
  } catch (err) {
    console.error('Error in /redemption/:rewardIndex route:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to get the user's claimed rewards
app.get('/claimedRewards', checkAuthenticated, async (req, res) => {
  try {
    // Find the user
    const user = await User.findById(req.session.userId);
    console.log('Retrieved user:', user);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send the user's claimed rewards
    res.json(user.claimedRewards);
  } catch (err) {
    console.error('Error in /claimedRewards route:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/forum', checkAuthenticated, async (req, res) => {
  try {
      const post = new Post({
          topic: req.body.topic,
          content: req.body.content,
          author: {
              id: req.user._id,
              username: req.user.username,
              country: req.user.country
          }
      });
      await post.save();
      res.status(201).json(post);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

app.put('/forum/:id', async (req, res) => {
  try {
      const post = await Post.findById(req.params.id);
      if (!post) {
          return res.status(404).json({ message: 'Post not found' });
      }
      if (post.author.id.toString() !== req.session.userId) {
          return res.status(403).json({ message: 'Not authorized' });
      }
      post.content = req.body.content;
      await post.save();
      res.json(post);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

app.delete('/forum/:id', async (req, res) => {
  try {
      const post = await Post.findById(req.params.id);
      if (!post) {
          return res.status(404).json({ message: 'Post not found' });
      }
      if (post.author.id.toString() !== req.session.userId) {
          return res.status(403).json({ message: 'Not authorized' });
      }
      await Post.deleteOne({ _id: req.params.id });
      res.json({ message: 'Post deleted' });
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

app.post('/forum/:id/like', checkAuthenticated, async (req, res) => {
  try {
    const userId = req.session.userId;
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the user has already liked the post
    const alreadyLiked = post.likedBy.includes(userId);

    // If the user has already liked the post, remove the like
    // Otherwise, add the like and remove any dislike
    const update = alreadyLiked
      ? { $pull: { likedBy: userId }, $inc: { likes: -1 } }
      : { $addToSet: { likedBy: userId }, $pull: { dislikedBy: userId }, $inc: { likes: 1, dislikes: post.dislikedBy.includes(userId) ? -1 : 0 } };

    const updatedPost = await Post.findByIdAndUpdate(req.params.id, update, { new: true });

    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/forum/:id/dislike', checkAuthenticated, async (req, res) => {
  try {
    const userId = req.session.userId;
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the user has already disliked the post
    const alreadyDisliked = post.dislikedBy.includes(userId);

    // If the user has already disliked the post, remove the dislike
    // Otherwise, add the dislike and remove any like
    const update = alreadyDisliked
      ? { $pull: { dislikedBy: userId }, $inc: { dislikes: -1 } }
      : { $addToSet: { dislikedBy: userId }, $pull: { likedBy: userId }, $inc: { dislikes: 1, likes: post.likedBy.includes(userId) ? -1 : 0 } };

    const updatedPost = await Post.findByIdAndUpdate(req.params.id, update, { new: true });

    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new comment
app.post('/forum/:postId/comments', checkAuthenticated, async (req, res) => {
  try {
      const post = await Post.findById(req.params.postId);
      if (!post) {
          return res.status(404).json({ message: 'Post not found' });
      }
      const comment = new Comment({
          content: req.body.content,
          author: {
              id: req.user._id,
              username: req.user.username,
              country: req.user.country
          },
          post: post._id,
          date: new Date()
      });
      await comment.save();
      post.comments.push(comment);
      await post.save();
      res.json(comment);
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
  }
});

// Edit a comment
app.put('/forum/comments/:commentId', checkAuthenticated, async (req, res) => {
  try {
      const comment = await Comment.findById(req.params.commentId);
      if (!comment) {
          return res.status(404).json({ message: 'Comment not found' });
      }
      if (comment.author.toString() !== req.session.userId) {
          return res.status(403).json({ message: 'Not authorized' });
      }
      comment.content = req.body.content;
      await comment.save();
      res.json(comment);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

// Delete a comment
app.delete('/forum/comments/:commentId', checkAuthenticated, async (req, res) => {
  try {
      const comment = await Comment.findById(req.params.commentId);
      if (!comment) {
          return res.status(404).json({ message: 'Comment not found' });
      }
      if (comment.author.toString() !== req.session.userId) {
          return res.status(403).json({ message: 'Not authorized' });
      }
      await comment.remove();
      res.json({ message: 'Comment deleted' });
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

app.put('/user', checkAuthenticated, async (req, res) => {
  try {
      const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, { new: true });
      res.json(updatedUser);
  } catch (err) {
      res.status(400).json({ message: err.message });
  }
});

app.post('/submit-feedback', async (req, res) => {
  console.log('Received request to /submit-feedback with body:', req.body);

  try {
    const user = await User.findById(req.session.userId);
    if (!user) {
      console.log('No user found with ID:', req.session.userId);
      return res.status(404).json({ message: 'User not found' });
    }

    const feedback = new Feedback({
      userId: req.session.userId,
      userFirstName: user.firstName,
      username: user.username,
      userEmail: user.email,
      message: req.body.additionalFeedback,
      feedbackType: req.body.feedbackType,
      rating: req.body.rating,
      timestamp: req.body.timestamp
    });

    await feedback.save();
    res.json({ message: 'Feedback has been logged successfully' });
  } catch (err) {
    console.error('An error occurred:', err);
    res.status(500).json({ message: 'An error occurred' });
  }
});

app.post('/register', async (req, res) => {
  const { username, password, email, firstName, lastName, region, country, age, exerciseFrequency, fitnessGoals} = req.body;
  
  try {
    // Check if a user with the given username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username: username,
      password: hashedPassword,
      email: email,
      firstName: firstName,
      lastName: lastName,
      region: region,
      country: country,
      age: age,
      exerciseFrequency: exerciseFrequency,
      fitnessGoals: fitnessGoals,
    });

    const savedUser = await user.save();
    req.session.userId = savedUser._id;
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/login', async (req, res) => {
  console.log('POST /login');
  try {
    const user = await User.findOne({ username: req.body.username });
    console.log(req.body.username, req.body.password);
    if (!user) {
      return res.status(401).send('User not found.');
    }
    bcrypt.compare(req.body.password, user.password, function(err, result) {
      if (err) {
        console.error('Error during bcrypt.compare:', err);
        return res.status(500).send('Error comparing passwords.');
      }
      if (result === true) {
        try {
          req.session.userId = user._id;
          req.session.claimedRewards = user.claimedRewards;
          // Set a cookie with the user's ID
          res.cookie('userId', user._id);
          console.log('req.session.userId:', req.session.userId);
          res.status(200).send('Logged in!');
        } catch (err) {
          console.error('Error setting session userId:', err);
          res.status(500).send('Error logging in.');
        }
      } else {
        res.status(401).send('Password incorrect.');
      }
    });
  } catch (err) {
    console.error('Error during findOne:', err);
    return res.status(500).send('Error logging in.');
  }
});

app.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Error during session destroy:', err);
      return res.status(500).send('Error logging out.');
    }
    res.send({ loggedOut: true });
  });
});

async function checkAuthenticated(req, res, next) {
  if (req.session.userId) {
    try {
      const user = await User.findById(req.session.userId);
      if (!user) {
        res.redirect('/login');
      } else {
        req.user = user; // Add the user's information to the request object
        next();
      }
    } catch (err) {
      console.error('Error during findById:', err);
      res.redirect('/login');
    }
  } else {
    res.redirect('/login');
  }
}

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});