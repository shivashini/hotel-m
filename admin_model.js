const mongoose = require('mongoose');
var Admin = new mongoose.Schema({
    firstname:{
        type: String,  
    },
    lastname:{
        type: String,
    },
    email:{
        type: String,
    },
    password:{
        type: String,
    },
    Created_date:{
        type: Date,
        default: Date.now
    }, 
});
module.exports = mongoose.model('Admin', Admin);  