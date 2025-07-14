const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const { uploadImageToCloudinary } = require("../utils/ImageUploader");

exports.createSubSection = async (req, res) => {
  try {
    const { sectionId, title, description } = req.body;
    if (!req.files || !req.files.video) {
      return res.status(400).json({ success: false, message: "No video file uploaded" });
    }
    const video = req.files.video;

    if (!sectionId || !title || !description || !video) {
      return res
        .status(404)
        .json({ success: false, message: "All Fields are Required" });
    }
    console.log(video);

    const uploadDetails = await uploadImageToCloudinary(
      video,
      process.env.FOLDER_NAME
    );
    console.log(uploadDetails);

    const SubSectionDetails = await SubSection.create({
      title: title,
      timeDuration: `${uploadDetails.duration}`,
      description: description,
      videoUrl: uploadDetails.secure_url,
    });

    const updatedSection = await Section.findByIdAndUpdate(
      { _id: sectionId },
      { $push: { subSection: SubSectionDetails._id } },
      { new: true }
    ).populate("subSection");

    return res.status(200).json({ success: true, data: updatedSection });
  } catch (error) {
    console.error("Error creating new sub-section:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.updateSubSection = async (req, res) => {
  try {
    const { sectionId, subSectionId, title, description } = req.body;
    const subSection = await SubSection.findById(subSectionId);

    if (!subSection) {
      return res.status(404).json({
        success: false,
        message: "SubSection not found",
      });
    }

    if (title !== undefined) {
      subSection.title = title;
    }

    if (description !== undefined) {
      subSection.description = description;
    }
    if (req.files && req.files.video !== undefined) {
      const video = req.files.video;
      const uploadDetails = await uploadImageToCloudinary(
        video,
        process.env.FOLDER_NAME
      );
      subSection.videoUrl = uploadDetails.secure_url;
      subSection.timeDuration = `${uploadDetails.duration}`;
    }

    await subSection.save();

    const updatedSection = await Section.findById(sectionId).populate(
      "subSection"
    );

    console.log("updated section", updatedSection);

    return res.json({
      success: true,
      message: "Section updated successfully",
      data: updatedSection,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the section",
    });
  }
};

exports.deleteSubSection = async (req, res) => {
  try {
    const { subSectionId, sectionId } = req.body;
    await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $pull: {
          subSection: subSectionId,
        },
      }
    );
    const subSection = await SubSection.findByIdAndDelete({
      _id: subSectionId,
    });

    if (!subSection) {
      return res
        .status(404)
        .json({ success: false, message: "SubSection not found" });
    }

    const updatedSection = await Section.findById(sectionId).populate(
      "subSection"
    );

    return res.json({
      success: true,
      message: "SubSection deleted successfully",
      data: updatedSection,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the SubSection",
    });
  }
};


/**
 * ============================================
 * 🎬 SubSection Controller Summary
 * ============================================
 *
 * Manages the creation, updating, and deletion of subsections within a section.
 * Each subsection typically contains a video along with metadata like title,
 * duration, and description.
 *
 * 🔹 createSubSection
 *    - ➕ Creates a new subsection for a specific section.
 *    - 📥 Requires `sectionId`, `title`, `description`, and `video` file.
 *    - ☁️ Uploads video to Cloudinary using `uploadImageToCloudinary`.
 *    - 🔗 Links the new subsection to its parent section.
 *    - 🔄 Returns the updated section with populated subsections.
 *
 * 🔹 updateSubSection
 *    - ✏️ Updates a specific subsection's `title`, `description`, or video.
 *    - ⚙️ Optionally updates the video if a new one is uploaded.
 *    - 🗂 Updates `videoUrl` and `timeDuration` accordingly.
 *    - 🔄 Returns the updated parent section with populated subsections.
 *
 * 🔹 deleteSubSection
 *    - ❌ Deletes a subsection from a given section.
 *    - 🔍 Uses `subSectionId` and `sectionId` to unlink and remove it.
 *    - 🔄 Returns the updated section after deletion.
 *
 * 📌 Key Functional Highlights:
 *    - Uses `Cloudinary` for video storage and metadata extraction.
 *    - Populates related `subSection` documents in `Section` for full context.
 *    - Validates all required fields and gracefully handles missing resources.
 *
 * 🧩 Models & Utilities:
 *    - `Section`: Contains array of `subSection` IDs.
 *    - `SubSection`: Stores video metadata (URL, duration, etc.).
 *    - `uploadImageToCloudinary`: Utility to handle file uploads.
 *
 * ============================================
 */
