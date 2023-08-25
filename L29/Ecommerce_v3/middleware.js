const { productSchema } = require('./joiSchema');

module.exports.validateProduct = async (req,res,next)=>{
    const {name , image , price , desc } = req.body;
    const {error} = await productSchema.validate({name , image , price , desc });

    if(error){
        const msg = error.message;
        res.render('error',{err:msg});
    }

    next();
}