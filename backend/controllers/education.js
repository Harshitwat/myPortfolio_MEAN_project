const Education=require('../models/education')

exports.add=(req,res,next)=>{
  const education=new Education({
    userID:req.body.userID,
    name:req.body.name,
    desc:req.body.desc,
    startDate:req.body.startDate,
    endDate:req.body.endDate,
  });
  education.save().then(createdEducation=>{
    res.status(201).json({
      message:'Education added successfully',
      educationId:createdEducation._id
    })
})
}

exports.get=(req,res,next)=>{
  Education.find({userID:req.params.userId}).then(data=>{
    if(data){
      res.status(200).json(data)
    }else{
      res.status(404).json({message:'Education does not exist'})
    }
  })
}
exports.delete=(req,res,next)=>{
  Education.deleteOne({_id:req.params.id}).then((result)=>{
    if(result.deletedCount>0){
      res.status(200).json({message:`Education deleted`});
    }
    else{
      res.status(401).json({message:"not authorized"});
    }
  })
  }
