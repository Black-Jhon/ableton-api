import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    country: {type: String, default: ""},
    checkbox: {type: Boolean, default: false}
}, {timestamps: true});

export default mongoose.model("User", UserSchema);
