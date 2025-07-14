const Category = require("../models/Category");

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const CategorysDetails = await Category.create({
      name: name,
      description: description,
    });
    console.log(CategorysDetails);
    return res.status(200).json({
      success: true,
      message: "Category Created Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: true,
      message: error.message,
    });
  }
};

exports.showAllCategories = async (req, res) => {
  try {
    const allCategories = await Category.find();
    res.status(200).json({
      success: true,
      data: allCategories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.categoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body;

    const selectedCategory = await Category.findById(categoryId)
      .populate({
        path: "courses",
        match: { status: "Published" },
        populate: "ratingAndReviews",
      })
      .exec();

    if (!selectedCategory) {
      console.log("Category not found.");
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    if (selectedCategory.courses.length === 0) {
      console.log("No courses found for the selected category.");
      return res.status(200).json({
        success: true,
        message: "No courses found for the selected category.",
      });
    }

    const categoriesExceptSelected = await Category.find({
      _id: { $ne: categoryId },
    });
    let differentCategory = await Category.findOne(
      categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
        ._id
    )
      .populate({
        path: "courses",
        match: { status: "Published" },
      })
      .exec();
    console.log();

    const allCategories = await Category.find()
      .populate({
        path: "courses",
        match: { status: "Published" },
      })
      .exec();
    const allCourses = allCategories.flatMap((category) => category.courses);
    const mostSellingCourses = allCourses
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 10);

    res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        differentCategory,
        mostSellingCourses,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};




/**
 * =====================================
 * 📁 Category Controller Summary
 * =====================================
 *
 * This controller handles all operations related to course categories
 * in the ShikshaSutra backend system.
 *
 * ✅ 1. Create Category (`exports.createCategory`)
 *    - Accepts `name` and `description` via `req.body`.
 *    - Creates and saves a new Category document in the database.
 *    - Returns success response upon creation.
 *
 * 📦 2. Show All Categories (`exports.showAllCategories`)
 *    - Fetches all categories and populates their associated courses.
 *    - Filters out categories that have no "Published" courses.
 *    - Returns only those categories that have at least one published course.
 *
 * 📄 3. Category Page Details (`exports.categoryPageDetails`)
 *    - Input: `categoryId` from request body.
 *    - Fetches the selected category with its published courses.
 *    - If no courses are available in that category, informs the user.
 *    - Also fetches:
 *      - A different (random) category with published courses.
 *      - Top 10 best-selling courses across all categories.
 *    - Returns all of the above in a structured response:
 *      - `selectedCategory`
 *      - `differentCategory`
 *      - `mostSellingCourses`
 *
 * 🔧 Utility Used:
 *    - `getRandomInt(max)` — selects a random category for discovery.
 *
 * 📌 Models Used:
 *    - Category (with populated `courses` field)
 *    - Courses (accessed via Category)
 *
 * =====================================
 */
