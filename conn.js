const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/store",{
    useNewUrlParser : true,
    useUnifiedTopology : true
})
.then( () => { console.log("Connection successfull...");
})
.catch( (err) => {
    console.log(err);
});


const registerSchema = new mongoose.Schema({
    
  
    email : {
        type: String,
        require: true,
        unique: true    
    },
    
    password : {
        type: String,
        require: true
        
    },
    confirmpassword :{
        type: String,
        require: true
        
    }
   
  })
  
  const Register = new mongoose.model("Register", registerSchema);
  module.exports = Register;