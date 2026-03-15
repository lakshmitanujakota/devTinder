const express=require("express");

const app=express();

app.get("/tes?t",(req,res)=>{
    res.send("Connected to test server.")
});


app.listen(7777, ()=>{
    console.log("Server is cconnected.")
});