import express from "express";
const router =express.Router();


router.get("/getDataFromApi",async(req,res)=>{
    return res.status(200).json({
        data:"hello from api"
    })
})





export default router;