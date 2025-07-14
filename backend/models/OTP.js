const mongoose = require("mongoose");
const mailSender = require("../utils/MailSender");
const emailTemplate = require("../Mail/Template/EmailVerification");
const bcrypt = require("bcrypt");

const OTPSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5,
  },
});

//function to send email
async function sendVerificationEmail(email, otp) {
  try {
    const mailResponse= await mailSender(email, "Verification Email from Prashant Study Notion Version", otp);
    console.log("Mail sent successfully:", mailResponse);
  } catch (error) {
    console.log("Error occured while sending mail:", error);
    throw error;
  }
}
//pre save hook to send email just before saving the document of user filled details in database
OTPSchema.pre("save", async function (next) {
  // Send email before saving
  await sendVerificationEmail(this.email, this.otp);

  // Hash the OTP before saving it
  if (this.isModified("otp")) {
    this.otp = await bcrypt.hash(this.otp, 10);
  }

  next();
});


const OTP = mongoose.model("OTP", OTPSchema);

module.exports = OTP;

// What is .pre("save", ...)?
//This is a Mongoose pre-save middleware — it runs before a document is saved to the database.
//pre and post hooks are used to perform actions before and after certain events in mongoose
//pre hooks are used to perform actions before certain events like save, update, delete etc.
//post hooks are used to perform actions after certain events like save, update, delete etc.
//used below schema and above to model