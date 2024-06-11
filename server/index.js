require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const connection = require("./db");
const cors = require("cors");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const clothesRoute = require("./routes/clothes");
const closetRoute = require("./routes/closets");
const searchRoute = require("./routes/search");
const bodyParser = require("body-parser");

//database
connection();


app.use(cors());
app.use(express.json());


// routes
app.use("/api/users", userRoute);
app.use("/api/login", authRoute);
app.use("/api/clothes", clothesRoute);
app.use("/api/closet", closetRoute);
app.use("/api/search", searchRoute);

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log("Listening DWEAR Server on PORT:" + port);
})