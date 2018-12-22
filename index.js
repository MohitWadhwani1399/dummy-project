const express = require('express');
const app = express();

const port = 8080;
const mongoose = require('mongoose');
const morgan = require('morgan');
//const passport = require('passport');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const validator = require('express-validator');

app.set('view engine','ejs');
app.use(express.static('./views'));
app.use(flash());
app.use(validator());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({secret: "abcd123",resave:true,saveUninitialized:true}));


mongoose.connect('mongodb://localhost:27017/mydb',{useNewUrlParser:true});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('open',function(){
  console.log('connection established');
});
mongoose.Promise = global.Promise;
const routes=require('./routes/route.js')();
const user = require('./user-model/user.js');
app.use('/',routes);
app.listen(port,()=>{
    console.log("Listening on port "+port);
});
/*
const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
    {
        usernameField: 'Username',
        passwordField: 'password'
    },
    function(Username, password,user,done) {
      user.findOne({
        Username: Username
      }, function(err, user){
        if (err) {
            return done(err);
          }
  
          if (!user) {
            return done(null, false,{message:"Incorrect username"});
          }
  
          if (!user.verifyPassword(password)) {
            return done(null, false,{message:"Incorrect password"});
          }
        return done(null, user);
      });
  }
));
*/
