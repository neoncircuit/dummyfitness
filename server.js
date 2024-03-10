const express = require('express');
const path = require('path');
//const fs = require('fs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');
const User = require('./models/user');
const Feedback = require('./models/feedback-schema');
const Post = require('./models/forum-schema');

require('dotenv').config();

mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

const app = express();
app.use(bodyParser.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

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
      const posts = await Post.find().populate('author.id').populate('comments.author');
      const currentUser = await User.findById(req.session.userId); // Define currentUser
      res.json({ posts, currentUser });
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

app.get('/forums', checkAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'views', 'forum.html'));
});

app.get('/profile', checkAuthenticated, async (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'views', 'profile.html'));
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

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});