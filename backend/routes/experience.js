const express=require('express');
const checkAuth =require(`../middleware/check-auth`);
const router=express.Router();
const Controller=require('../controllers/experience')

router.post('',checkAuth,Controller.add);
router.get('/:userId',Controller.get)
router.delete('/:id',Controller.delete);



module.exports=router;
