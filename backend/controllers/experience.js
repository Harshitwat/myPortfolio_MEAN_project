const Experience=require('../models/experience')

exports.add=(req,res,next)=>{
  const experience=new Experience({
    userID:req.body.userID,
    title:req.body.title,
    desc:req.body.desc,
    startDate:req.body.startDate,
    endDate:req.body.endDate,
  });
  experience.save().then(createdExperience=>{
    res.status(201).json({
      message:'Education added successfully',
      experienceId:createdExperience._id
    })
})
}

exports.get=(req,res,next)=>{
  Experience.find({userID:req.params.userId}).then(data=>{
    if(data){
      res.status(200).json(data)
    }else{
      res.status(404).json({message:'experience does not exist'})
    }
  })
}
exports.delete=(req,res,next)=>{
  Experience.deleteOne({_id:req.params.id} ).then((result)=>{
    if(result.deletedCount>0){
      res.status(200).json({message:`experience deleted`});
    }
    else{
      res.status(401).json({message:"not authorized"});
    }
  })
  }
