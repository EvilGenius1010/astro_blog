import { defineCollection, z } from 'astro:content';

const seoSchema = z.object({
    title: z.string().min(5).max(120).optional(),
    description: z.string().min(15).max(160).optional(),
    image: z
        .object({
            src: z.string(),
            alt: z.string().optional()
        })
        .optional(),
    pageType: z.enum(['website', 'article']).default('website')
});

const devlogs = defineCollection({
    schema: z.object({
        title: z.string(),
        excerpt: z.string().optional(),
        publishDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        isFeatured: z.boolean().default(false),
        tags: z.array(z.string()).default([]),
        seo: seoSchema.optional()
    })
});

const pages = defineCollection({
    schema: z.object({
        title: z.string(),
        seo: seoSchema.optional()
    })
});

// Define a reusable SEO type from the schema
type SeoType = z.infer<typeof seoSchema>;

// Define the TypeScript type for the figuringitout collection schema
type FiguringItOutSchema = {
    title: string;
    parentArticle: string; // Must match one of the devlogs' slugs
    description: string;
    publishDate: Date;
    isFeatured: boolean;
    seo?: SeoType;
};


const figuringitout = defineCollection({
    // schema: async ():  Promise<
    // z.ZodObject<{
    //     title: z.ZodString;
    //     // parentArticle: z.ZodEffects<z.ZodString, string, string>;
    //     description: z.ZodOptional<z.ZodString>;
    //     publishDate: z.ZodDate;
    //     isFeatured: z.ZodDefault<z.ZodBoolean>;
    //     seo: z.ZodOptional<typeof seoSchema>;
    // }>>=> {
    //     // Get all devlogs' slugs dynamically
    //     const devlogEntries = await getCollection('devlogs');
    //     const devlogSlugs = devlogEntries.map(entry => entry.slug);

    //     // Return the schema
    //     return z.object({
    //         title: z.string(),
    //         parentArticle: z
    //             .string()
    //             .refine(
    //                 (slug) => devlogSlugs.includes(slug),
    //                 { message: "parentArticle must reference an existing devlogs entry." }
    //             ),
    //         description: z.string().optional(),
    //         publishDate: z.coerce.date(),
    //         isFeatured: z.boolean().default(false),
    //         seo: seoSchema.optional()
    //     });
    // }

    schema:z.object({
            title: z.string(),
            description: z.string().optional(),
            publishDate: z.coerce.date(),
            isFeatured: z.boolean().default(false),
            seo: seoSchema.optional()
        })
});
;

export const collections = { devlogs, pages, figuringitout };
