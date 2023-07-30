const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/myDB')
    .then(()=>{
        console.log('myDB conected');
    })
    .catch((err)=>{
        console.log(err);
    })

const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    contact: Number
})

const User = mongoose.model('User',userSchema);

//--------------  CREATE

// const newUser = new User({
//     name:'govind',
//     age: 23,
//     email: 'govindkumar@gmail.com',
//     contact: 46238
// })
// newUser.save()
//     .then((data)=>{console.log(data)});


// User.create({
//     name: 'gaurav',
//     age: 21,
//     email: 'gaurav@yahoo.com',
//     contact: 4365287421
// }).then((data)=>{
//     console.log("document created suceesfully");
// })

//------------ READ
// User.find({name:'gaurav'})
//     .then(data=>console.log(data));

//----------- UPDATE
// User.updateOne({name:'govind'},{email:'govindkumar123@gmail.com'})
//     .then(data=>console.log(data));

// User.updateMany({name:'govind'},{email:'govindkumarjha2023@gmail.com'})
//     .then(data=>console.log(data));

//----------- DELETE
// User.deleteOne({name:'govind'})
//     .then(data=>{console.log('data deleted successfully !')});
// User.deleteOne({})
//     .then(data=>{console.log('data deleted successfully !')});
// User.deleteMany({})
//     .then(()=>{console.log('data deleted succesfully')});


User.findById('64c597aab1d5d112e79f70fa')
    .then(data => console.log(data));


app.get('/',(req,res)=>{
    const users = user.find({});
    res.render('index',{users});
})


const port =4000;
app.listen(port,()=>{
    console.log('server up at port',port);
})