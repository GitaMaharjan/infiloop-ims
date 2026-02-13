import { Types } from 'mongoose';
export interface TokenPayload {
    userId: Types.ObjectId;
    role: string;
    organizationId: Types.ObjectId | null;
}
export declare const signToken: (payload: TokenPayload) => string;
export declare const verifyToken: (token: string) => TokenPayload;
//# sourceMappingURL=jwt.d.ts.map