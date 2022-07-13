const mongoose=require('mongoose');

const experienceSchema=mongoose.Schema({
  title:{type:String,required:true},
  desc:{type:String,required:true},
  startDate:{type:String,required:true},
  endDate:{type:String,required:true},
  userID:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true}
});

module.exports=mongoose.model('Experience',experienceSchema);
