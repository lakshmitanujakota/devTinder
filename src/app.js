const express = require("express");

const app = express();

app.use("/use", (req, res, next) => {
    console.log("response sending.");
    next();
    //res.send("Route  Server 1")

},
    (req, res, next) => {
        console.log("response sending.");
        //res.send("Route  Server 2")
        next();
    }, (req, res, next) => {
        console.log("response sending.");
        //res.send("Route  Server 3")
        next();
    }, (req, res, next) => {
        console.log("response sending.");
       // res.send("Route  Server 4")
        next();
    }, (req, res, next) => {
        console.log("response sending.");
        res.send("Route  Server 5")
    })

app.listen(7777, () => {
    console.log("Server is cconnected.")
});