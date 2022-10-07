import User from "../Models/User.js";

export const getAllUsers = async (req, res) => {
    try {
        let users = await User.find();
        users = users.map((user) => { // Method to hide password
            const {password, ...otherDetails} = user._doc;
            return otherDetails;
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

export const getUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        if (user) {
            const {password, ...otherDetails} = user._doc;
            res.status(200).json(otherDetails);
        } else {
            res.status(404).json({message: "User not found!"});
        }
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

export const deleteUser = async (req, res) => {
    const id = req.params.id;

    try {
        await User.findByIdAndDelete(id);
        res.status(200).json("User deleted successfully!");
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};
