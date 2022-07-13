const mongoose=require('mongoose');

const projectSchema=mongoose.Schema({
  title:{type:String,required:true},
  link:{type:String},
  userID:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true}
});

module.exports=mongoose.model('Project',projectSchema);
