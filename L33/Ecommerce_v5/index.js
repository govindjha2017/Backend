const express = require('express');
const app = express();
const path = require('path');

const session = require('express-session');
const flash = require('connect-flash');

app.use(express.static(path.join(__dirname, 'public')));

const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/E-Commerce')
    .then(() => { console.log('E-Commerce DB connected!') })
    .catch((err) => console.log(err));

app.use(session({
    secret: 'weneedbettersecret',
    resave: false,
    saveUninitialized: true,
}))
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next)=>{
    res.locals.login = req.isAuthenticated();
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    next();
})

app.get('/',(req,res)=>{
    res.send('working fine');
})

 //-----------routes
 const methodOverride = require('method-override');
 app.use(methodOverride('_method'));
  const productRoutes = require('./routes/product');
  const reviewRoutes = require('./routes/review');
  const authRoutes = require('./routes/auth');

// -------------- APIs
const productAPI = require('./routes/api/productapi');


  app.use(productRoutes);
  app.use(reviewRoutes);
  app.use(authRoutes);
  app.use(productAPI);


const port = 4000;
app.listen(port,()=>{
    console.log('server up at port',port);
})