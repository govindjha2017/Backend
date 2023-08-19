const express = require('express');
const app = express();
const path = require('path');


app.use(express.static(path.join(__dirname, 'public')));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/E-Commerce')
    .then(() => { console.log('E-Commerce DB connected!') })
    .catch((err) => console.log(err));



app.get('/',(req,res)=>{
    res.send('working fine');
})

 //-----------routes
 const methodOverride = require('method-override');
 app.use(methodOverride('_method'));
  const productRoutes = require('./routes/product');
  const reviewRoutes = require('./routes/review');

  app.use(productRoutes);
  app.use(reviewRoutes);


const port = 4000;
app.listen(port,()=>{
    console.log('server up at port',port);
})