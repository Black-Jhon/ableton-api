import express from "express";
import {loginUser, registerNewUser} from "../Controllers/AuthController.js";

const AuthRoute = express.Router();

AuthRoute.post("/register", registerNewUser);
AuthRoute.post("/login", loginUser);

export default AuthRoute;
