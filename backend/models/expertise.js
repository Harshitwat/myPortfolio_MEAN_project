const mongoose=require('mongoose');

const expertiseSchema=mongoose.Schema({
  title:{type:String,required:true},
  desc:{type:String,required:true},
  icon:{type:String,required:true},
  color:{type:String,required:true},
  userID:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true}
});

module.exports=mongoose.model('Expertise',expertiseSchema);
