import { Types, Document, type HydratedDocument } from 'mongoose';
export declare enum UserRole {
    SUPER_ADMIN = "SUPER_ADMIN",
    ORG_ADMIN = "ORG_ADMIN",
    STAFF = "STAFF"
}
export interface IUser extends Document {
    fullName: string;
    email: string;
    password: string;
    role: UserRole;
    organizationId: Types.ObjectId | null;
    isActive: boolean;
    refreshToken: string | null;
    deletedAt: Date | null;
    comparePassword(candidatePassword: string): Promise<boolean>;
}
export type UserDocument = HydratedDocument<IUser>;
export declare const User: import("mongoose").Model<Document<unknown, {}, IUser, {}, import("mongoose").DefaultSchemaOptions> & IUser & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, {}, {}, {}, Document<unknown, {}, Document<unknown, {}, IUser, {}, import("mongoose").DefaultSchemaOptions> & IUser & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, {}, import("mongoose").DefaultSchemaOptions> & Document<unknown, {}, IUser, {}, import("mongoose").DefaultSchemaOptions> & IUser & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, Document<unknown, {}, IUser, {}, import("mongoose").DefaultSchemaOptions> & IUser & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}>;
//# sourceMappingURL=user.model.d.ts.map