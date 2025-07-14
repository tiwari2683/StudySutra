const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
const mongoose = require("mongoose");

exports.createRating = async (req, res) => {
  try {
    const userId = req.user.id;
    const { rating, review, courseId } = req.body;

    const courseDetails = await Course.findOne({
      _id: courseId,
      studentsEnroled: { $elemMatch: { $eq: userId } },
    });

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Student is not enrolled in this course",
      });
    }

    const alreadyReviewed = await RatingAndReview.findOne({
      user: userId,
      course: courseId,
    });

    if (alreadyReviewed) {
      return res.status(403).json({
        success: false,
        message: "Course already reviewed by user",
      });
    }

    const ratingReview = await RatingAndReview.create({
      rating,
      review,
      course: courseId,
      user: userId,
    });

    await Course.findByIdAndUpdate(courseId, {
      $push: {
        ratingAndReviews: ratingReview,
      },
    });
    await courseDetails.save();

    return res.status(201).json({
      success: true,
      message: "Rating and review created successfully",
      ratingReview,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.getAverageRating = async (req, res) => {
  try {
    const courseId = req.body.courseId;

    const result = await RatingAndReview.aggregate([
      {
        $match: {
          course: new mongoose.Types.ObjectId(courseId),
        },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
        },
      },
    ]);

    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        averageRating: result[0].averageRating,
      });
    }

    return res.status(200).json({ success: true, averageRating: 0 });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve the rating for the course",
      error: error.message,
    });
  }
};

exports.getAllRatingReview = async (req, res) => {
  try {
    const allReviews = await RatingAndReview.find({})
      .sort({ rating: "desc" })
      .populate({
        path: "user",
        select: "firstName lastName email image",
      })
      .populate({
        path: "course",
        select: "courseName",
      })
      .exec();

    res.status(200).json({
      success: true,
      data: allReviews,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve the rating and review for the course",
      error: error.message,
    });
  }
};


/**
 * ============================================
 * ⭐ Rating and Review Controller Summary
 * ============================================
 *
 * Handles creation, retrieval, and aggregation of course reviews
 * and ratings submitted by enrolled students.
 *
 * 🔹 createRating
 *    - ✍️ Allows enrolled students to submit a rating and review for a course.
 *    - ✅ Prevents duplicate submissions per user per course.
 *    - 📌 Saves review to `RatingAndReview` collection and updates the course's reference.
 *
 * 🔹 getAverageRating
 *    - 📊 Calculates the average rating of a course using MongoDB aggregation.
 *    - 🟢 Returns 0 if there are no reviews yet.
 *
 * 🔹 getAllRatingReview
 *    - 🔍 Retrieves all reviews across the platform.
 *    - 🧾 Populates user (name, email, image) and course (name) details for each review.
 *    - 🔽 Sorted by rating in descending order.
 *
 * 📌 Utilized Models:
 *    - `RatingAndReview`, `Course`
 *
 * 🔒 Permissions & Checks:
 *    - Users must be enrolled in the course to leave a review.
 *    - Each user can only review a course once.
 *
 * ✅ Use Case:
 *    - Enables students to share feedback.
 *    - Helps instructors and admins view course popularity and reception.
 *    - Supports displaying average ratings and full reviews on course pages.
 *
 * ============================================
 */
