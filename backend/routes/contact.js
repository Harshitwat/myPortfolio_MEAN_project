const express=require('express');

const router=express.Router();
const checkAuth =require(`../middleware/check-auth`);
const Controller=require('../controllers/contact')

router.post('',checkAuth,Controller.add)

router.put('/:id',checkAuth,Controller.edit)

router.get('/:id',Controller.get);
router.delete('/:id',Controller.delete);

module.exports=router;
