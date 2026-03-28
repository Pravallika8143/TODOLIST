const express = require("express");
const dotenv = require("dotenv");
const connnectDB = require("./config/db");
const cors = require("cors");
const todoRoutes = require("./todolist/todoRoutes");
const connectDB = require("./config/db");
dotenv.config();
connnectDB();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/todos",todoRoutes);

app.listen(4700,()=>{
    console.log("Server Running on 4700")
})