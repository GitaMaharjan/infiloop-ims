import { z } from "zod";
export declare const createCategorySchema: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export type CreateCategoryInput = z.infer<typeof createCategorySchema>["body"];
//# sourceMappingURL=category.validation.d.ts.map