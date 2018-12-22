const express = require('express');
const router = express.Router();
const passport = require('passport');
const flash = require('connect-flash');
const User = require('../user-model/user.js');
const question = require('../user-model/question.js');
module.exports = function(){

    router.get('/login',function(req,res){
        res.render('login.ejs',{message:req.flash('loginMeassage')});
    });

    router.get('/signup',function(req,res){
        res.render('signup.ejs',{message:req.flash('signupMeassage')});
    });

    router.get('/profile/:username',function(req,res){
        var USER = req.params.username;
        //console.log(req.params.username);
        res.render('profile.ejs',{user:USER});
    });

    router.get('/logout',function(req,res){
        req.logout();
        res.redirectTo('/');
    });
    
    router.post('/profile/:username',function(req,res){
        var ques = req.body.Question;
        var que = new question();
        que.question = ques;
        que.save(function(err,que){
            if(err)
            res.status(500).send("Question not posted");
            else console.log(que);
        });

    });

    router.post('/signup',function(req,res){
        
        //console.log(req.body);
        var username = req.body.username;
        var email = req.body.email;
        var password = req.body.password;
        
        req.checkBody('username','Name is required').notEmpty();
        req.checkBody('email','Email is required').notEmpty();
        req.checkBody('email','Email is not valid').isEmail();
        req.checkBody('password','Password is required').notEmpty();
        var errors = req.validationErrors();

        if(errors){
            res.render('signup.ejs',{message:"Empty Details"});
        }
        else{

            User.findOne({username:username,email:email},function(err,doc){
                if(err)  
                  res.status(500).send('error occured ');
                if(doc){
                    res.status(500).send('User already exists');
                }  
                else{
                    var user = new User();
                    user.username = username;
                    user.email = email;
                    user.password = password
                    user.save(function(err,user){
                        if(err) 
                        res.status(500).send('database error');
                        else
                        res.render('login.ejs',{message:user});
                    });
                    
                }
            });
            
        }
                 
    });
    router.get('/success', (req, res) => res.send("Welcome "+req.query.username+"!!"));
    router.get('/error', (req, res) => res.send("error logging in"));

    router.post('/login',function(req,res){
        var Username = req.body.Username;
        //console.log(Username);
        var password = req.body.password;
        //console.log(password);
       /* req.checkBody('username','Name is required').notEmpty();
        req.checkBody('password','Password is required').notEmpty();
        var errors = req.validationErrors();
        if(errors){
            res.send("error");
            //res.render('login.ejs',{message:errors});
        }
*/
        User.findOne({username:Username},function(err,user){
            if(err)  
            res.send('error occured ');
            else if(user){
                if(user.password == password){
                    //res.status(200);
                    res.redirect('/profile/'+Username);
                }
                else res.render('/login');
            }
            else res.send("User does not exists ");
        })
    });
    /*
        function isloggedin(req,res,next){
        if(req.isAuthenticated())
        return next;
        else
        res.redirectTo('/');
    }
    */
    return router;
};