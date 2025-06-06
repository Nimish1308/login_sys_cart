const mongoose = require('mongoose');
const Products=require('./Products');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
   cart: [Products] // <-- Cart items per user
});

module.exports = mongoose.model('User', userSchema);
