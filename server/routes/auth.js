const router = require("express").Router();
const {User} = require("../models/user");
const bcrypt = require("bcrypt");



//check user when sigining in (regular)
router.post("/", async(req, res) => {
    // check whether user is in the database
    const user = await User.findOne({email: req.body.email});
    if (!user) {
        return res.status(400).send({message: "Invalid email or password"});
    }

    const validPwd = await bcrypt.compare(req.body.pwd, user.pwd);
    if (!validPwd) {
        return res.status(400).send({message: "Invalid email or password"});
    }
    else {
        const token = user.generateAuthToken(user);
        res.status(200).send({data: token, message: "Login successfully!"});
    }
});



module.exports = router;