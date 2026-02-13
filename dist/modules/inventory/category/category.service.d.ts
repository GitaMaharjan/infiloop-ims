import type { Types } from "mongoose";
export declare const createCategoryService: (name: string, organizationId: Types.ObjectId) => Promise<import("mongoose").Document<unknown, {}, import("./category.model.js").ICategory, {}, import("mongoose").DefaultSchemaOptions> & import("./category.model.js").ICategory & {
    _id: Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}>;
export declare const getAllCategoriesService: (organizationId: Types.ObjectId) => Promise<(import("mongoose").Document<unknown, {}, import("./category.model.js").ICategory, {}, import("mongoose").DefaultSchemaOptions> & import("./category.model.js").ICategory & {
    _id: Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
})[]>;
export declare const getCategoryByIdService: (categoryId: string, organizationId: Types.ObjectId) => Promise<import("mongoose").Document<unknown, {}, import("./category.model.js").ICategory, {}, import("mongoose").DefaultSchemaOptions> & import("./category.model.js").ICategory & {
    _id: Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}>;
export declare const updateCategoryService: (categoryId: string, name: string, organizationId: Types.ObjectId) => Promise<import("mongoose").Document<unknown, {}, import("./category.model.js").ICategory, {}, import("mongoose").DefaultSchemaOptions> & import("./category.model.js").ICategory & {
    _id: Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}>;
export declare const deleteCategoryService: (categoryId: string, organizationId: Types.ObjectId) => Promise<import("mongoose").Document<unknown, {}, import("./category.model.js").ICategory, {}, import("mongoose").DefaultSchemaOptions> & import("./category.model.js").ICategory & {
    _id: Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}>;
//# sourceMappingURL=category.service.d.ts.map