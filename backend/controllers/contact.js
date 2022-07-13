const Contact=require('../models/contact')

exports.add=(req,res,next)=>{
  const contact=new Contact({
    userID:req.body.userID,
    email:req.body.email,
    phoneNumber:req.body.phoneNumber,
    address:req.body.address
  });
  contact.save().then(created=>{
    res.status(201).json({
      message:'Contact added successfully',
      contactId:created._id
    })
})
}

exports.get=(req,res,next)=>{
  Contact.find({userID:req.params.id}).then(data=>{
    if(data){
      res.status(200).json(data)
    }else{
      res.status(404).json({message:'contact does not exist'})
    }
  })
}
exports.edit=(req,res,next)=>{
const contact=new Contact({
    _id:req.body._id,
    userID:req.body.userID,
    email:req.body.email,
    address:req.body.address,
    phoneNumber:req.body.phoneNumber
})
Contact.updateOne({ _id:req.body._id,userID:req.body.userID},contact).then(result=>{
  if(result.matchedCount>0){
    res.status(200).json({message:`Contact updated`});
  }
  else{
    res.status(401).json({message:"not authorized"});
  }
})
}

exports.delete=(req,res,next)=>{
  Contact.deleteOne({_id:req.params.id} ).then((result)=>{
    if(result.deletedCount>0){
      res.status(200).json({message:`contact deleted`});
    }
    else{
      res.status(401).json({message:"not authorized"});
    }
  })
  }
