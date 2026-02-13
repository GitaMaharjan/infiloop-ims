import { Types, Schema, model } from "mongoose";
const CategorySchema = new Schema({
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
});
CategorySchema.index({ name: 1, organizationId: 1 }, { unique: true });
export const Category = model('Category', CategorySchema);
//# sourceMappingURL=category.model.js.map