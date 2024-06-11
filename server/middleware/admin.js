const jwt = require("jsonwebtoken");
const fs = require("fs");
const privatekey = process.env.JWTPRIVATEKEY;

module.exports = (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token) {
        return res.status(401).send({message: "Access denied, no token provided"});
    }
    jwt.verify(token, privatekey, (error, validToken) => {
        if (error) {
            return res.status(400).send({message: "Invalid token"});
        }

        if (!validToken.isAdmin) {
            return res.status(403).send({message: "You don't have access to the content"});
        }
        req.user = validToken;
        next();
    })

}