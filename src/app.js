const express = require("express");

const app = express();

const {adminAuth, userAuth}= ("./middlewares")

app.use("/", (err, req, res,next)=>{res.status(401).send("Something is wrong..")})

app.get("/user",(req,res)=>{
    //try{ 
    throw new Error("Something went wrong");
    res.send("Route handler");
   //} catch(err){
    //res.status(401).send("Something is wrong..")
   //}
});

app.use("/", (err, req, res,next)=>{res.status(401).send("Something is wrong..")})

app.listen(7777, () => {
    console.log("Server is cconnected.")
});