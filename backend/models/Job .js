const mongoose=require("mongoose");
const Schema=mongoose.Schema
const jobSchema=new Schema({
title:{
    type:String,
    required:true
},
description:{
    type:String,
    required:true
},
//skills
requirements:[{
    type:String
}],
salary:{
    type:Number,
    required:true
},
location:{
type:String,
   
},
jobType:{
    type:String,
    required:true
},
positions:{
    type:Number
},
experienceLevel:{
    type:Number,
    required:true

},
//number of companies which provide job
company:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Company",
    required:true
},
//User who had created the job
created_by:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
},
//In case when application will be submitted
applications:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Application"
}
    
]
} , {timeStamps:true});
module.exports=mongoose.model("Job" , jobSchema)