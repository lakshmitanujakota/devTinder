const express = require("express");
const { connectDB } = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.send("User Added successfully.");
    } catch (err) {
        res.status(400).send("Error saving the user:" + err.message);
    }
});


app.get("/user", async (req, res) => {
    const emailId = req.body.emailId;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
        res.status(400).send("User not found with above email id");
    } else {
        res.send(user);
    }
});

app.get("/feed", async (req, res) => {
    try {
        const user = await User.find({});
        if (!user) {
            res.status(400).send("No data present..")
        } else {
            res.send(user)
        }
    } catch (err) {
        res.status(400).send("Something went wrong..")
    }

});


app.delete("/user", async (req, res) => {
    const userId = req.body.userId;
    try {
        const user = await User.findByIdAndDelete({ _id: userId });
        res.send("User deleted successfully");
    } catch (err) {
        res.status(400).send("Something went wrong");
    }

})

app.patch("/user", async (req, res) => {
    const userId = req.body.userId;
    const data = req.body;
    try {
        const user = await User.findByIdAndUpdate(userId, data, {returnDocument: "after"});
        console.log(user);
        res.send("User data updated");
    } catch (err) {
        res.status(400).send("Something went wrong.");
    }
})

connectDB().then(() => {
    console.log("Conneted to database");
    app.listen(3000, () => {
        console.log("Server is cconnected.")
    });
}).catch((err) => {
    console.error("Database connection not established");
});

