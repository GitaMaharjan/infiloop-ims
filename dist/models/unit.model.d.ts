import { Types, type HydratedDocument } from "mongoose";
export interface IUnit {
    name: string;
    organizationId: Types.ObjectId;
    deletedAt: Date | null;
}
export type UnitDocument = HydratedDocument<IUnit>;
export declare const Unit: import("mongoose").Model<IUnit, {}, {}, {}, import("mongoose").Document<unknown, {}, IUnit, {}, import("mongoose").DefaultSchemaOptions> & IUnit & {
    _id: Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, IUnit>;
//# sourceMappingURL=unit.model.d.ts.map