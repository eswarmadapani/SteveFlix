// Register & Login logic
import bcrypt from "bcrypt";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
//register 
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" })

        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        // Generate token for immediate login after register
        const token = generateToken(user._id);

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                token: token
            }
        });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}
//login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email });
        // check if user exists
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = generateToken(user._id);

        res.status(200).json({
            message: "Logged in successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                token: token
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}