const Expertise=require('../models/expertise')

exports.addExpertise=(req,res,next)=>{
  const expertise=new Expertise({
    userID:req.body.userID,
    title:req.body.title,
    desc:req.body.desc,
    icon:req.body.icon,
    color:req.body.color,
  });
  expertise.save().then(createdExpertise=>{
    res.status(201).json({
      message:'Expertise added successfully',
      expertiseId:createdExpertise._id
    })
})
}

exports.getExpertise=(req,res,next)=>{
  Expertise.find({userID:req.params.userId}).then(data=>{
    if(data){
      res.status(200).json(data)
    }else{
      res.status(404).json({message:'Expertise does not exist'})
    }
  })
}
exports.deleteExpertise=(req,res,next)=>{
  Expertise.deleteOne({_id:req.params.id} ).then((result)=>{
    if(result.deletedCount>0){
      res.status(200).json({message:`Expertise deleted`});
    }
    else{
      res.status(401).json({message:"not authorized"});
    }
  })
  }
