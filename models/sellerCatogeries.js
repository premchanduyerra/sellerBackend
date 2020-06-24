const mongoose = require('mongoose');

const SellerCatogeries = new mongoose.Schema({
    category:String,
   subCategory:[String]
   
   
});
module.exports= mongoose.model("sellerCatogery", SellerCatogeries);