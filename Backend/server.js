const express = require("express");
const pool = require("./db");
const riderRoutes = require("./src/routers/routes");
const app = express();
const jwtAuth = require("./src/routers/jwtAuth");
const cors = require("cors");
const posts = require("./src/routers/posts");
// we are using postgres as our database
app.use(cors());
app.use(express.json());

//routes
//Authentication
app.use("/auth", jwtAuth);

// app.use("/dashboard", require("./routers/dashboard"));

app.get("/", (req, res) => res.send("Hello World!"));

app.use("/api", posts);

const port = 5001;

app.listen(port, () => console.log(`app listening on port: ${port}`));
