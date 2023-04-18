import express from "express";

const app = express();

app.use(express.json());

app.use(express.urlencoded({extended:false}));
app.use(express.json());



const port=4000;

app.listen(port,function(){
    console.log(`server is running on port ${port}`)
})