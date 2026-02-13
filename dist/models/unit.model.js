import { Types, Schema, model } from "mongoose";
const UnitSchema = new Schema({
    name: { type: String, required: true, trim: true },
    organizationId: { type: Schema.Types.ObjectId, ref: 'Organization', required: true },
    deletedAt: { type: Date, default: null },
}, { timestamps: true });
// Unique per organization
UnitSchema.index({ name: 1, organizationId: 1 }, { unique: true });
export const Unit = model('Unit', UnitSchema);
//# sourceMappingURL=unit.model.js.map