const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
        },
        phone: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        company: {
            type: String,
            default: "",
            trim: true,
        },
        isAgency: {
            type: String,
            enum: ["yes", "no"],
            default: "yes",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);