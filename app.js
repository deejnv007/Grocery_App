const express = require("express");
const app = express();
const path = require("path");
const bcrypt = require("bcrypt");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded ({extended : false}));

app.use(express.static(path.join(__dirname,'public')));

const Register = require("./conn.js");
const { dirname } = require("path");

const port  = process.env.PORT || 3000;
app.get("/", (req, res)=> {
  res.sendFile(__dirname+"/public/login.html");
})

app.post("/signup",(req,res)=>{
  
  password = req.body.spassword;
  confirmpassword = req.body.scpassword;
  if(password == confirmpassword){
  const myDetail=new Register({
    email:req.body.semail,
    password:bcrypt.hashSync(req.body.spassword, 10),
    confirmpassword:bcrypt.hashSync(req.body.scpassword, 10)

  })
   myDetail.save();
   res.sendFile(__dirname+"/public/login.html");
}
 else 
 {
  res.send("Plz enter the same password!");
 }
})

app.post("/login",async(req,res)=>{
  var email=req.body.lemail;
  var password=req.body.lpassword;
  var user= await Register.findOne({email:email});
  if(bcrypt.compareSync(password, user.password)){
    res.sendFile(__dirname+"/public/frontpage.html");
  }
  else{
    res.send("plzz enter valid data!!!");
  }
})

app.listen(port, () => {
    console.log(`server is running on ${port}`);
})
