const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 3001;

//import the routers
const mediaRouter = require('./routes/media')
const loginRouter = require('./routes/login');
const searchRouter = require('./routes/search');

// Import JWT middleware
const authenticateToken = require('./middleware/auth');

// const uri = "mongodb+srv://freddytnn:IDf5xB1j9D0Q3MXJ@cluster0.fainura.mongodb.net/?retryWrites=true&w=majority";
const uri = "mongodb+srv://freddytnn:IDf5xB1j9D0Q3MXJ@cluster0.fainura.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


if (process.env.NODE_ENV !== 'production'){
  require('dotenv').config();
}

// Enable CORS for development
app.use(cors());

// Parse JSON requests
app.use(express.json());


// Connect to the MongoDB database using Mongoose
// mongoose.connect(process.env.DATABASE_URL, {
mongoose.connect(uri, {
  useNewUrlParser: true,
});
const db = mongoose.connection
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Mongoose'));



// set the app to use the imported routers
app.use('', loginRouter);
app.use('', authenticateToken, mediaRouter);
app.use('', authenticateToken, searchRouter);

app.options('*', cors());


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});