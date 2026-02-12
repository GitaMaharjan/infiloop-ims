import { Organization, OrganizationStatus } from "../models/organization.model.js";
import { User, UserRole } from "../models/user.model.js";

export const registerOrganizationWithAdmin = async (data: {
    name: string;
    address: string;
    contactPerson: {
        name: string;
        email: string;
        phone: string;
        designation: string;
    };
    password: string;
}) => {
    const { name, address, contactPerson, password } = data;

    // Check if organization name exists
    const orgExists = await Organization.findOne({ name });
    if (orgExists) throw new Error("Organization with this name already exists");

    //Check if contact email is already used
    const userExists = await User.findOne({ email: contactPerson.email });
    if (userExists) throw new Error("Admin email already exists");

    // Create Organization (status PENDING, isActive false)
    const newOrg = await Organization.create({
        name,
        address,
        contactPerson,
        status: OrganizationStatus.PENDING
    });

    //  Create ORG_ADMIN (inactive until org approved)
    const newAdmin = await User.create({
        fullName: contactPerson.name,
        email: contactPerson.email,
        password,
        role: UserRole.ORG_ADMIN,
        organizationId: newOrg._id,
        isActive: false // cannot login yet
    });

    return {
        organization: {
            id: newOrg._id,
            name: newOrg.name,
            status: newOrg.status,
            code: newOrg.code
        },
        admin: {
            id: newAdmin._id,
            fullName: newAdmin.fullName,
            email: newAdmin.email
        },
        message: "Organization and Admin registered successfully. Awaiting SUPER_ADMIN approval."
    };
};
