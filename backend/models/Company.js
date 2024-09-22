const mongoose=require("mongoose")
const Schema=mongoose.Schema
const companySchema= new Schema ({
name:{
    type :String ,
    required:true,
    unique:true

},
description:{
    type :String ,
    
},
location:{
    type :String ,
    
},
website:{
    type :String ,
    
},
logo:{
    type :String ,
    
},
userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    
}
}, {timeStamps:true});
module.exports=mongoose.model("Company" , companySchema);