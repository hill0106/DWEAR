const router = require("express").Router();
const {User, validate} = require("../models/user");
const {Closet} = require("../models/closet");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validObjectID = require("../middleware/validObjectId");

//create user
router.post("/", async(req, res) => {
    const {error} = validate(req.body);
    if (error) {
        return res.status(400).send({message: error.details[0].message});
    }
    // check whether user is in the database
    const user = await User.findOne({email: req.body.email});
    if (user) {
        return res.status(403).send({message: "Hi, you've already registered!"});
    }
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPwd = await bcrypt.hash(req.body.pwd, salt);
    let newUser = await new User({
        ...req.body,
        pwd: hashPwd
    }).save(); //save to database collection: user

    newUser.pwd = undefined;
    newUser.__v = undefined;

    // after create a new user, create a default closet
    try {      
        const defaultCloset = {
            "img": "https://images.unsplash.com/photo-1614631446501-abcf76949eca?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "user": newUser._id,
            "desc": "Your Default Closet",
            "clothes": []

        }

       const closet = await Closet(defaultCloset).save(); //save req.body's data to db

       const authenticatedUser = await User.findById(newUser._id);
       if (!authenticatedUser) {
           console.error('User not found');
           return res.status(403).send({ message: 'Access denied' });;
       }  
       
       authenticatedUser.closet.push(closet._id);
       await authenticatedUser.save();

       return res.status(201).send({data: {newUser, closet}, message: "Account created and create closet successfully!"});

   }
   catch(e) {
    console.log(e);
   }

});


//get all users (admin)
router.get("/", admin, async(req, res) => {
    try {
        const users = await User.find().select("-pwd -__v");
        if (!users) {
            return res.status(404).send({ message: 'Users not found' });
        }
        res.status(200).send({ data: users });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Server error' });
    }
});

//get user by ID (auth)
router.get("/:id", [validObjectID, auth], async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-pwd -__v");
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send({ data: user });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Server error' });
    }
});

//update user by ID
router.put("/:id", [validObjectID, auth], async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new: true}
        ).select("-pwd -__v");
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send({ data: user });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Server error' });
    }
});

//delete user by ID
router.delete("/:id", [validObjectID, auth], async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).send({message: "Delete user successfully"});
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Server error' });
    }
    
});

module.exports = router;