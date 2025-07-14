const mongoose = require("mongoose");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const CourseProgress = require("../models/CourseProgress");
const Course = require("../models/Course");

exports.updateCourseProgress = async (req, res) => {
  const { courseId, subsectionId } = req.body;
  const userId = req.user.id;

  try {
    const subsection = await SubSection.findById(subsectionId);
    if (!subsection) {
      return res.status(404).json({
        error: "Invalid subsection",
      });
    }
    let courseProgress = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    });
    if (!courseProgress) {
      return res.status(404).json({
        success: false,
        message: "Course progress Does Not Exist",
      });
    } else {
      if (courseProgress.completedVideos.includes(subsectionId)) {
        return res.status(400).json({
          error: "Subsection already completed",
        });
      }
      courseProgress.completedVideos.push(subsectionId);
    }
    await courseProgress.save();
    return res.status(200).json({
      message: "Course progress updated",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};


/**
 * ========================================
 * 📈 Course Progress Controller Summary
 * ========================================
 *
 * This controller handles the tracking and updating of a user's
 * progress through a course by marking completed subsections.
 *
 * 🔄 updateCourseProgress (`exports.updateCourseProgress`)
 *    - 🔢 Input: `courseId`, `subsectionId` (from req.body), `userId` (from req.user)
 *    - 🧩 Validates that the given subsection exists.
 *    - 📊 Looks up existing CourseProgress for the user and course.
 *      - If not found, returns a 404 error.
 *    - ✅ If the subsection is not already marked as complete:
 *      - Pushes the subsection ID into `completedVideos` array.
 *      - Saves the updated CourseProgress document.
 *    - 🧾 Responds with a success message or appropriate error.
 *
 * 📌 Utilized Models:
 *    - `SubSection` – For validating the subsection exists.
 *    - `CourseProgress` – To track user's progress in a course.
 *
 * ✅ Use Case:
 *    - Invoked when a user completes a video or content block in a course.
 *    - Helps in displaying progress bars, completion status, and unlocking new content.
 *
 * ========================================
 */
