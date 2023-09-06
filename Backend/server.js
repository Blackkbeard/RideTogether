const express = require("express");
const pool = require("./db");
const riderRoutes = require("./src/routers/routes");
const app = express();
const jwtAuth = require("./src/routers/jwtAuth");
const cors = require("cors");
const posts = require("./src/routers/posts");
const postEnquiry = require("./src/routers/postEnquiry");

// we are using postgres as our database
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Hello World!"));

//-----------routes
//Authentication
app.use("/auth", jwtAuth);

// app.use("/dashboard", require("./routers/dashboard"));

//Posts when people creat new posts
app.use("/api", posts);

//When people enquire one another
app.use("/api/enquiries", postEnquiry);

const port = 5001;

app.listen(port, () => console.log(`app listening on port: ${port}`));
