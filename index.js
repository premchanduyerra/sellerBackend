const express = require("express");
const bodyParser = require("body-parser");
const mongoose=require("mongoose");



const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
var db=mongoose.connect("mongodb+srv://admin123:admin123@cluster0-0tqob.mongodb.net/sellerProductsDB", { useNewUrlParser: true , useUnifiedTopology: true},function(err){
    if(!err){
        console.log("connected with database");
        
    }else{
        console.log(err);
        
    }
});
var sellerId="";
var selectedCategory="";
var selectedSubCategory="";
//.........SellerCatogeries...............
var SellerCatogeries=require("./models/sellerCatogeries.js");
//.........SellerCatogeries...............
var sellerProducts=require("./models/sellerProducts");

const chatSchema=new mongoose.Schema({
    username:String,
    message:String
    });
    
    const Chat=mongoose.model("chat",chatSchema);
    const prem=new Chat({
        username:"sai",
        message:"hey prem"
    });
    

app.post("/login",function(req,res){
    sellerId=req.body.username;
    res.redirect("/categories");
    
    
});

//............catogeries........................
app.get("/categories",(req,res)=>{
SellerCatogeries.find({},function(err,data){
        if(err){
            console.log(err);
        }
        else{
          //  console.log(data);
            res.render("categories",{data:data});
        }
    });
});
//.............subCategories..................
app.post("/subCategories",function(req,res){
console.log(req.body);
selectedCategory=req.body.category;
res.redirect("/subCategories");

});

app.get("/subCategories",(req,res)=>{
    
    SellerCatogeries.find({category:selectedCategory},function(err,data){
            if(err){
                console.log(err);
            }
            else{
               console.log(data[0]);
               res.render("subCategories",{data:data[0]});
            }
        });
    });
    
//...............product Info..................
app.post("/productInfo",(req,res)=>{
    selectedSubCategory=req.body.subCategory;
res.redirect("/productInfo");
});
app.get("/productInfo",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

    app.get("/",function(req,res){
        res.sendFile(__dirname+"/login.html");
    });
//................products......................

app.post("/products",(req,res)=>{
   console.log(req.body);
let inputGst="";
if(req.body.gst === ""){
    inputGst=0;
}else{
    inputGst=req.body.gst;
}

   let p=new sellerProducts({
    sellerId: sellerId,
    category:selectedCategory,
    subCategory:selectedSubCategory,
    productName: req.body.productName,
    productType:req.body.productType,
    type:req.body.type,
    img1Url:req.body.image1,
    img2Url:req.body.image2,
    img3Url:req.body.image3,
    FixedPrice:req.body.FixedPrice,
    monthlyRent:req.body.monthlyRent,
    gst:inputGst
   });
   p.save(function(err){
       if(err){
           console.log(err);
           
       }
       else{
           res.redirect("/products");
           
       }
   });
});

app.get("/products",function(req,res){
    res.send("product is added")
});


app.listen(process.env.PORT || 3000, function (req, res) {
    console.log("the server is running at 3000");
});








