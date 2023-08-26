const Product = require('./models/product');

module.exports.isLoggedIn = async (req,res,next)=>{
    if(req.xhr && !req.isAuthenticated()){
        return res.status(401).json({
            msg:'Plz login first'
        })
    }

    if (!req.isAuthenticated()) {
        req.flash('error', 'Please LogIn first!!');
        return res.redirect('/login');
    }
    next();
}

module.exports.isSeller = async (req,res,next)=>{
    if(req.user && req.user.role==='buyer'){
        req.flash('error','You are not authorized to do that!!');
        return res.redirect('back');
    }
    next();
}

module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id).populate('author');

    if(!product.author || product.author._id.toString() !== req.user._id.toString()){
        req.flash('error', 'you are not authorized to do that');
        return res.redirect('back');
    }
    next();
}