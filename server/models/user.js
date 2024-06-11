const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const joi = require("joi");
const pwdComplexity = require("joi-password-complexity");
const fs = require("fs");

const privatekey = process.env.JWTPRIVATEKEY;

// database schema
const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    pwd: {type: String, required: true},
    gender: {type: String, required: true},
    month: {type: String, required: true},
    day: {type: String, required: true},
    year: {type: String, required: true},
    closet: {type: [String], default: []},
    likedWearing: {type: [String], default: []},
    isAdmin: {type: Boolean, default: false}
});



userSchema.methods.generateAuthToken = (user) => {
    var payload = {_id: user._id, name: user.name, isAdmin: user.isAdmin};
    const token = jwt.sign(
        payload,
        privatekey,
        {expiresIn: "1d"}
    );
    return token;
}

const validate = (user) => {
    const schema = joi.object({
        name: joi.string().min(2).max(10).required(),
        email: joi.string().email().required(),
        pwd: pwdComplexity().required(),
        month: joi.string().required(),
        day: joi.string().required(),
        year: joi.string().required(),
        gender: joi.string().valid("male", "female", "non-binary").required(),
    });
    return schema.validate(user);
}

const User = mongoose.model("user", userSchema);

module.exports = {User, validate};