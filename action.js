import express from "express";
const router =express.Router();
import fetch from "node-fetch";



router.get('/Ejs', async(req,res)=>{

    res.render('index',{myname:'daniel'}) 

})



router.get("/getAllPoke",async(req,res)=>{

    const responseFromServer = await fetch(
        "https://api.pokemontcg.io/v2/cards",
        {method:'get'}
    );

    const fromatdata=await responseFromServer.json();

/*
    return res.status(200).json({
        data:fromatdata
    })
      */
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
    const filteredCards = allCards.data.filter((card) => card.name.toLowerCase() == req.params.pokename.toLowerCase());



   
    //const imgUrl = filteredCards[0].images.large;
    return res.status(200).json({
        message:filteredCards
    })


})


router.get("/coronatoday",async(req,res)=>{
    const responseFromServer = await fetch(
        `https://api.covidtracking.com/v1/states/daily.json`,
        {method:'get'}
        );
    const formatdata = await responseFromServer.json();

    //by death
    const filteredData = formatdata.filter(entry => entry.death != null);//remove all the states with no death
    const sortedData = filteredData.sort((a, b) => b.death - a.death);//sort them by death

    const uniqueStates = [];
    const stateSet = new Set();

    for (const obj of sortedData) {
        if (!stateSet.has(obj.state)) {
            stateSet.add(obj.state);
            uniqueStates.push(obj);
        }
    }


    let firstTen = uniqueStates.slice(0, 10);

    const newData = firstTen.map(item => ({state: item.state ,death: item.death  }));


    //same thing but with posivite
    const filteredPositiveData = formatdata.filter(entry => entry.positive != null); // remove all the states with no positive cases
    const sortedPositiveData = filteredPositiveData.sort((a, b) => b.positive - a.positive); // sort them by positive cases

    const uniquePositiveStates = [];
    const positiveStateSet = new Set();

    for (const obj of sortedPositiveData) {
    if (!positiveStateSet.has(obj.state)) {
        positiveStateSet.add(obj.state);
        uniquePositiveStates.push(obj);
    }
    }

    let firstTenPositiveStates = uniquePositiveStates.slice(0, 10);

    const newPositiveData = firstTenPositiveStates.map(item => ({state: item.state, positive: item.positive}));

    
      return res.status(200).json({
        by_death:newData,
        by_positive:newPositiveData
    })
    res.render("coronadata", {
        alldata: top10CountriesByDeaths,
    });
   


})
      
   




export default router;