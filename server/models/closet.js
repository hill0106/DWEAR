const mongoose = require("mongoose");
const joi = require("joi");

const closetSchema = new mongoose.Schema({
    img: {type: String, required: true, default: "https://images.unsplash.com/photo-1614631446501-abcf76949eca?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
    user: {type: mongoose.Schema.Types.ObjectId, ref: "user", required: true},
    desc: {type: String, default: "Default Closet"},
    clothes: {type: Array, default: []},
});

const validate = (closet) => {
    const schema = joi.object({
        img: joi.string().allow(""),
        user: joi.string().required(),
        desc:  joi.string().min(2).max(100).allow(""),
        clothes: joi.array().items(joi.string()),
    });
    return schema.validate(closet);
}

const Closet = mongoose.model("closets", closetSchema);

module.exports = {validate, Closet};