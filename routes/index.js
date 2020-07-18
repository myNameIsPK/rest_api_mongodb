const express = require('express');
const router = express.Router();

//GET
router.get("/",(req,res)=>{
    res.render('index');
});
//CREATE
router.post("",(req,res)=>{

});
//UPDATE
router.put("",(req,res)=>{

});
//DELETE
router.delete("",(req,res)=>{

});

module.exports = router