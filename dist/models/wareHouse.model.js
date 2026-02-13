import { Types, Schema, model } from "mongoose";
const WarehouseSchema = new Schema({
    name: { type: String, required: true, trim: true },
    location: { type: String, trim: true },
    organizationId: { type: Types.ObjectId, ref: 'Organization', required: true },
    deletedAt: { type: Date, default: null },
}, { timestamps: true });
// Unique name per organization
WarehouseSchema.index({ name: 1, organizationId: 1 }, { unique: true });
export const Warehouse = model('Warehouse', WarehouseSchema);
//# sourceMappingURL=wareHouse.model.js.map