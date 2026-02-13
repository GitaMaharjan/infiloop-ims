import { Types, type HydratedDocument } from "mongoose";
export interface IWarehouse {
    name: string;
    location?: string | undefined;
    organizationId: Types.ObjectId;
    deletedAt: Date | null;
}
export type WarehouseDocument = HydratedDocument<IWarehouse>;
export declare const Warehouse: import("mongoose").Model<IWarehouse, {}, {}, {}, import("mongoose").Document<unknown, {}, IWarehouse, {}, import("mongoose").DefaultSchemaOptions> & IWarehouse & {
    _id: Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, IWarehouse>;
//# sourceMappingURL=wareHouse.model.d.ts.map