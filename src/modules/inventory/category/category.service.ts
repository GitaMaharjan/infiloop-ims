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

export const getCategoryByIdService = async (id: string, organizationId: Types.ObjectId) => {
    const categoryData = await Category.findOne({
        _id: id,
        organizationId,
        deletedAt: null
    })
    return categoryData
}