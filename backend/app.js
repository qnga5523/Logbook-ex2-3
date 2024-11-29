const mongoose = require('mongoose'); // library for interacting with MongoDB.
const express = require('express'); //popular Node.js web framework
const taskRoutes = require('./routes/task'); // containing routes for handling task-related requests
const cors = require('cors'); //allowing requests from different domains.
require('dotenv').config(); 

const app = express(); //initializes a new Express application
app.use(cors());
app.use(express.json()); 
app.use('/api/tasks', taskRoutes); 
app.use((err, req, res, next) => {
  console.error(err.stack); 
  res.status(500).send('Something went wrong!');
});
// MongoDB Connection
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); 
  });
  //Listens on the specified port and host, making the server accessible for incoming requests.
const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0'; 
app.listen(PORT, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
