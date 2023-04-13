import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  parent_id: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
  },
  description: {
    type: String,
    default: null,
  },
  image: {
    url: String,
    public_id: String,
  },
});

//https://stackoverflow.com/questions/71203103/mongodb-unlimited-nested-category-sub-category-and-sub-sub-category-and-so-on
// export mongoose.model('Category', CategorySchema);

// // Create category
// import { Category } from "./model/category.model"
// const createCategory = async (data) => {
//     try {
//         return await new Category(data).save()
//     } catch (err) {
//         console.log(err)
//     }
// }

// // Get all category
// const getAllCategory = async () => {
//     try {
//         const categories = await Category.find({});
//         if (!categories) return [];
//         return nestedCategories(categories);
//     } catch (err) {
//         console.log(err);
//     }
// }

// function nestedCategories(categories, parentId = null) {
//     const categoryList = [];
//     let category;
//     if (parentId == null) {
//         category = categories.filter(cat => cat.parent_id == null);
//     } else {
//         category = categories.filter(cat => String(cat.parent_id) == String(parentId));
//     }

//     for (let cate of category) {
//         categoryList.push({
//             _id: cate._id,
//             name: cate.name,
//             slug: cate.slug,
//             children: nestedCategories(categories, cate._id)
//         })
//     }
//     return categoryList;
// }

// const mongoose = require("mongoose");
// const categorySchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     slug: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     type: {
//       type: String,
//     },
//     categoryImage: { type: String },
//     parentId: {
//       type: String,
//     },
//     createdBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Category", categorySchema);
