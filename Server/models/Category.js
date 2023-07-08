const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
    image: {
      url: String,
      public_id: String,
    },
    categoryPath: {
      type: String,
    },
  },
  { timestamps: true }
);

categorySchema.pre("save", async function (next) {
  let category = this;
  console.log("category1", category);
  let categoryPath = [];
  console.log("inide Pre");

  // while (category?.parentId) {
  //   category = await Category.findById(category.parentId);
  //   console.log("category.name", category.name);
  //   categoryPath.push(category.name);
  // }
  if (category.parentId) {
    const parentCategory = await Category.findOne({ _id: category.parentId });
    // Set the category's categoryPath
    category.categoryPath =
      parentCategory.categoryPath + "/" + category.name.toLowerCase();
    categoryPath.push(category?.categoryPath);
  } else {
    // If the category doesn't have a parent ID,
    // set its categoryPath to its own name
    category.categoryPath = category.name;
  }
  // console.log("categoryPath.reverse()", categoryPath.reverse());
  // console.log("categoryPath.push(this.name)", categoryPath.push(this.name));
  // category.categoryPath = categoryPath.join("/");
  next();
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
