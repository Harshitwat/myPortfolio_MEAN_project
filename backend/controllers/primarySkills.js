const PrimarySkills=require('../models/primarySkills')

exports.addPrimarySkills=(req,res,next)=>{
  const ps=new PrimarySkills({
    userID:req.body.userID,
    name:req.body.name
  });
  ps.save().then(createdSkill=>{
    res.status(201).json({
      message:'skill added successfully',
      psId:createdSkill._id
    })
})
}

exports.getPrimarySkills=(req,res,next)=>{
  PrimarySkills.find({userID:req.params.userId}).then(data=>{
    if(data){
      res.status(200).json(data)
    }else{
      res.status(404).json({message:'Primar skills does not exist'})
    }
  })
}
exports.deletePS=(req,res,next)=>{
  PrimarySkills.deleteOne({_id:req.params.id}).then((result)=>{
    if(result.deletedCount>0){
      res.status(200).json({message:`PS deleted`});
    }
    else{
      res.status(401).json({message:"not authorized"});
    }
  })
  }
