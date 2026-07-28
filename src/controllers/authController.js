import bcrypt from "bcrypt";
import { randomInt } from "crypto";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { userModel } from "../models/userModel.js";

const passwordResetCodes = new Map();

const mailTransporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export const registerController = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "Username, email, and password are required" });
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "A user with this email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userModel.create({
            username,
            email,
            password: hashedPassword,
            role: "user",
        });

        const token = jwt.sign(
            { id: user._id, username: user.username, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        return res.status(201).json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        return res.status(500).json({ message: "Unable to register user" });
    }
};

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const passwordMatches = await bcrypt.compare(password, user.password);
        if (!passwordMatches) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign(
            { id: user._id, username: user.username, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        return res.status(200).json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        return res.status(500).json({ message: "Unable to log in" });
    }
};

export const forgotPasswordController = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const code = randomInt(100000, 1000000).toString();
        const expiresAt = Date.now() + 15 * 60 * 1000;
        passwordResetCodes.set(email, { code, expiresAt });

        setTimeout(() => {
            const resetEntry = passwordResetCodes.get(email);
            if (resetEntry?.expiresAt === expiresAt) {
                passwordResetCodes.delete(email);
            }
        }, 15 * 60 * 1000);

        await mailTransporter.sendMail({
            from: process.env.SMTP_FROM || process.env.SMTP_USER,
            to: user.email,
            subject: "Password reset code",
            text: `Your password reset code is ${code}. It expires in 15 minutes.`,
        });

        return res.status(200).json({ message: "Password reset code sent" });
    } catch (error) {
    return res.status(500).json({ message: error.message });
}
};

export const verifyResetCodeController = async (req, res) => {
    try {
        const { email, code } = req.body;

        if (!email || !code) {
            return res.status(400).json({ message: "Email and reset code are required" });
        }

        const resetEntry = passwordResetCodes.get(email);
        if (!resetEntry) {
            return res.status(400).json({ message: "No reset code found for this email" });
        }

        if (resetEntry.expiresAt <= Date.now()) {
            passwordResetCodes.delete(email);
            return res.status(400).json({ message: "Reset code has expired" });
        }

        if (resetEntry.code !== code) {
            return res.status(400).json({ message: "Invalid reset code" });
        }

        return res.status(200).json({ message: "Reset code verified" });
    } catch (error) {
        return res.status(500).json({ message: "Unable to verify reset code" });
    }
};

export const resetPasswordController = async (req, res) => {
    try {
        const { email, code, newPassword } = req.body;

        if (!email || !code || !newPassword) {
            return res.status(400).json({ message: "Email, reset code, and new password are required" });
        }

        const resetEntry = passwordResetCodes.get(email);
        if (!resetEntry) {
            return res.status(400).json({ message: "No reset code found for this email" });
        }

        if (resetEntry.expiresAt <= Date.now()) {
            passwordResetCodes.delete(email);
            return res.status(400).json({ message: "Reset code has expired" });
        }

        if (resetEntry.code !== code) {
            return res.status(400).json({ message: "Invalid reset code" });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();
        passwordResetCodes.delete(email);

        return res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Unable to reset password" });
    }
};
