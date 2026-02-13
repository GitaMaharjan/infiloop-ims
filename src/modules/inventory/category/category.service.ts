import type { Types } from "mongoose";
import { Category } from "./category.model.js";

export const createCategoryService = async (name: string, organizationId: Types.ObjectId) => {
    // Check if category already exists in this organization
    const existingData = await Category.findOne({ name, organizationId, deletedAt: null })
    if (existingData) {
        throw new Error("Category with this name already exists!")
    }
    const category = await Category.create({ name, organizationId })
    return category
}


export const getAllCategoriesService = async (organizationId: Types.ObjectId) => {
    const categories = await Category.find({
        organizationId,
        deletedAt: null
    }).sort({ createdAt: -1 });
    return categories
}

export const getCategoryByIdService = async (categoryId: string, organizationId: Types.ObjectId) => {
    const categoryData = await Category.findOne({
        _id: categoryId,
        organizationId,
        deletedAt: null
    })
    if (!categoryData) {
        throw new Error("Category not found");
    }

    return categoryData
}

// UPDATE CATEGORY
export const updateCategoryService = async (
    categoryId: string,
    name: string,
    organizationId: Types.ObjectId
) => {
    const existing = await Category.findOne({ name, organizationId, deletedAt: null });
    if (existing && existing._id.toString() !== categoryId) {
        throw new Error("Another category with this name already exists!");
    }

    const updated = await Category.findOneAndUpdate(
        { _id: categoryId, organizationId, deletedAt: null },
        { name },
        { new: true }
    );

    if (!updated) throw new Error("Category not found or deleted");
    return updated;
};

// SOFT DELETE CATEGORY
export const deleteCategoryService = async (categoryId: string, organizationId: Types.ObjectId) => {
    const deleted = await Category.findOneAndUpdate(
        { _id: categoryId, organizationId, deletedAt: null },
        { deletedAt: new Date() },
        { new: true }
    );
    if (!deleted) throw new Error("Category not found or already deleted");
    return deleted;
};
