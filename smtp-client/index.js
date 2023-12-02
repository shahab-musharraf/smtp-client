// index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware
const Email = require('./models/Email');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/smtp-client', { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware
app.use(cors()); // Use cors middleware
app.use(bodyParser.json());

// API Routes
app.post('/api/send-email', async (req, res) => {
  const { recipient, subject, message } = req.body;

  // Save the email to MongoDB
  const newEmail = new Email({ recipient, subject, message });
  try {
    const savedEmail = await newEmail.save();
    res.json({ success: true, message: 'Email saved to MongoDB', email: savedEmail });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error saving email', error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
