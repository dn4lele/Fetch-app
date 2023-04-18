import express from "express";
const router =express.Router();
import fetch from "node-fetch";


router.get("/getDataFromApi",async(req,res)=>{

    const responseFromServer = await fetch(
        "https://api.pokemontcg.io/v2/cards",
        {method:'get'}
    );

    const fromatdata=await responseFromServer.json();



    return res.status(200).json({
        data:fromatdata
    })
})



router.get("/getPokeById/:pokeId",async(req,res)=>{

    const responseFromServer = await fetch(
        `https://api.pokemontcg.io/v2/cards/${req.params.pokeId}`,
        {method:'get'}
    );

    const fromatdata=await responseFromServer.json();



    return res.status(200).json({
        data:fromatdata
    })
})





export default router;