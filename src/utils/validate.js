const validator = require("validator");

const validateSignUpData = (req) => {
    const {firstName, lastName, emailId, password} = req.body;
    if (!firstName || !lastName || !emailId || !password) {
        throw new Error("Mandatory Fields are not present.")
    }
    if (firstName.length < 5 || firstName.length > 50 || lastName.length < 5 || lastName.length > 50) {
        throw new Error("Name Should be between 5-50.")
    }
    if (!validator.isEmail(emailId)) {
        throw new Error("Enter Valid Email Id")
    }
    if (!validator.isStrongPassword(password)) {
        throw new Error("Enter Strong Password.")
    }
};

module.exports = {
    validateSignUpData,
}