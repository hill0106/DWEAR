const mongoose = require("mongoose");
const joi = require("joi");
const { Schema } = mongoose;

const clothesSchema = new mongoose.Schema({
    img: {type: String, required: true},
    name: {type: String, required: true},
    user: {type: String, required: true},
    closet: {type: Schema.Types.ObjectId, ref: "closet", required: true},
    category: {type: String, required: true},
    color: {type: String},
    brand: {type: String},
    season: {type: String}
});

const validate = (clothes) => {
    const schema = joi.object({
        img: joi.string().required(),
        name: joi.string().min(1).max(50).required(),
        user: joi.string().required(),
        closet: joi.string().required(),
        category: joi.string().valid("Top", "Down", "Shoes", "Outerwear", "Bag", "Accessory", "Jewellery", "Other").required(),
        color: joi.string().valid("White", "Black", "Gray", "Brown", "Beige", "Camel", "Red", "Orange", "Yellow", "Green", "Blue", "Navy", "Purple", "Pink", "Silver", "Gold", "Misc", "Other").required(),
        brand: joi.string(),
        season:  joi.string().valid("Spring", "Summer", "Fall", "Winter", "Other")
    });
    return schema.validate(clothes);
}

const Clothes = mongoose.model("clothes", clothesSchema);

module.exports = {validate, Clothes};