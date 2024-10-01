const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Ensure email is unique
    },
    password: {
        type: String,
        required: true
    }
})

const User = mongoose.model('User',userSchema);

module.exports=User;