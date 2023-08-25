const express= require('express');
const router = express.Router();
const Product= require('../models/product');
const Review = require('../models/review');

const {isLoggedIn} = require('../middilware');

router.post('/products/:productId/review',isLoggedIn,async (req,res)=>{
    const {productId}=req.params;
    let {rating,comment}=req.body;
    rating=+rating;
    const product = await Product.findById(productId);
    // console.log(req.isAuthenticated());
    // console.log(product.avgrating);
    let avgrating;
    if(product.avgrating==undefined){
       avgrating=0;
    }
    else{
        avgrating= product.avgrating;
    }
    let count = product.reviews.length;
    avgrating =+((avgrating*count)+rating)/(count+1);
    
    const newReview = await Review.create({rating, comment});
    await Product.findByIdAndUpdate(productId,{avgrating});
     product.reviews.push(newReview);
    product.save();
  
    req.flash('success', 'Successfully added your review!');
    res.redirect('back');
})

router.get('/product/:productId/:reviewId/review/delete',isLoggedIn, async (req,res)=>{
    const {productId,reviewId}=req.params;
    const product = await Product.findById(productId);
    const review = await Review.findById(reviewId);

    let count = product.reviews.length;
   
    let rating= +review.rating;
    let y= rating/count;
    console.log(y);
    let avgrating= +product.avgrating;
    if(avgrating!=undefined){
        avgrating=avgrating-y;
        if(count==1){
          avgrating=0;
        }
        else{
            avgrating=(avgrating*count)/(count-1);
        }
    }
    
    await Product.findByIdAndUpdate(productId,{avgrating});

    let n=product.reviews.indexOf(review._id);
    await Review.findByIdAndDelete(reviewId);
    product.reviews.splice(n,1);
    product.save();
    res.redirect('back');
 
})

module.exports = router;