const express=require('express');
const checkAuth =require(`../middleware/check-auth`);
const router=express.Router();
const ExpertiseController=require('../controllers/expertise')

router.post('',checkAuth,ExpertiseController.addExpertise);
router.get('/:userId',ExpertiseController.getExpertise)
router.delete('/:id',ExpertiseController.deleteExpertise);



module.exports=router;
