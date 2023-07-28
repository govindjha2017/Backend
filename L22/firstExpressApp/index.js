const express = require('express');
const app= express();


const movies = [
    {
        name: 'Batman',
        rating: 7.8,
        language: 'English, Hindi'
    },

    {
        name: 'Hangover',
        rating: 9,
        language: 'Hindi, English'
    },

    {
        name: 'SuperMan',
        rating: 8.8,
        language: 'English'
    },

    {
        name: 'Man of Steel',
        rating: 8,
        language: 'English'
    }

]



app.get('/',(req,res)=>{
    res.send("HOME PAGE");
})

// app.get('/cat',(req,res)=>{
//     res.send("MEOOOOOOOOOOWW  part1");
// })

app.get('/cat',(req,res)=>{
    res.send("MEOOOOOOOOOOWW");
})

app.get('/user',(req,res)=>{
    res.send("You are the user.");
})


app.get('/getData',(req,res)=>{
    const { name } =req.query;
    console.log(req.query);
    let arr =[];
    for(let movie of movies){
        if(movie.name === name){
            arr.push(movie);
        }
    }
    res.json(arr);
})

app.get('/r/:username/:password',(req,res)=>{
    const {username,password}=req.params;

    console.log(req.params);
    req.send(`your username is ${username}, your password is, ${password}`);
    
})



app.get('*',(req,res)=>{
    //     res.send('404 NOT FOUND!!')
            res.status(404).send('404 NOT FOUND!!')
})


app.listen(4000,()=>{
    console.log("server is up at port",4000);
})