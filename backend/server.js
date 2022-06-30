const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();

const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const goalsRoutes = require("./routes/goalsRoutes");

const app = express();
const port = process.env.PORT || 5000;

// connnect with database
connectDB();

// middleWare
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", goalsRoutes);

// errormiddleware
app.use(errorHandler);

// listening on server
app.listen(port, () => console.log(`Server listening on port ${port}!`));
