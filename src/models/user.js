const mongoose = require("mongoose");
const validator = require("validator");
const jwt=require("jsonwebtoken");
const bcrypt = require("bcrypt");


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
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Please a Enter a valid Email ID.")
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Password is not Strong.")
            }
        }
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
        default: "https://www.ommel.fi/content/uploads/2019/03/dummy-profile-image-female.jpg",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Enter valid URL.")
            }
        }
    }
    
}, { timestamps: true });

UserSchema.methods.getJWT=async function(){
    const user =this;
    const token= await jwt.sign({ _id: user._id }, "DEV@TinderT#123", { expiresIn: "1d" }); 
    return token;
};        

UserSchema.methods.validatePassword =async function(passwordByInputUser){
    const user=this;
    const passwordHash=user.password;
    const isPasswordValid=await bcrypt.compare(passwordByInputUser, passwordHash);
    return isPasswordValid;
};

const userModel = mongoose.model("User", UserSchema);

module.exports = userModel;