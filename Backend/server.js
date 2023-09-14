const express = require("express");
const pool = require("./db");
const app = express();
const jwtAuth = require("./src/routers/jwtAuth");
const cors = require("cors");
const posts = require("./src/routers/posts");
const postEnquiry = require("./src/routers/postEnquiry");
const postRegistration = require("./src/routers/postRegistration");
const dashboard = require("./src/routers/dashboard");
const bikeImages = require("./src/routers/bike");

// we are using postgres as our database
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Hello World!"));

//-----------routes-------------//
//Authentication
app.use("/auth", jwtAuth);

app.use("/dashboard", dashboard);

//Posts when people creat new posts
app.use("/api", posts);

//When people enquire one another
app.use("/api/enquiries", postEnquiry);

//When People register for one post
app.use("/api/post", postRegistration);

//For random images
app.use("/api", bikeImages);

const port = 5173;

app.listen(port, () => console.log(`app listening on port: ${port}`));
