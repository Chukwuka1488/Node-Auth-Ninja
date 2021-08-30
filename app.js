const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const dotenv = require('dotenv');

const app = express();
dotenv.config();
// middleware
app.use(express.static('public'));
app.use(express.json())

// view engine
app.set('view engine', 'ejs');

const port = process.env.PORT || 3000;
// database connection
const dbURI =
  `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@testcluster1.6edzl.mongodb.net/node-auth`;
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) =>
    app.listen(port, () =>
      console.log(`Connected to Database, Server is running on port ${port}`)
    )
  )
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(authRoutes);
