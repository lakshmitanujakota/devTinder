const express = require('express');

const app=express();

  

app.use('/hello',(req,res)=>{
    res.send("hello there....")
});

app.use('/text',(req, res)=>{
    res.send("Response from server...")
});

 app.use((req,res)=>{
    res.send("hello from dashboard..")
});  

app.listen(3000, ()=>{
    console.log("Server connection created....")
});