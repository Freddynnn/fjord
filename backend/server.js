const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 3001;

//import the routers
const mediaRouter = require('./routes/media')
const loginRouter = require('./routes/login')

// const uri = "mongodb+srv://freddytnn:IDf5xB1j9D0Q3MXJ@cluster0.fainura.mongodb.net/?retryWrites=true&w=majority";
const uri = "mongodb+srv://freddytnn:IDf5xB1j9D0Q3MXJ@cluster0.fainura.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


if (process.env.NODE_ENV !== 'production'){
  require('dotenv').config();
}

// Enable CORS for development
app.use(cors());

// app.use((req, res, next) => {
//   const allowedOrigins = ['https://ftfiiilsbvlrqeolrdefqxii.vercel.app/', 'http://localhost:3000'];
//   const origin = req.headers.origin;

//   if (allowedOrigins.includes(origin)) {
//     res.setHeader('Access-Control-Allow-Origin', origin);
//   }

//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   next();
// });


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
app.use('', mediaRouter);
app.use('', loginRouter);

app.options('*', cors());


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});