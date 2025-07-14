const User = require("../models/User");
const mailSender = require("../utils/MailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

/**
 * Generates and sends a password reset token to user's email.
 */
exports.resetPasswordToken = async (req, res) => {
  try {
    const email = req.body.email;

    // Check if user exists
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.json({
        success: false,
        message: `This Email: ${email} is not Registered With Us. Enter a Valid Email.`,
      });
    }

    // Generate token and set expiry
    const token = crypto.randomBytes(20).toString("hex");
    const updatedDetails = await User.findOneAndUpdate(
      { email: email },
      {
        token: token,
        resetPasswordExpires: Date.now() + 3600000, // 1 hour
      },
      { new: true }
    );

    console.log("DETAILS", updatedDetails);

    // Password reset link (frontend route)
    const url = `https://shikshasutra-edtech-project.vercel.app/update-password/${token}`;

    // Send email with reset link
    await mailSender(
      email,
      "Password Reset",
      `Your link to reset the password is: ${url}. Please click this link to reset your password.`
    );

    res.json({
      success: true,
      message:
        "Email Sent Successfully. Please Check Your Email to Continue Further.",
    });
  } catch (error) {
    return res.json({
      error: error.message,
      success: false,
      message: "Some Error in Sending the Reset Message.",
    });
  }
};

/**
 * Resets the user's password using the provided token.
 */
exports.resetPassword = async (req, res) => {
  try {
    const { password, confirmPassword, token } = req.body;

    // Check if password and confirm password match
    if (confirmPassword !== password) {
      return res.json({
        success: false,
        message: "Password and Confirm Password Do Not Match",
      });
    }

    // Find user with the token
    const userDetails = await User.findOne({ token: token });
    if (!userDetails) {
      return res.json({
        success: false,
        message: "Token is Invalid",
      });
    }

    // Check token expiration
    if (!(userDetails.resetPasswordExpires > Date.now())) {
      return res.status(403).json({
        success: false,
        message: "Token is Expired. Please Regenerate Your Token.",
      });
    }

    // Hash the new password and update
    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.findOneAndUpdate(
      { token: token },
      { password: encryptedPassword },
      { new: true }
    );

    res.json({
      success: true,
      message: "Password Reset Successful",
    });
  } catch (error) {
    return res.json({
      error: error.message,
      success: false,
      message: "Some Error in Updating the Password.",
    });
  }
};

/**
 * ============================================
 * 🔐 Password Reset Controller Summary
 * ============================================
 *
 * Provides secure password reset functionality using time-limited tokens
 * sent via email. Handles both token generation and password update flows.
 *
 * 🔹 resetPasswordToken
 *    - 📧 Accepts an email from the user requesting a password reset.
 *    - 🔍 Verifies whether the email exists in the system.
 *    - 🔐 Generates a secure reset token (valid for 1 hour).
 *    - 📬 Sends an email to the user with a reset link containing the token.
 *
 * 🔹 resetPassword
 *    - 📦 Accepts the new password, confirm password, and reset token.
 *    - ✅ Validates token existence and expiration.
 *    - 🔁 Hashes and updates the user's password securely.
 *    - ❌ Rejects reset requests if password and confirm password do not match.
 *
 * 📌 Key Security Measures:
 *    - Token is randomly generated using `crypto.randomBytes`.
 *    - Passwords are encrypted using `bcrypt` before saving.
 *    - Reset tokens have an expiration time (`resetPasswordExpires`).
 *
 * 📫 Email Format:
 *    - Reset URL points to frontend (e.g., `https://shikshasutra-edtech-project.vercel.app/update-password/{token}`)
 *    - Users must click this link to access the password reset form.
 *
 * 📌 Utilized Modules:
 *    - `User` model for DB operations
 *    - `mailSender` utility for sending emails
 *    - `bcrypt` for password hashing
 *    - `crypto` for token generation
 *
 * ============================================
 */
