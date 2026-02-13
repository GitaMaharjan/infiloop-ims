import { approveOrganizationService } from "../services/superAdmin.service.js";
export const approveOrganizationController = async (req, res) => {
    try {
        // const organizationId = req.params.organizationId as string;
        const { organizationId } = req.params;
        if (!organizationId || Array.isArray(organizationId)) {
            return res.status(400).json({ success: false, message: "Invalid organizationId" });
        }
        const result = await approveOrganizationService(organizationId);
        return res.status(200).json({
            success: true,
            ...result
        });
    }
    catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};
//# sourceMappingURL=superAdmin.controller.js.map