const express=require("express")
const Model=require('../models/Model');
const router=express.Router();
router.post('/post',async(req,res)=>{
    try{
  result= await Model.insertMany(req.body)
  res.send({status:200,message:result});
    }
    catch(err){
        console.log(err);
        res.send({status:400,message:err.message});
    }
})
router.get('/post',async(req,res)=>{
   Model.find(({}),function(err,result){
    if(err)
    res.send({status:400,message:err.message});
    res.send({status:200,message:result});
   }
   )
})
router.put('/post',async(req,res)=>{
    try{
        result= await Model.findById(req.body._id);
        console.log(req.body);
        console.log(result);
        result.title=req.body.title;
        result.description=req.body.description;
        if(req.body.todono)
        result.todono=req.body.todono
       await  result.save();
       res.send({status:200,message:result});
          }
          catch(err){
              console.log(err);
              res.send({status:400,message:err.message});
          }
})
router.delete('/post/:todoId',async(req,res)=>{
    try{
await Model.deleteOne({_id:req.params.todoId});
res.send({status:200,message:"Deleted"});
    }
    catch(err){
        res.send({status:400,message:err.message});
    }
})
module.exports = router ;
