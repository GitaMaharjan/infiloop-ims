import { OrganizationStatus } from "../models/organization.model.js";
export declare const approveOrganizationService: (organizationId: string) => Promise<{
    organization: {
        id: import("mongoose").Types.ObjectId;
        name: string;
        status: OrganizationStatus.APPROVED;
        code: string;
    };
    message: string;
}>;
//# sourceMappingURL=superAdmin.service.d.ts.map