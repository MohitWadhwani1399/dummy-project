const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
var questionSchema = mongoose.Schema({
    question:{
        type:String,
        required:true
    }
});
module.exports = mongoose.model('question',questionSchema,'question');