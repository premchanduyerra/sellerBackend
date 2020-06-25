const express = require("express");
const bodyParser = require("body-parser");
const mongoose=require("mongoose");
const path =require("path");
const multer = require("multer");
//set storage engine....
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb){
      cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  
  // Init Upload
  const upload = multer({
    storage: storage,
    limits:{fileSize: 10000000},
    fileFilter: function(req, file, cb){
      checkFileType(file, cb);
    }
  }).any('image1','image2','image3');
  
  
  // Check File Type
  function checkFileType(file, cb){
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
  
    if(mimetype && extname){
      return cb(null,true);
    } else {
      cb('Error: Images Only!');
    }
  }


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

//.........SellerCatogeries...............
var sellerProducts=require("./models/sellerProducts");

    

app.post("/login",function(req,res){
    sellerId=req.body.username;
    res.redirect("/productInfo");
    
    
});

app.get("/productInfo",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

    app.get("/",function(req,res){
        res.sendFile(__dirname+"/login.html");
    });
//................products......................

app.post("/products",upload,(req,res)=>{
   console.log(req.body);
   console.log(req.files);
   
let inputGst="";
if(req.body.gst === ""){
    inputGst=0;
}else{
    inputGst=req.body.gst;
}

   let p=new sellerProducts({
    sellerId: sellerId,
    category:req.body.category,
    subCategory:req.body.subCategory,
    productName: req.body.productName,
    productType:req.body.productType,
    type:req.body.type,
    img1Url:req.files[0].path,
    img2Url:req.files[1].path,
    img3Url:req.files[2].path,
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








