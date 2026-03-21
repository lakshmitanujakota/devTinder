const express = require("express");
const { connectDB } = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validate");
const bcrypt = require("bcrypt");

app.use(express.json());

app.post("/signup", async (req, res) => {
    try {
        const { firstName, lastName, emailId, password } = req.body;
        // validate the data
        validateSignUpData(req);

        //encrypt the password

        const passwordHash = await bcrypt.hash(password, 10);

        const user = new User({ firstName, lastName, emailId, password: passwordHash });
        await user.save();
        res.send("User Added successfully.");
    } catch (err) {
        res.status(400).send("Error saving the user:" + err.message);
    }
});

app.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId : emailId });
        if (!user) {
            throw new Error("Invalid Credentials");
        };
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
            res.send("login Successful");
        }
        else {
            throw new Error("Invalid Credentials");
        }
    } catch (err) {
        res.status(400).send("Error " + err.message);
    }

})

app.get("/user", async (req, res) => {
    try {
        const emailId = req.body.emailId;
        const user = await User.findOne({ emailId: emailId });
        if (!user) {
            res.status(400).send("User not found with above email id");
        } else {
            res.send(user);
        }
    } catch (err) {
        res.status(400).send("Something went wrong..")
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

app.patch("/user/:userId", async (req, res) => {
    const userId = req.params?.userId;
    const data = req.body;


    try {

        const ALLOWED_Fields = ["gender", "age", "skills", "PhotoURL", "About", "password"];
        const isUpdatedAllowed = Object.keys(data).every((key) => ALLOWED_Fields.includes(key));
        if (!isUpdatedAllowed) {
            throw new Error("Some of the Allowed Fields are not allowed to Update.")
        }
        if (data?.skills.length > 10) {
            throw new Error("Max Allowed Skills are 10.")
        }

        const user = await User.findByIdAndUpdate({ _id: userId }, data, {
            returnDocument: "after",
            runValidators: true, context: "query"
        });
        console.log(user);
        res.send("User data updated");
    } catch (err) {
        res.status(400).send("Update Failed " + err.message);
    }
})

connectDB().then(() => {
    console.log("Conneted to database");
    app.listen(3000, () => {
        console.log("Server is connected.")
    });
}).catch((err) => {
    console.error("Database connection not established");
});

