const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

const port = process.env.PORT || 3000;
// database connection
const dbURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@testcluster1.6edzl.mongodb.net/node-auth`;
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

// cookies
app.get('/set-cookies', (req, res) => {
  // res.setHeader('Set-Cookie', 'newUser=true');
  const one_day = 1000 * 60 * 60 * 24;
  res.cookie('newUser', false);
  res.cookie('isEmployee', true, {
    maxAge: one_day,
    httpOnly: true,
    secure: true,
  });

  res.send('you got the cookies');
});

app.get('/read-cookies', (req, res) => {
  const cookies = req.cookies;

  console.log(cookies.newUser);

  res.json(cookies);
});
