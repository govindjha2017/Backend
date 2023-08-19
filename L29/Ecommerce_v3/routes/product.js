const express = require('express');
const router = express.Router();

const Product = require('../models/product');
const review = require('../models/review')

router.get('/products', async (req,res)=>{
    const products = await Product.find({});

    res.render('products/index',{ products });
})

router.get('/products/new',(req,res)=>{
    res.render('products/new');
})
router.use(express.urlencoded({extended:true}));

router.post('/products',async (req,res)=>{
    const { name , image , price , desc} = req.body;
    await Product.create({name,image,price,desc});
    res.redirect('/products');
})

router.get('/products/:id/edit',async (req,res)=>{
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/edit',{ product });
})

router.patch('/products/:id',async (req,res)=>{
    const { id } = req.params;
    const { name , image , price , desc} = req.body;

    await Product.findByIdAndUpdate(id,{name , image , price , desc});
    res.redirect(`/products/${id}`);
})

router.get('/products/:id/delete', async (req,res)=>{
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