import Category from "../models/categoiesModel.js";
import { CloudinaryUpload } from "../service/Clodinary.upload.js";

export const insertCategories = async (req,res) => {
    try {
        const { name  } = req.body

        const imageLocalPath = req.file ? req.file.path : null;
        console.log(imageLocalPath)
        if (!imageLocalPath) {
            return res.status(400).json({ msg: "Please upload an image" });
        }
        const catagoryImage = await CloudinaryUpload(imageLocalPath);
        const newCategory = new Category({ name, image:catagoryImage.url });
        await newCategory.save();
        res.status(201).json({
            success: true,
            message: "Category inserted successfully",
            data: newCategory,
        });
    } catch (error) {
        console.error("Error inserting categories:", error);
    }
};

// Get Categories API
export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({
            success: true,
            message: "Categories fetched successfully",
            data: categories,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};
