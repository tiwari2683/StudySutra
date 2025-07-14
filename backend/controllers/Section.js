const Section = require("../models/Section");
const Course = require("../models/Course");
const SubSection = require("../models/SubSection");

/**
 * Creates a new section and associates it with a course.
 */
exports.createSection = async (req, res) => {
  try {
    const { sectionName, courseId } = req.body;

    if (!sectionName || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Missing required properties",
      });
    }

    // Create new section
    const newSection = await Section.create({ sectionName });

    // Update course to include the new section
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          courseContent: newSection._id,
        },
      },
      { new: true }
    )
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    res.status(200).json({
      success: true,
      message: "Section created successfully",
      updatedCourse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

/**
 * Updates the name of an existing section.
 */
exports.updateSection = async (req, res) => {
  try {
    const { sectionName, sectionId, courseId } = req.body;

    // Update section name
    const section = await Section.findByIdAndUpdate(
      sectionId,
      { sectionName },
      { new: true }
    );

    // Fetch updated course with populated sections and subsections
    const course = await Course.findById(courseId)
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    res.status(200).json({
      success: true,
      message: section,
      data: course,
    });
  } catch (error) {
    console.error("Error updating section:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

/**
 * Deletes a section and its associated subsections from a course.
 */
exports.deleteSection = async (req, res) => {
  try {
    const { sectionId, courseId } = req.body;

    // Remove section from course
    await Course.findByIdAndUpdate(courseId, {
      $pull: {
        courseContent: sectionId,
      },
    });

    const section = await Section.findById(sectionId);
    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    // Delete all associated subsections
    await SubSection.deleteMany({ _id: { $in: section.subSection } });

    // Delete the section itself
    await Section.findByIdAndDelete(sectionId);

    // Return updated course
    const course = await Course.findById(courseId)
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    res.status(200).json({
      success: true,
      message: "Section deleted",
      data: course,
    });
  } catch (error) {
    console.error("Error deleting section:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

/**
 * ============================================
 * 📚 Section Controller Summary
 * ============================================
 *
 * Manages creation, update, and deletion of course sections,
 * including handling nested subsections and course relationships.
 *
 * 🔹 createSection
 *    - ➕ Creates a new section and links it to a course.
 *    - 🧾 Expects `sectionName` and `courseId`.
 *    - 🔁 Updates course's `courseContent` with new section.
 *    - 📥 Populates section and subsection data for frontend.
 *
 * 🔹 updateSection
 *    - 📝 Updates the name of an existing section.
 *    - 🔄 Returns updated course data with nested subsections.
 *
 * 🔹 deleteSection
 *    - ❌ Removes a section from a course.
 *    - 🧹 Deletes all associated subsections.
 *    - 🔄 Returns updated course structure after cleanup.
 *
 * 🧩 Data Relationships:
 *    - A `Course` contains multiple `Sections` in `courseContent`.
 *    - Each `Section` contains multiple `SubSections`.
 *    - Populating both levels ensures a complete course outline.
 *
 * ⚙️ Utilized Models:
 *    - `Course`: Main course model.
 *    - `Section`: Individual sections within a course.
 *    - `SubSection`: Nested content under a section.
 *
 * ============================================
 */
