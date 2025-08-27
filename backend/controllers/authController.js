const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generateToken = require("../utils/generateTokenAndSetCookie");

const signup = async (req, res) => {
    try {
        const { fullName, email, password, phone, company, isAgency } = req.body
        const user = await User.findOne({ email })
        if (user) return res.status(409).json({ message: "Email is already in use" });

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
            phone,
            company,
            isAgency
        })
        await newUser.save()
        generateToken(res, newUser._id)
        res.status(201).json({
            message: "User created successfully",
            user: {
                id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                phone: newUser.phone,
                company: newUser.company,
                isAgency: newUser.isAgency,
            },
        });
    } catch (error) {
        console.error("Signup error:", error.message);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        generateToken(res, user._id)
        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                phone: user.phone,
                company: user.company,
                isAgency: user.isAgency,
            },
        });
    } catch (error) {
        console.error("Login error:", error.message);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};

const logout = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
    });
    res.status(200).json({ message: "Logged out successfully" });
};

const userProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

const checkAuth = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        if (!user) return res.status(404).json({ authenticated: false });
        res.status(200).json({ authenticated: true, userData: user });
    } catch (error) {
        res.status(401).json({ authenticated: false });
    }
}

module.exports = { signup, login, logout, userProfile, checkAuth };