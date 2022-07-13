const mongoose=require('mongoose');

const primarySkillsSchema=mongoose.Schema({
  name:{type:String,required:true},
  userID:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true}
});

module.exports=mongoose.model('PrimarySkills',primarySkillsSchema);
