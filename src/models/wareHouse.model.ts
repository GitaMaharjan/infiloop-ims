import { Types, Schema, type HydratedDocument, model } from "mongoose";

export interface IWarehouse {
    name: string;
    location?: string | undefined;
    organizationId: Types.ObjectId;
    deletedAt: Date | null;
}

// This type includes Mongoose document fields like _id, save(), etc.

export type WarehouseDocument = HydratedDocument<IWarehouse>;

const WarehouseSchema = new Schema<IWarehouse>(
    {
        name: { type: String, required: true, trim: true },
        location: { type: String, trim: true },
        organizationId: { type: Types.ObjectId, ref: 'Organization', required: true },
        deletedAt: { type: Date, default: null },
    },
    { timestamps: true }
);

// Unique name per organization
WarehouseSchema.index({ name: 1, organizationId: 1 }, { unique: true });

export const Warehouse = model<IWarehouse>('Warehouse', WarehouseSchema);
