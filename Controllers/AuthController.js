dotenv.config();
import bcrypt from "bcrypt";
import User from "../Models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

export const registerNewUser = async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    req.body.password = hashedPassword;

    const newUser = new User(req.body);

    const {email} = req.body;

    try {
        const oldUser = await User.findOne({email});

        if (oldUser) {
            return res.status(400).json({message: "Email is already registered!"});
        }

        const user = await newUser.save();

        // Jwt Auth
        const token = jwt.sign(
            {
                username: user.email,
                id: user._id,
            },
            process.env.JWT_KEY,
            {expiresIn: "1hr"}
        );

        res.status(201).json({user, token}); // This gets stored inside local storage and redux store
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const loginUser = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email: email});
        if (user) {
            const validity = await bcrypt.compare(password, user.password);

            if (!validity) {
                res.status(400).json({message: "Wrong password!"});
            } else {
                const token = jwt.sign({
                        email: user.email,
                        id: user._id
                    },
                    process.env.JWT_KEY,
                    {expiresIn: "2hr"}
                );
                res.status(200).json({user, token});
            }
        } else {
            res.status(404).json({message: "User does not exist!"});
        }
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};
