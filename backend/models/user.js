const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
  firstName:{type:String,required:true},
  lastName:{type:String,required:true},
  designation:{type:String,required:true},
  location:{type:String,required:true},
  about:{type:String},
  pImage:{type:String,required:true},
  cImage:{type:String,required:true},
  cvLink:{type:String,required:true},
  creator:{type:mongoose.Schema.Types.ObjectId,ref:"Auth",required:true}
});

module.exports=mongoose.model('User',userSchema);
