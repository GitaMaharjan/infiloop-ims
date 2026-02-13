import { Types, Schema, type HydratedDocument, model } from "mongoose";

export interface ICategory {
    name: string,
    organizationId: Types.ObjectId,
    deletedAt: Date | null,
}
export type CategoryDocument = HydratedDocument<ICategory>;

const CategorySchema = new Schema<ICategory>({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true

    },
    organizationId: {
        type: Types.ObjectId,
        ref: "Organization",
        required: true
    },
    deletedAt: {
        type: Date, default: null
    }


}, {
    timestamps: true
})

CategorySchema.index({ name: 1, organizationId: 1 }, { unique: true });

export const Category = model<ICategory>('Category', CategorySchema);