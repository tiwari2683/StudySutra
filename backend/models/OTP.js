const mongoose = require("mongoose");
const mailSender = require("../Util/MailSender");
const emailTemplate = require("../Mail/Template/EmailVerification");

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
    const mailResponse= await mailSender(email, "Verification Email", otp);
    console.log("Mail sent successfully:", mailResponse);
  } catch (error) {
    console.log("Error occured while sending mail:", error);
    throw error;
  }
}
//pre save hook to send email just before saving the document of user filled details in database
OTPSchema.pre("save", async function (next) {
   await sendVerificationEmail(this.email, this.otp);
   next();
});

const OTP = mongoose.model("OTP", OTPSchema);

module.exports = OTP;
