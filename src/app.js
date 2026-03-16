const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());

app.get("/signup", async (req, res)=>{
    const user = new User(req.body);
    try{
        await user.save();
        res.send("User Added successfully.");
    }catch(err){
        res.status(400).send("Error saving the user:"+err.message);
    }
});



connectDB().then(() => {
    console.log("Connetec to database");
    app.listen(7777, () => {
        console.log("Server is cconnected.")
    });
}).catch(err => {
    console.err("Database connection not established");
});

