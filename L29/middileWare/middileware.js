const express = require('express');
const app = express();

checkPass  = (req,res,next)=>{
    let password = req.params.pass;
    if(password==='abcd'){
     next();
    }
    res.send('you are not authorized');
 }

app.get('/:pass',checkPass,(req,res)=>{
    res.send('THIS IS TOP SECRET');
})

const port =4000;
app.listen(port,()=>{
    console.log('server up at port ',port);
})