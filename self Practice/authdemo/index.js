const express= require('express');
const app= express();
const path= require('path');

const session = require('express-session');

const bcrypt = require('bcrypt');

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  }))

app.use(express.urlencoded({extended:true}));

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/authdemo')
    .then(()=>{
        console.log('authdemo DB conected');
    })
    .catch((err)=>{
        console.log(err);
    })

const User = require('./models/user');

app.get('/',(req,res)=>{
    res.send('working fine');
})

app.get('/home',(req,res,next)=>{
    if(!req.session.username){
       return res.redirect('login');
    }
    next();
},(req,res)=>{
    res.render('home');
})

app.get('/signup',(req,res)=>{
    res.render('signup');
})


app.post('/signup',async(req,res)=>{
    var {username,email,password} = req.body;
    const user = await User.findOne({username});
    const hashPassword =await bcrypt.hash(password, 10);
    password=hashPassword;
    if(!user){
        await User.create({email,password,username});
        res.redirect('/login');
    }
    else{
        res.send('username exist');
    }
})

app.get('/login',(req,res)=>{
    res.render('login');
})

app.post('/login',async(req,res)=>{
    const {username ,password} = req.body;
    const user = await User.findOne({username});
    if(user){
        // if(user.password==password){
        //     req.session.username = username;
        //     res.redirect('/home');
        // }
        var hash= await user.password;
        const isValid = await bcrypt.compare(password, hash);
        console.log(isValid);
        if(isValid){
            req.session.username = username;
            res.redirect('/home');
        }
        else{
            res.send('Incorect password Try again!!');
        }
    }
    else{
        res.redirect('/signup');
    }
})

app.post('/logout',(req,res)=>{
    console.log('hello');
    req.session.destroy();
    res.redirect('/login')
})

app.get('*',(req,res)=>{
    res.send('404 page not found');
})


const port=5000;
app.listen(port,()=>{
    console.log('server up at port',port);
})