import { Organization, OrganizationStatus } from "../models/organization.model.js";
import { User, UserRole } from "../models/user.model.js";

export const approveOrganizationService = async (organizationId: string) => {
    // Find the organization
    const org = await Organization.findById(organizationId);
    if (!org) throw new Error("Organization not found");

    if (org.status === OrganizationStatus.APPROVED) {
        throw new Error("Organization is already approved");
    }

    //  Update organization status to APPROVED
    org.status = OrganizationStatus.APPROVED;
    await org.save();

    // Activate all ORG_ADMINs in this organization
    await User.updateMany(
        { organizationId: org._id, role: UserRole.ORG_ADMIN },
        { isActive: true }
    );

    return {
        organization: {
            id: org._id,
            name: org.name,
            status: org.status,
            code: org.code
        },
        message: "Organization approved successfully, ORG_ADMIN activated"
    };
};
