import { Schema, model, Document, type HydratedDocument } from 'mongoose';

export enum OrganizationStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED'
}
/**
 * Organization Interface
 * Removed manual createdAt/updatedAt as 'timestamps: true' handles them.
 */
export interface IOrganization {
    name: string;
    address: string;
    contactPerson: {
        name: string;
        email: string;
        phone: string;
        designation: string;
    }
    code: string;//autogenerate garr affai
    slug: string;
    status: OrganizationStatus;
    // Timestamps are added by Mongoose automatically
    createdAt: Date;
    updatedAt: Date;
}

export type OrganizationDocument = HydratedDocument<IOrganization>;

const OrganizationSchema = new Schema<IOrganization>(
    {
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
    },
    {
        timestamps: true // This automatically manages createdAt and updatedAt
    }
);

const slugify = (str: string): string => {
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
OrganizationSchema.pre('validate', async function (this: OrganizationDocument) {
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

export const Organization = model<IOrganization>('Organization', OrganizationSchema);