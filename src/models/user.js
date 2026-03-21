const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 5,
        maxlength: 50,
        trim: true
    },
    lastName: {
        type: String,
        minLength: 5,
        maxlength: 50,
        trim: true
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        min: 18,
        trim: true
    },
    gender: {
        type: String,
        trim: true,
        validate(value) {
            if (!["male", "female", "Other"].includes(value)) {
                throw new Error("Please enter a valid gender type.")
            }
        }
    },
    About: {
        type: String,
        default: "Enter Something about yourself."
    },
    skills:
    {
        type: [String],
        trim: true
    },
    PhotoURL: {
        type: String,
        trim: true,
        default: "https://www.ommel.fi/content/uploads/2019/03/dummy-profile-image-female.jpg"
    }
}, { timestamps: true });

const userModel = mongoose.model("User", UserSchema);

module.exports = userModel;