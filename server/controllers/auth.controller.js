import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import uploadImage from "../config/imagekit.js"
import fs from "fs/promises";

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
}

const registerUser = async (req, res) => {

    try {
        const { username, email, password } = req.body;
        const profilePicture = req.file;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (!profilePicture) {
            return res.status(400).json({ message: "Profile picture is required" });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const uploadedProfilePictrue = await uploadImage(profilePicture.path, profilePicture.originalname)

        let hasedPassword = bcrypt.hashSync(password, 10)

        const user = await User.create({
            username,
            email,
            password: hasedPassword,
            profilePicture: uploadedProfilePictrue.url
        });

        await fs.unlink(req.file.path)

        let token = generateToken(user._id);

        res.cookie("token", token)

        return res.status(201).json({ message: "User created successfully", user });


    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const existedUser = await User.findOne({ email });
        if (!existedUser) {
            return res.status(400).json({ message: "Invalid Credentials" })
        }

        const isPasswordValid = bcrypt.compareSync(password, existedUser.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        let token = generateToken(existedUser._id);

        res.cookie("token", token);

        return res.status(200).json({ message: "User logged in successfully", user: existedUser });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const logoutUser = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const checkAuth = async (req, res) => {
    return res.status(200).json({ message: "User is authenticated", user: req.user });
};

export { registerUser, loginUser, logoutUser, checkAuth }