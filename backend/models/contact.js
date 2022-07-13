const mongoose=require('mongoose');

const contactSchema=mongoose.Schema({
  email:{type:String,required:true},
  address:{type:String,required:true},
  phoneNumber:{type:Number,required:true},
  userID:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true}
});

module.exports=mongoose.model('Contact',contactSchema);
