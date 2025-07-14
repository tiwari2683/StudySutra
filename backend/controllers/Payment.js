const { instance } = require("../config/Razorpay");
const Course = require("../models/Course");
const crypto = require("crypto");
const User = require("../models/User");
const mailSender = require("../utils/MailSender");
const mongoose = require("mongoose");
const {
  courseEnrollmentEmail,
} = require("../Mail/Template/CourseEnrollmentEmail");
const { paymentSuccessEmail } = require("../Mail/Template/PaymentSuccessEmail");
const CourseProgress = require("../models/CourseProgress");

exports.capturePayment = async (req, res) => {
  const { courses } = req.body;
  const userId = req.user.id;
  if (!courses || !courses.length) {
    return res.json({ success: false, message: "Please Provide Course ID" });
  }
  let total_amount = 0;
  for (const course_id of courses) {
    let course;
    try {
      course = await Course.findById(course_id);
      console.log("Course:", course);
      if (!course) {
        return res
          .status(200)
          .json({ success: false, message: "Could not find the Course" });
      }
      if (!Array.isArray(course.studentsEnroled)) {
        course.studentsEnroled = [];
      }
      const uid = new mongoose.Types.ObjectId(userId);
      console.log("studentsEnroled:", course.studentsEnroled);
      console.log("uid:", uid);
      if (course.studentsEnroled.includes(uid)) {
        return res
          .status(200)
          .json({ success: false, message: "Student is already Enrolled" });
      }
      if (typeof course.price !== 'number') {
        return res.status(500).json({ success: false, message: "Course price is invalid" });
      }
      total_amount += course.price;
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, message: error.message });
    }
  }
  const options = {
    amount: total_amount * 100,
    currency: "INR",
    receipt: Math.random(Date.now()).toString(),
  };
  try {
    const paymentResponse = await instance.orders.create(options);
    console.log(paymentResponse);
    res.json({
      success: true,
      data: paymentResponse,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Could not initiate order.", error: error.message });
  }
};

exports.verifyPayment = async (req, res) => {
  const razorpay_order_id = req.body?.razorpay_order_id;
  const razorpay_payment_id = req.body?.razorpay_payment_id;
  const razorpay_signature = req.body?.razorpay_signature;
  const courses = req.body?.courses;
  const userId = req.user.id;
  if (
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature ||
    !courses ||
    !userId
  ) {
    return res.status(200).json({ success: false, message: "Payment Failed" });
  }
  let body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex");
  if (expectedSignature === razorpay_signature) {
    await enrollStudents(courses, userId, res);
    return res.status(200).json({ success: true, message: "Payment Verified" });
  }
  return res.status(200).json({ success: false, message: "Payment Failed" });
};

exports.sendPaymentSuccessEmail = async (req, res) => {
  const { orderId, paymentId, amount } = req.body;

  const userId = req.user.id;

  if (!orderId || !paymentId || !amount || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all the details" });
  }

  try {
    const enrolledStudent = await User.findById(userId);

    await mailSender(
      enrolledStudent.email,
      `Payment Received`,
      paymentSuccessEmail(
        `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
        amount / 100,
        orderId,
        paymentId
      )
    );
  } catch (error) {
    console.log("error in sending mail", error);
    return res
      .status(400)
      .json({ success: false, message: "Could not send email" });
  }
};

const enrollStudents = async (courses, userId, res) => {
  if (!courses || !userId) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Please Provide Course ID and User ID",
      });
  }

  for (const courseId of courses) {
    try {
      const enrolledCourse = await Course.findOneAndUpdate(
        { _id: courseId },
        { $push: { studentsEnroled: userId } },
        { new: true }
      );

      if (!enrolledCourse) {
        return res
          .status(500)
          .json({ success: false, error: "Course not found" });
      }
      console.log("Updated course: ", enrolledCourse);

      const courseProgress = await CourseProgress.create({
        courseID: courseId,
        userId: userId,
        completedVideos: [],
      });

      const enrolledStudent = await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            courses: courseId,
            courseProgress: courseProgress._id,
          },
        },
        { new: true }
      );

      console.log("Enrolled student: ", enrolledStudent);

      const emailResponse = await mailSender(
        enrolledStudent.email,
        `Successfully Enrolled into ${enrolledCourse.courseName}`,
        courseEnrollmentEmail(
          enrolledCourse.courseName,
          `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
        )
      );

      console.log("Email sent successfully: ", emailResponse.response);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ success: false, error: error.message });
    }
  }
};


/**
 * ========================================
 * 💳 Payment Controller Summary
 * ========================================
 *
 * This controller manages the full payment and enrollment flow
 * for purchasing courses using Razorpay.
 *
 * 🔹 capturePayment (`exports.capturePayment`)
 *    - 🧾 Validates provided course IDs and checks if the user is already enrolled.
 *    - 🧮 Calculates the total price of selected courses.
 *    - 📦 Initiates a Razorpay order with the total amount.
 *    - 🛑 Responds with order details or errors if order creation fails.
 *
 * 🔹 verifyPayment (`exports.verifyPayment`)
 *    - 🔒 Verifies the Razorpay signature to ensure payment authenticity.
 *    - 📚 If valid, calls `enrollStudents()` to add the user to selected courses.
 *    - ✅ Responds with success or failure message.
 *
 * 🔹 sendPaymentSuccessEmail (`exports.sendPaymentSuccessEmail`)
 *    - 📧 Sends a payment receipt confirmation email after successful payment.
 *    - 📝 Uses a custom HTML email template for payment summary.
 *
 * 🔹 enrollStudents (Internal Function)
 *    - 🎓 Enrolls a user in one or more courses.
 *    - 👥 Updates:
 *        - `Course`: Adds user to `studentsEnroled` list.
 *        - `User`: Adds course ID and a new `CourseProgress` document.
 *    - 📤 Sends a course enrollment confirmation email to the user.
 *
 * 📌 Utilized Models:
 *    - `Course`, `User`, `CourseProgress`
 *
 * 🧰 Utilities:
 *    - Razorpay instance for payment initiation.
 *    - Node `crypto` for HMAC signature validation.
 *    - `mailSender` with templates: `courseEnrollmentEmail`, `paymentSuccessEmail`
 *
 * ✅ Use Case:
 *    - Called when a student initiates payment for course(s).
 *    - Ensures secure payment, updates course/user states, and sends notifications.
 *
 * ========================================
 */
