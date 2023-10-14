import { z } from "zod";

const loginSchema = z.object({
  body: z.object({
    wallet: z.string().min(0).max(255),
    signature: z.string().min(0).max(255),
  }),
});

const requestLoginKeySchema = z.object({
  params: z.object({
    wallet: z.string().min(0).max(255),
  }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type RequestLoginKeySchema = z.infer<typeof requestLoginKeySchema>;

export { loginSchema, requestLoginKeySchema };
