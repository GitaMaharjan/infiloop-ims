export declare const loginService: (email: string, password: string) => Promise<{
    accessToken: string;
    refreshToken: string;
    user: {
        id: import("mongoose").Types.ObjectId;
        email: string;
        role: import("../models/user.model.js").UserRole;
    };
}>;
//# sourceMappingURL=authSuperAdmin.service.d.ts.map