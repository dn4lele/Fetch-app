import express from "express";
import actions from "./action.js"

const app = express();

app.use(express.json());

app.use(express.urlencoded({extended:false}));
app.use(express.json());


app.use("/api",actions);


const port=4000;

app.listen(port,function(){
    console.log(`server is running on port ${port}`)
})