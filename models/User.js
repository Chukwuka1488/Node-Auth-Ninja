const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Minimum password length is 6 characters'],
  },
});

//fire a function after a saving data
// userSchema.post('save', function (doc, next) {
//   console.log('new user was created & saved', doc);
//   next();
// });

//fire a function before a saving data
userSchema.pre('save', async function (next) {
  // console.log('user about to be created and saved', this);
  const salt = await bcrypt.genSalt();
  
  // this refers to the instance of the user we are trying to create
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// the user in the bracket must be a singular version of whatever we named the collections in our database
const User = mongoose.model('user', userSchema);

module.exports = User;
