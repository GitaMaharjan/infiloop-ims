import { Types, Schema, model } from "mongoose";
const ItemSchema = new Schema({
    name: { type: String, required: true, trim: true },
    SKU: { type: String, required: true, trim: true },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    unitId: { type: Schema.Types.ObjectId, ref: 'Unit', required: true },
    organizationId: { type: Schema.Types.ObjectId, ref: 'Organization', required: true },
    deletedAt: { type: Date, default: null },
}, { timestamps: true });
// SKU must be unique per organization
ItemSchema.index({ SKU: 1, organizationId: 1 }, { unique: true });
export const Item = model('Item', ItemSchema);
//# sourceMappingURL=product.model.js.map