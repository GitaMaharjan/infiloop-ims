import { Types, Schema, type HydratedDocument, model } from "mongoose";

export interface IUnit {
    name: string; // e.g., 'kg', 'pcs'
    organizationId: Types.ObjectId;
    deletedAt: Date | null;
}

export type UnitDocument = HydratedDocument<IUnit>;

const UnitSchema = new Schema<IUnit>(
    {
        name: { type: String, required: true, trim: true },
        organizationId: { type: Schema.Types.ObjectId, ref: 'Organization', required: true },
        deletedAt: { type: Date, default: null },
    },
    { timestamps: true }
);

// Unique per organization
UnitSchema.index({ name: 1, organizationId: 1 }, { unique: true });

export const Unit = model<IUnit>('Unit', UnitSchema);
