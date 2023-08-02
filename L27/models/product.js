const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type:String,
        trim:true,
        required:true
    },
    image:{type: String},
    price:{
        type:Number,
        required:true,
        min:0
    },
    desc:{
        type:String
    }

});

const Products = mongoose.model('Products', productSchema);

module.exports = Products;