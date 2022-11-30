const express=require("express")
const Model=require('../models/Model');
const router=express.Router();
router.post('/post',async(req,res)=>{
    try{
   await Model.insertMany(req.body)
   console.log(Model)
    }
    catch(err){
        console.log(err);
        res.send(err);
    }
})
router.get('/get',async(req,res)=>{
    try{
        res.send(Model.find())
    }
    catch(err){res.send(err)}
})
module.exports = router ;
