const express= require('express');
const app = express();
const path= require('path');

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.urlencoded({extended:true}));


const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/test3');


const User = require('./models/user');

const session = require('express-session');
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  }))

app.get('/',(req,res)=>{
    res.send('working fine');
    
})
app.get('/home',(req,res,next)=>{
    if(!req.session.user_id){
       return res.redirect('/login');
    }
    next();
},(req,res)=>{
    // if(localStorage.getItem("login")=='true'){
    //     res.render('home');
    // }
    // else{
    //     res.send('pahle login kar')
    // }
  
    res.render('home');
})

app.get('/signup',async(req,res)=>{
    
    res.render('signup');

})

app.post('/signup',(req,res)=>{
    const{username,email,password} = req.body
    User.create({username,email,password});
    res.redirect('/login');
})

app.get('/login',(req,res)=>{
    
  res.render('login');
})

app.post('/login',async(req,res)=>{
    const{username,password}=req.body;

    const user= await User.findOne({username});
    if(password===user.password){
        // localStorage.setItem("login", "true");
        req.session.user_id=user._id;
         
        res.redirect('/home');
    }
    else{
        res.send('something went wrong!!');
    }
    console.log(user);

})

const PORT=5000;
app.listen(PORT,()=>{
    console.log('server up at port',PORT);
})