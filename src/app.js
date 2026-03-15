const express=require("express");

const app=express();

app.get("/test",(req,res)=>{
    res.send("Connected to test server.")
});

app.post("/test",(req,res)=>{
    res.send("Connected to test1..")
});

app.delete("/test",(req,res)=>{
    res.send("Connected to test1..")
});

app.put("/test",(req,res)=>{
    res.send("Connected to test1..")
});

app.listen(7777, ()=>{
    console.log("Server is cconnected.")
});