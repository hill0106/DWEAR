const router = require("express").Router();
const {Closet, validate} = require("../models/closet");
const {Clothes} = require("../models/clothes");
const {User} = require("../models/user");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validObjectId = require("../middleware/validObjectId");
const joi = require("joi");
const { Schema } = require("mongoose");
const mongoose = require('mongoose');

//create closet
router.post("/create", auth, async(req, res) => {
    try {
         // Check if the closet belong to the authenticated user
        const authenticatedUser = await User.findById(req.user._id);
        if (!authenticatedUser) {
            console.error('User not found');
            return res.status(403).send({ message: 'Access denied' });;
        }       

        //validate closet data
        const {error} = validate({...req.body, user: req.user._id.toString()});
        if (error) {
            return res.status(400).send({message: error.details[0].message});
        }
        const closet = await Closet({...req.body, user: req.user._id}).save(); //save req.body's data to db
        authenticatedUser.closet.push(closet._id);
        await authenticatedUser.save();

        return res.status(201).send({data: closet, message: "Create clothes and add to closet successfully!"});

    }
    catch (error) {
        console.log('Create Server Error:' + error);
    }
});

//get all closet (admin)
router.get("/all", admin, async(req, res) => {
    try {
        const closets = await Closet.find();
        if (!closets) {
            return res.status(404).send({ message: 'closets not found' });
        }
        res.status(200).send({ data: closets });
    }
    catch (err) {
        console.log(err);
        res.status(500).send({message: "Get all closet admin server Error"});
    }
});

//get closet by closet id
router.get("/:closet_id", auth, async(req, res) => {
    try {
        // Check if the closet belong to the authenticated user
        const authenticated = await Closet.findOne({
            "_id": req.params.closet_id,
            "user": req.user._id.toString(),
        });


        if (!authenticated) {
            return res.status(403).send({ message: 'Access denied' });;
        } 
        
        res.status(200).send({data: authenticated});

    }
    catch(error) {
        console.log('Get Closet by Closet ID Server Error:' + error);
    }
});

//get all closets by user id
router.get("/", auth, async(req, res) => {
    try {
        // Check if the closet belong to the authenticated user
        const authenticated = await Closet.findOne({
            "user": req.user._id.toString(),
        });


        if (!authenticated) {
            return res.status(403).send({ message: 'Access denied' });;
        } 
        
        res.status(200).send({data: authenticated});

    }
    catch(error) {
        console.log('Get Closet by User ID Server Error:' + error);
    }
});

//edit closet by closet id
router.put("/edit/:closet_id", auth, async(req, res) => {
    try {
        // Check if the closet belong to the authenticated user
        const authenticatedUser = await Closet.findOne({
            "user": req.user._id.toString(),
            "_id": req.params.closet_id
        });

        if (!authenticatedUser) {
            return res.status(403).send({ message: 'Access denied' });;
        } 

        const schema = joi.object({
            img: joi.string().allow(""),
            desc:  joi.string().allow(""),
        })
        const {error} = schema.validate(req.body);
        if (error) return res.status(400).send({message: error.details[0].message});
        
        const updatedCloset = await Closet.findOneAndUpdate(
            {"user": req.user._id.toString(), "_id": req.params.closet_id},
            {$set: req.body},
            {new: true}
        );
        if (!updatedCloset) {
            return res.status(404).send({ message: 'Closet not found' });
        }
        res.status(200).send({data: updatedCloset, message: "Edit Closet successfully"})
    }
    catch(error) {
        console.log(error);
        res.status(500).send({message: "Edit Closet Server Error"});
    }
});

//delete closet by closet id
router.delete("/delete/:closet_id", auth, async(req, res) => {
    try {
        // Check if the closet belong to the authenticated user
        const authenticatedUser = await Closet.findOne({
            "_id": req.params.closet_id,
            "user": req.user._id.toString(),
        });

        const user = await User.findOne({"_id": req.user._id});

        if (!authenticatedUser) {
            return res.status(403).send({ message: 'Access denied' });;
        } 
        await Closet.findOneAndDelete({"user": req.user._id.toString(), "_id": req.params.closet_id});
        await Clothes.deleteMany({"user": req.user._id.toString(), "closet": req.params.closet_id});
        user.closet = user.closet.filter(item => item !== req.params.closet_id);
        await user.save();
        res.status(200).send({message: "Delete closet and its clothes successfully"});

    }
    catch(error) {
        console.log('Delete Closet Server Error:' + error);
    }
});

module.exports = router;