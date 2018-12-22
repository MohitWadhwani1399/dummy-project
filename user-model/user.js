const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

    var userSchema = mongoose.Schema({

            username:{
                type:String,
                required:true},
            email:{
                type:String,
                required:true},
            password:String,
            hash:String,
    });

    
    // Generating a Hash
    /*userSchema.methods.generateHash = function(password){
        this.hash = bcrypt.hashSync(password,bcrypt.genSaltSync(8),null);
    };

    //validate password
    userSchema.methods.validPassword = function(password){
        if(bcrypt.compareSync(password,this.hash)){
            console.log("Password matched");
        }
        else console.log("incorrect Password")   
    };
*/
    module.exports = mongoose.model('User',userSchema,'User');
    