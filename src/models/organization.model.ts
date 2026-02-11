import { Schema, model, Document, type HydratedDocument } from 'mongoose';

/**
 * Organization Interface
 * Removed manual createdAt/updatedAt as 'timestamps: true' handles them.
 */
export interface IOrganization {
    name: string;
    code: string;
    slug: string;
    isActive: boolean;
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
        code: {
            type: String,
            required: true,
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
        isActive: {
            type: Boolean,
            default: false
        },
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
});

// Explicit indexes for production performance
OrganizationSchema.index({ slug: 1 }, { unique: true });
OrganizationSchema.index({ code: 1 }, { unique: true });

export const Organization = model<IOrganization>('Organization', OrganizationSchema);