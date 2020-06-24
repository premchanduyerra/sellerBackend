const mongoose = require('mongoose');

const sellerProductSchema = new mongoose.Schema({
    sellerId: String,
    category:String,
    subCategory:String,
    productName: String,
    productType:String,
    type:String,
    img1Url:String,
    img2Url:String,
    img3Url:String,
    FixedPrice:Number,
    monthlyRent:Number,
    gst:Number
});
module.exports= mongoose.model("sellerProduct", sellerProductSchema);
