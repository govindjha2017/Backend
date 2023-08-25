const mongoose = require('mongoose');
const Review = require('./review');
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
    },
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Review'
        }
    ],
    avgrating:{
        type:Number
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }

});

const Products = mongoose.model('Products', productSchema);

module.exports = Products;