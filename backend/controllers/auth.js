import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import userModel from '../models/userModel.js';

dotenv.config();

// إعداد Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});

// إرسال بريد إعادة تعيين كلمة المرور
export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) return res.status(404).json({ message: 'Email not found' });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

        userModel.resetPasswordToken = token;
        userModel.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
        await user.save();

        const resetLink = `http://localhost:3000/reset-password/${token}`;
        await transporter.sendMail({
            to: user.email,
            subject: 'Reset password',
            html: `<p>Click on the link to reset your password: <a href="${resetLink}">Reset Password</a></p>`,
        });

        res.json({ message: 'A password reset link has been sent to your email' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
        console.log(err);
        
    }
};

export const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findOne({
            _id: decoded.userId,
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) return res.status(400).json({ message: 'The code is invalid or expired' });

        user.password = await bcrypt.hash(newPassword, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.json({ message: 'Password reset successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
