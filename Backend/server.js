const express = require("express");
const pool = require("./db");
const riderRoutes = require("./src/routers/routes");
const app = express();
const port = 5001;

// we are using postgres as our database
app.use(express.json());
app.get("/", (req, res) => res.send("Hello World!"));

app.use("/api", riderRoutes);

app.listen(port, () => console.log(`app listening on port: ${port}`));
