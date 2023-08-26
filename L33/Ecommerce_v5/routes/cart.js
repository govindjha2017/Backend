const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../middilware');
const User = require('../models/user');
router.get('/user/cart',isLoggedIn,async (req,res)=>{
  const userId = req.user._id;
  const user = User.findById(userId);

  res.render('cart/cart',{cart:user.cart});
})





module.exports = router;