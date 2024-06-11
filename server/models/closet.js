const mongoose = require("mongoose");
const joi = require("joi");

const closetSchema = new mongoose.Schema({
    img: {type: String, required: true},
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