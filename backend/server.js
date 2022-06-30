const express = require("express");
const dotenv = require("dotenv").config();

const { errorHandler } = require("./middleware/errorMiddleware");
const goalsRoutes = require("./routes/goalsRoutes");

const app = express();
const port = process.env.PORT || 5000;

// middleWare
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use("/api/goals", goalsRoutes);

// errormiddleware
app.use(errorHandler);

// listening on server
app.listen(port, () => console.log(`Server listening on port ${port}!`));