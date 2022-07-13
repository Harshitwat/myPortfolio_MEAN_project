const Skill=require('../models/skills')

exports.addSkill=(req,res,next)=>{
  const skill=new Skill({
    userID:req.body.userID,
    name:req.body.name,
    percent:req.body.percent,
    color:req.body.color,
  });
  skill.save().then(createdSkill=>{
    res.status(201).json({
      message:'Skill added successfully',
      skillId:createdSkill._id
    })
})
}

exports.getSkill=(req,res,next)=>{
  Skill.find({userID:req.params.userId}).then(data=>{
    if(data){
      res.status(200).json(data)
    }else{
      res.status(404).json({message:'Skill does not exist'})
    }
  })
}
exports.deleteSkill=(req,res,next)=>{
  Skill.deleteOne({_id:req.params.id}).then((result)=>{
    if(result.deletedCount>0){
      res.status(200).json({message:`Skill deleted`});
    }
    else{
      res.status(401).json({message:"not authorized"});
    }
  })
  }
