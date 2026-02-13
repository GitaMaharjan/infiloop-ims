import { OrganizationStatus } from "../models/organization.model.js";
import { UserRole } from "../models/user.model.js";
export declare const registerOrganizationWithAdmin: (data: {
    name: string;
    address: string;
    contactPerson: {
        name: string;
        email: string;
        phone: string;
        designation: string;
    };
    password: string;
}) => Promise<{
    organization: {
        id: import("mongoose").Types.ObjectId;
        name: string;
        status: OrganizationStatus;
        code: string;
    };
    admin: {
        id: import("mongoose").Types.ObjectId;
        fullName: string;
        email: string;
    };
    message: string;
}>;
export declare const loginUserService: (email: string, password: string) => Promise<{
    accessToken: string;
    refreshToken: string;
    user: {
        id: import("mongoose").Types.ObjectId;
        fullName: string;
        email: string;
        role: UserRole;
        organizationId: import("mongoose").Types.ObjectId | null;
    };
}>;
//# sourceMappingURL=authOrganizationUser.service.d.ts.map