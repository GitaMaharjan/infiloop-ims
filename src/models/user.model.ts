import { Schema, model, Types, Document, type HydratedDocument } from 'mongoose';
import bcrypt from 'bcrypt';

export enum UserRole {
    SUPER_ADMIN = 'SUPER_ADMIN',
    ORG_ADMIN = 'ORG_ADMIN',
    STAFF = 'STAFF'
}
export interface IUser extends Document {
    fullName: string;
    email: string;
    password: string;
    role: UserRole;
    organizationId: Types.ObjectId | null,
    isActive: boolean;
    deletedAt: Date | null;
    comparePassword(candidatePassword: string): Promise<boolean>;
}
export type UserDocument = HydratedDocument<IUser>;

const UserSchema = new Schema<IUser>({
    fullName: {
        type: String,
        required: true,
        trim: true

    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false // Exclude password from query results by default
    },
    role: {
        type: String,
        enum: Object.values(UserRole),
        default: UserRole.STAFF
    },
    organizationId: {
        type: Schema.Types.ObjectId,
        ref: 'Organization',
        default: null,
        // Only required if role is NOT Super Admin
        required: function (this: UserDocument) {
            return this.role !== UserRole.SUPER_ADMIN;
        }
    },

    isActive: {
        type: Boolean,
        default: true
    },
    deletedAt: { type: Date, default: null },

}, {
    timestamps: true
});

/**
 * Password Hashing Middleware
 * Hashes password before saving if it's new or modified.
 */
UserSchema.pre<UserDocument>('save', async function () {
    // Hash password
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }

    // Role-org consistency
    if (this.role === UserRole.SUPER_ADMIN) {
        this.organizationId = null;
    }
});


UserSchema.methods.comparePassword = async function (candidatePassword: string) {
    if (!this.password) throw new Error('Password not set or selected');
    return bcrypt.compare(candidatePassword, this.password);
};



export const User = model<UserDocument>('User', UserSchema);
