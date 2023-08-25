const express = require('express');
const router = express.Router();

const Product = require('../models/product');
const review = require('../models/review')

const {isLoggedIn , isSeller , isAuthor} = require('../middilware');

router.get('/products', async (req,res)=>{
    const products = await Product.find({});

    res.render('products/index',{ products });
})

router.get('/products/new',isLoggedIn,isSeller,(req,res)=>{
    res.render('products/new');
})
router.use(express.urlencoded({extended:true}));

router.post('/products',isLoggedIn,isSeller,async (req,res)=>{
    console.log('kjren');
    const { name , image , price , desc} = req.body;
    await Product.create({name,image,price,desc});
    req.flash('success','successfully added product')
    res.redirect('/products');
})

router.get('/products/:id/edit',isLoggedIn,isSeller,isAuthor,async (req,res)=>{
    try{
     const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/edit',{ product });
    }
    catch (e){
        res.render('err', {err:e.message});

    }
    
})

router.patch('/products/:id',isLoggedIn,isSeller,isAuthor,async (req,res)=>{
    const { id } = req.params;
    const { name , image , price , desc} = req.body;

    await Product.findByIdAndUpdate(id,{name , image , price , desc});

    req.flash('success','successfully edit product')
    res.redirect(`/products/${id}`);
})

router.get('/products/:id/delete',isLoggedIn,isSeller,isAuthor, async (req,res)=>{
    const { id } = req.params;

    await Product.findByIdAndDelete(id);
    res.redirect('/products');
})

router.get('/products/:id',async (req,res)=>{
    const { id } = req.params;
    const product = await Product.findById(id).populate("reviews");

    res.render('products/show',{ product  });
})




module.exports = router;