const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: String,
    firstName: String,
    lastName: String
});
exports.User = mongoose.model('User', userSchema);