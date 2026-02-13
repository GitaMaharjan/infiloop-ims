import { Types, type HydratedDocument } from "mongoose";
export interface ICategory {
    name: string;
    organizationId: Types.ObjectId;
    deletedAt: Date | null;
}
export type CategoryDocument = HydratedDocument<ICategory>;
export declare const Category: import("mongoose").Model<ICategory, {}, {}, {}, import("mongoose").Document<unknown, {}, ICategory, {}, import("mongoose").DefaultSchemaOptions> & ICategory & {
    _id: Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, ICategory>;
//# sourceMappingURL=category.model.d.ts.map