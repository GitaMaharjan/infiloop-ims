import { Schema, model, Types, Document } from 'mongoose';
import bcrypt from 'bcrypt';
export var UserRole;
(function (UserRole) {
    UserRole["SUPER_ADMIN"] = "SUPER_ADMIN";
    UserRole["ORG_ADMIN"] = "ORG_ADMIN";
    UserRole["STAFF"] = "STAFF";
})(UserRole || (UserRole = {}));
const UserSchema = new Schema({
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
        required: function () {
            return this.role !== UserRole.SUPER_ADMIN;
        }
    },
    isActive: {
        type: Boolean,
        default: false
    },
    refreshToken: {
        type: String,
        default: null,
        select: false // never expose in queries
    },
    deletedAt: { type: Date, default: null },
}, {
    timestamps: true
});
/**
 * Password Hashing Middleware
 * Hashes password before saving if it's new or modified.
 */
UserSchema.pre('save', async function () {
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
UserSchema.methods.comparePassword = async function (candidatePassword) {
    if (!this.password)
        throw new Error('Password not set or selected');
    return bcrypt.compare(candidatePassword, this.password);
};
export const User = model('User', UserSchema);
//# sourceMappingURL=user.model.js.map