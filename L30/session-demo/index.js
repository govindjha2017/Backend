const express = require('express');
const app = express();
const session = require('express-session');
app.use(session({
    secret:'asdf',
    resave: false,
    saveUninitialized: true
}));

app.get('/',(req,res)=>{
    res.send(req.session);
});
app.get('/setSession',(req,res)=>{
    req.session.name = 'Temp Name',
    req.session.mode = 'dark',
    res.send('session set');
});

const PORT= 4000;
app.listen(PORT,()=>{
    console.log('server up at port',PORT);
});