const express= require('express');
const router = express.Router();
const Product= require('../models/product');
const Review = require('../models/review');


router.post('/products/:productId/review',async (req,res)=>{
    const {productId}=req.params;
    const {rating,comment}=req.body;

    const newReview = await Review.create({rating, comment});
    const product = await Product.findById(productId);

    product.reviews.push(newReview);
     await product.save();
    // console.log('hjds');
    res.redirect('back');
})

router.get('/product/:productId/:reviewId/review/delete', async (req,res)=>{
    const {productId,reviewId}=req.params;
    const product = await Product.findById(productId);
    const review = await Review.findById(reviewId);
    let n=product.reviews.indexOf(review._id);
    await Review.findByIdAndDelete(reviewId);
    product.reviews.splice(n,1);
    product.save();
    res.redirect('back');
 
})

module.exports = router;