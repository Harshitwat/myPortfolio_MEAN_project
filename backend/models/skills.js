const mongoose=require('mongoose');

const skillsSchema=mongoose.Schema({
  name:{type:String,required:true},
  percent:{type:String,required:true},
  color:{type:String,required:true},
  userID:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true}
});

module.exports=mongoose.model('Skills',skillsSchema);
