const express = require('express');
const app = express();
const path = require('path');
const port = 5000;
const  productsData = require('./data/products');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));




app.get('/',(req,res)=>{
    res.render('home');
})
app.get('/random',(req,res)=>{
    const randomNumber = Math.floor(Math.random()*10);
    res.render('random',{randomNumber});
})
app.get('/login', (req, res)=>{
    res.render('login')
})

app.get('/products',(req,res)=>{
   // res.json(productsData);
   res.render('product',{
    products : productsData
   })
})

app.listen(port,()=>{
    console.log('Server is Up at Port ', port);
});