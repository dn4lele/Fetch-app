import express from "express";
const router =express.Router();
import fetch from "node-fetch";



router.get('/Ejs', async(req,res)=>{

    res.render('index',{
        myname:'daniel'
    }) 

})



router.get("/getAllPoke",async(req,res)=>{

    const responseFromServer = await fetch(
        "https://api.pokemontcg.io/v2/cards",
        {method:'get'}
    );

    const fromatdata=await responseFromServer.json();



    res.render("pokeindex", {
        allCards: fromatdata.data,
    });
})



router.get("/getPokeById/:pokeId",async(req,res)=>{

    const responseFromServer = await fetch(
        `https://api.pokemontcg.io/v2/cards/${req.params.pokeId}`,
        {method:'get'}
    );

    const fromatdata=await responseFromServer.json();
 
    /*
    return res.status(200).json({
        data:fromatdata
    })
     */
    res.render("pokedetail", {
        pokemon: fromatdata.data,
    });
})


router.get("/getPokeByname/:pokename",async(req,res)=>{
    const responseFromServer = await fetch(
        `https://api.pokemontcg.io/v2/cards`,
        {method:'get'}
        );
    const allCards = await responseFromServer.json();
    const filteredCards = allCards.data.filter((card) => card.name.toLowerCase() === req.params.pokename.toLowerCase());



   
    //const imgUrl = filteredCards[0].images.large;
    return res.status(200).json({
        message:filteredCards
    })


})
      
   




export default router;