const mongoose = require('mongoose');
var roomnumSchema = new mongoose.Schema({
    A101: {
        type: Boolean,
    },
    A102: {
        type: Boolean,
    },
    A103: {
        type: Boolean,
    },
    A104: {
        type: Boolean,
    },
    A105: {
        type: Boolean,
    },
    A106: {
        type: Boolean,
    },
    A107: {
        type: Boolean,
    },
    A108: {
        type: Boolean,
    },
    A109: {
        type: Boolean,
    },
    A110: {
        type: Boolean,
    }
});
/*roomSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');*/


module.exports = mongoose.model('room_num', roomnumSchema);