const router = require("express").Router();
const {User} = require("../models/user");
const {Closet} = require("../models/closet");
const {validate, Clothes} = require("../models/clothes");
const admin = require("../middleware/admin");
const auth = require("../middleware/auth");
const validObjectID = require("../middleware/validObjectId");
const joi = require("joi");

// create clothes and save it to closet and user collections
router.post("/", auth, async(req, res) => {
    try {
        const findCloset = await Closet.findById(req.body.closet); //default closet id
        if (!findCloset) {
            console.error('Closet not found');
            return;
        }
        const {error} = validate({...req.body, user: req.user._id.toString()});
        if (error) {
            return res.status(400).send({message: error.details[0].message});
        }
        const clothes = await Clothes({...req.body, user: req.user._id.toString()}).save(); //save req.body's data to db
        findCloset.clothes.push(clothes);
        await findCloset.save();

        return res.status(201).send({data: clothes, message: "Create clothes and add to closet successfully!"});

    }
    catch (error) {
        console.log('Server Error:' + error);
    }
});

// edit clothes by clothes id
router.put("/:clothes_id", auth, async(req, res) => {
    try {
        // Check if the clothes belong to the authenticated user
        const authenticatedUser = await Clothes.findOne({
            "user": req.user._id.toString(),
            "_id": req.params.clothes_id
        });

        if (!authenticatedUser) {
            return res.status(403).send({ message: 'Access denied' });;
        } 
        const toUpdatedClothes = await Clothes.findOneAndUpdate(
            {"user": req.user._id.toString(), "_id": req.params.clothes_id}, 
            {$set: req.body}, 
            {new: true}
        );

        if (!toUpdatedClothes) {
            return res.status(404).send({message: "Clothes not found"});
        }
        else {
            res.status(200).send({ data: toUpdatedClothes });
        }
    }
    catch(error) {
        console.log('Server Error:' + error);
    }
});

// delete clothes by clothes id
router.delete("/:clothes_id", auth, async(req, res) => {
    try {
        // Check if the clothes belong to the authenticated user
        const authenticatedUser = await Clothes.findOne({
            "user": req.user._id.toString(),
            "_id": req.params.clothes_id
        });

        if (!authenticatedUser) {
            return res.status(403).send({ message: 'Access denied' });;
        } 
        const toDeleteClothes = await Clothes.findOneAndDelete({"user": req.user._id.toString(), "_id": req.params.clothes_id});
        const user = await User.findById(req.user._id);
        if (!user) return res.status(400).send({message: "Can't find user"});
        user.closet.pop(req.params.clothes_id);
        await user.save();
        res.status(200).send({message: "Delete clothes in the closet successfully"});

    }
    catch(error) {
        console.log('Server Error:' + error);
    }
});

//get all clothes (admin)
router.get("/all", admin, async (req, res) => {
    try {
        const allClothes = await Clothes.find();
        if (allClothes) {
            return res.status(200).send({data: allClothes});
        }
    }
    catch (error) {
        console.error(err);
        res.status(500).send({ message: 'Server error' });
    }
})

//get user's clothes 
router.get("/user", auth, async(req, res) => {
    try {
        // Check if the clothes belong to the authenticated user
        const authenticatedUser = await Clothes.findOne({
            "user": req.user._id.toString(),
        });

        if (!authenticatedUser) {
            return res.status(403).send({ message: 'Access denied' });;
        } 

        res.status(200).send({ data: authenticatedUser });
    }
    catch (error) {
        console.error(err);
        res.status(500).send({ message: 'Server error' });
    }
});

//liked wearing
router.get("/liked/:clothes_id", auth, async(req, res) => {
    try {
        // Check if the clothes belong to the authenticated user
        const authenticatedUser = await Clothes.findOne({
            "user": req.user._id.toString(),
            "_id": req.params.clothes_id
        });

        if (!authenticatedUser) {
            return res.status(403).send({ message: 'Access denied' });;
        } 


        const user = await User.findById(req.user._id);
        user.likedWearing.push(req.params.clothes_id);
        await user.save();
        res.status(200).send({message: "Liked clothes successfully", data: user});
    }
    catch(err) {
        console.log(err);
        res.status(500).send("Server Error "+ err);
    }
});

//remove liked wearing
router.delete("/rmliked/:clothes_id", auth, async(req, res) => {
    try {
        // Check if the clothes belong to the authenticated user
        const authenticatedUser = await Clothes.findOne({
            "user": req.user._id.toString(),
            "_id": req.params.clothes_id
        });

        if (!authenticatedUser) {
            return res.status(403).send({ message: 'Access denied' });;
        } 

        const user = await User.findById(req.user._id);
        user.likedWearing.pop(req.params.clothes_id);
        await user.save();
        res.status(200).send({message: "Removed liked clothes successfully", data: user});
    }
    catch(err) {
        console.log(err);
        res.status(500).send("Server Error "+ err);
    }
});


module.exports = router;