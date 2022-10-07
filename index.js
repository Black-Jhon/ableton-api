dotenv.config();
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import AuthRoute from "./Routes/Auth.js";

const app = express();
app.use(express.json());
app.use("/auth", AuthRoute);

// DB Connection
mongoose.connect(process.env.DB_CONNECTION)
    .then(() => console.log(`DB CONNECTION WAS SUCCESSFUL`))
    .catch((error) => console.log(error));

// Server Connection
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
