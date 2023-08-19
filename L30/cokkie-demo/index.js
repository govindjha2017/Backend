const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
app.use(cookieParser('govind'));


app.get('/',(req,res)=>{
    res.send('working fine');
})

// app.get('/buyIphone',(req,res)=>{
// res.cookie('price',40000);
// res.send('You purchased Iphone');
// })

// app.get('/buyEarbuds',(req,res)=>{
// let discountPrice= 10000;
// const {price}=req.cookies;
// if(price>=50000){
//     earbudsprice=price-discountPrice;
//     res.cookie('price',earbudsprice);
//     res.send('offer available');
// }
// else{
//     res.send('offer not available');
// }
// })

// app.get('/setcookie',(req,res)=>{
//     res.cookie('name','govind kumar jha');
//     res.send('cookie set');
// })
// app.get('/getcookie',(req,res)=>{
//     const {name}= req.cookies;
//     res.send(`name is ${name}`);
// })

app.get('/buyIphone',(req,res)=>{
    res.cookie('price',45000,{signed:true});
    res.send('You have purchased Iphone');
});

app.get('/buyEarbuds',(req,res)=>{
    const {price}= req.signedCookies;
    //console.log(req.signedCookies);
    console.log(req.signedCookies.price);
    let discountprice =10000;
    if(price>=50000){
        earbudsprice = price -discountprice;
        res.cookie('price',earbudsprice);
        res.send('purchased earbuds');
    }
    else{
        res.send('You have not spent emough money');
    }
})

const port = 4000;
app.listen(port,()=>{
    console.log('server up at port',port);
})