const router = require("express").Router();
const {Clothes} = require("../models/clothes");
const {User} = require("../models/user");
const {Closet} = require("../models/closet");
const auth = require("../middleware/auth");

//search clothes by name
router.get("/", auth, async (req, res) => {
    try {
        // Check if the clothes belong to the authenticated user
        const search = req.query.search;
        if (search !== "") {
            const result = await Clothes.find({
                name: {$regex: search, $options: "i"},
                user: req.user._id.toString()
            });
            if (!result) {
                return res.status(403).send({ message: "Can't search" });;
            } 
            res.status(200).send({data: result});
        }
        else res.status(200).send({});
       
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Server error' });
    }
    
});

//search clothes by category
router.get("/type", auth, async (req, res) => {
    try {
        const search = req.query.type;
        if (search !== "") {
            const result = await Clothes.find({
                category: search,
                user: req.user._id.toString()
            });
            if (!result) {
                return res.status(403).send({ message: "Can't search" });;
            } 
            res.status(200).send({data: result});
        }
        else res.status(200).send({});
       
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Server error' });
    }
    
});

//search clothes by color
router.get("/color", auth, async (req, res) => {
    try {
        const search = req.query.color;
        if (search !== "") {
            const result = await Clothes.find({
                color: search,
                user: req.user._id.toString()
            });
            if (!result) {
                return res.status(403).send({ message: "Can't search" });;
            } 
            res.status(200).send({data: result});
        }
        else res.status(200).send({});
       
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Server error' });
    }
    
});

//search clothes by brand
router.get("/brand", auth, async (req, res) => {
    try {
        const search = req.query.brand;
        if (search !== "") {
            const result = await Clothes.find({
                brand: search,
                user: req.user._id.toString()
            });
            if (!result) {
                return res.status(403).send({ message: "Can't search" });;
            } 
            res.status(200).send({data: result});
        }
        else res.status(200).send({});
       
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Server error' });
    }
    
});

//search clothes by season
router.get("/season", auth, async (req, res) => {
    try {
        const search = req.query.season;
        if (search !== "") {
            const result = await Clothes.find({
                season: search,
                user: req.user._id.toString()
            });
            if (!result) {
                return res.status(403).send({ message: "Can't search" });;
            } 
            res.status(200).send({data: result});
        }
        else res.status(200).send({});
       
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Server error' });
    }
    
});

module.exports = router;