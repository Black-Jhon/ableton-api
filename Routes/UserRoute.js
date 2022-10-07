import express from "express";
import {deleteUser, getAllUsers, getUser} from "../Controllers/UserController.js";

const UserRoute = express.Router();

UserRoute.get("/", getAllUsers);
UserRoute.get("/:id", getUser);
UserRoute.delete("/:id", deleteUser);

export default UserRoute;
