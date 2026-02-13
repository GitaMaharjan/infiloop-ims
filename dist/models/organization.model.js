import { Schema, model, Document } from 'mongoose';
export var OrganizationStatus;
(function (OrganizationStatus) {
    OrganizationStatus["PENDING"] = "PENDING";
    OrganizationStatus["APPROVED"] = "APPROVED";
    OrganizationStatus["REJECTED"] = "REJECTED";
})(OrganizationStatus || (OrganizationStatus = {}));
const OrganizationSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    address: {
        type: String,
        trim: true
    },
    contactPerson: {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true },
        phone: { type: String, required: true, trim: true },
        designation: { type: String, required: true, trim: true }
    },
    code: {
        type: String,
        unique: true,
        uppercase: true,
        trim: true
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
        // Removed 'required: true' because it is generated in the pre-validate hook
    },
    status: {
        type: String,
        enum: Object.values(OrganizationStatus),
        default: OrganizationStatus.PENDING
    }
}, {
    timestamps: true // This automatically manages createdAt and updatedAt
});
const slugify = (str) => {
    return str
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
};
/**
 * FIXED MIDDLEWARE
 * By using an async function without the 'next' parameter,
 * we satisfy the Mongoose TS overloads perfectly.
 */
OrganizationSchema.pre('validate', async function () {
    if (this.isModified('name') || this.isNew) {
        if (this.name) {
            this.slug = slugify(this.name);
        }
    }
    if (!this.code) {
        this.code = 'ORG-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    }
});
// Explicit indexes for production performance
// OrganizationSchema.index({ slug: 1 }, { unique: true });
// OrganizationSchema.index({ code: 1 }, { unique: true });
export const Organization = model('Organization', OrganizationSchema);
//# sourceMappingURL=organization.model.js.map