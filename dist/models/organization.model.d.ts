import { Document, type HydratedDocument } from 'mongoose';
export declare enum OrganizationStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED"
}
/**
 * Organization Interface
 * Removed manual createdAt/updatedAt as 'timestamps: true' handles them.
 */
export interface IOrganization {
    name: string;
    address: string;
    contactPerson: {
        name: string;
        email: string;
        phone: string;
        designation: string;
    };
    code: string;
    slug: string;
    status: OrganizationStatus;
    createdAt: Date;
    updatedAt: Date;
}
export type OrganizationDocument = HydratedDocument<IOrganization>;
export declare const Organization: import("mongoose").Model<IOrganization, {}, {}, {}, Document<unknown, {}, IOrganization, {}, import("mongoose").DefaultSchemaOptions> & IOrganization & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, IOrganization>;
//# sourceMappingURL=organization.model.d.ts.map