import { Types, Schema, type HydratedDocument, model } from "mongoose";



export interface IItem {
    name: string;
    SKU: string;
    categoryId: Types.ObjectId;
    unitId: Types.ObjectId;
    organizationId: Types.ObjectId;
    deletedAt: Date | null;
}

export type ItemDocument = HydratedDocument<IItem>;

const ItemSchema = new Schema<IItem>(
    {
        name: { type: String, required: true, trim: true },
        SKU: { type: String, required: true, trim: true },
        categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
        unitId: { type: Schema.Types.ObjectId, ref: 'Unit', required: true },
        organizationId: { type: Schema.Types.ObjectId, ref: 'Organization', required: true },
        deletedAt: { type: Date, default: null },
    },
    { timestamps: true }
);

// SKU must be unique per organization
ItemSchema.index({ SKU: 1, organizationId: 1 }, { unique: true });

export const Item = model<IItem>('Item', ItemSchema);
