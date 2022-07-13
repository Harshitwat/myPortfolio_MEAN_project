const Project=require('../models/projects')

exports.add=(req,res,next)=>{
  const project=new Project({
    userID:req.body.userID,
    title:req.body.title,
    link:req.body.link
  });
  project.save().then(createdProject=>{
    res.status(201).json({
      message:'Project added successfully',
      projectId:createdProject._id
    })
})
}

exports.get=(req,res,next)=>{
  Project.find({userID:req.params.userId}).then(data=>{
    if(data){
      res.status(200).json(data)
    }else{
      res.status(404).json({message:'project does not exist'})
    }
  })
}
exports.delete=(req,res,next)=>{
  Project.deleteOne({_id:req.params.id} ).then((result)=>{
    if(result.deletedCount>0){
      res.status(200).json({message:`project deleted`});
    }
    else{
      res.status(401).json({message:"not authorized"});
    }
  })
  }
