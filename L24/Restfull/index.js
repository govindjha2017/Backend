const express = require('express');
const app = express();
const port = 5000;
const path = require('path');
const methodOverride = require('method-override');


app.use(express.urlencoded({extended : true}));
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/',(req,res)=>{
    // res.send('working');
    res.render('home');
})
const users = require('./data/users');

app.get('/users',(req,res)=>{
    res.render('users',{users});
})

app.post('/users',(req,res)=>{
    // res.send("submited");
    const {username, age , password, adress}  = req.body;
    // console.log(req.body);
    
    let id = users.length+1;

    const temp ={
        id: id,
        username: username,
        password:password,
        age: age,
        adress: adress
    }
    users.push(temp);

    // res.send(users);
    res.redirect('/users')
})

app.get('/users/new',(req,res)=>{
    res.render('new');
})

app.get('/users/:id',(req,res)=>{
    const {id}= req.params;

    const user = users.find((user)=>{
        return user.id == id;
    })

    res.render('show',{ user });
})

app.get('/users/:id/edit',(req,res)=>{
    const {id}= req.params;
    const user = users.find(user => user.id==id);

    res.render('edit',{user});
})

app.patch('/users/:id',(req,res)=>{
    const {id}= req.params;
    const { username , password , age , address} = req.body;

    const user = users.find(user => user.id == id);

    user.username= username;
    user.password= password;
    user.age = age;
    user.address = address;

    res.redirect('/users');
})

app.delete('/users/:id',(req,res)=>{
    const {id}= req.params;
    const user = users.find(user => user.id == id);

    const index = users.indexOf(user);

    users.splice(index,1);

    res.redirect('/users');

})

app.listen(port,()=>{
    console.log('work at port ',port);
})