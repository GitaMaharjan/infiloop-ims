import { Types, type HydratedDocument } from "mongoose";
export interface IItem {
    name: string;
    SKU: string;
    categoryId: Types.ObjectId;
    unitId: Types.ObjectId;
    organizationId: Types.ObjectId;
    deletedAt: Date | null;
}
export type ItemDocument = HydratedDocument<IItem>;
export declare const Item: import("mongoose").Model<IItem, {}, {}, {}, import("mongoose").Document<unknown, {}, IItem, {}, import("mongoose").DefaultSchemaOptions> & IItem & {
    _id: Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, IItem>;
//# sourceMappingURL=product.model.d.ts.map