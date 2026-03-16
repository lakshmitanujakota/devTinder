const express = require("express");

const app = express();

const {adminAuth, userAuth}= ("./middlewares")

app.use("/admin", adminAuth)

app.get("/user", userAuth, (req, res) => {
    res.send("User Data Sent.")
})

app.get("/admin/getAllData", (req, res) => {
    res.send("All Data Sent.")
})

app.get("/admin/deleteAllData", (req, res) => {
    res.send("All Data Sent.")
})

app.listen(7777, () => {
    console.log("Server is cconnected.")
});