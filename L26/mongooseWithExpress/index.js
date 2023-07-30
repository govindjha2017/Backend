const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));

const mongoose = require('mongoose');
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

mongoose.connect('mongodb://127.0.0.1:27017/myDB')
    .then(() => { console.log('myDB connected!') })
    .catch((err) => console.log(err));

const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    contact: Number
});

const User = mongoose.model('User', userSchema);

    
app.get('/',(req,res)=>{
    res.render('home');
})

app.get('/users',async (req,res)=>{
    const users = await User.find({});
    res.render('users',{users});
})

app.get('/users/new',(req,res)=>{
    res.render('new');
})

app.post('/users',async (req,res)=>{
     
    await User.create({
        name:req.body.name,
        age: req.body.age,
        email: req.body.email,
        contact: req.body.contact
    }).then(()=>{console.log('created suceefully')})

    res.redirect('/users');
})

app.get('/users/:id', async (req,res)=>{
    const { id }=req.params;
    // console.log(id);
    const user = await User.findById(id);
    // console.log(user);
    res.render('show',{user});
    // res.send("hii !!!!!!!")
})

app.get('/users/:id/edit', async (req,res)=>{
    const { id }=req.params;
    // console.log(id);
    const user = await User.findById(id);
    res.render('edit',{user});
})  

app.patch('/users/:id', async (req,res)=>{
    // res.send("ok");
    const { id } = req.params;
    const { name , age , email , contact} = req.body;
   await User.updateOne({_id:id},{name,age,email,contact});

    res.redirect('/users');
})

app.delete('/users/:id', async (req,res)=>{
    const { id } = req.params;
    await User.deleteOne({_id:id});
    res.redirect('/users');
})

const port = 4000;
app.listen(port,()=>{
    console.log('server up at port ',port);
})