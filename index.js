require("dotenv").config();
const express = require("express");
const configDb = require("./config/db");
const userRoute = require("./routes/user")

configDb();

// eslint-disable-next-line no-undef
const PORT = process.env.PORT;

const app = express();

app.use(express.json());

app.use("/api/user", userRoute)

app.get("/", (req, res) => {
  res.status(200).send("Api is running!");
});

app.listen(PORT, console.log(`Server is running on port ${PORT}`));
