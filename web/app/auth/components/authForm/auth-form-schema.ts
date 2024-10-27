import { z } from "zod";

const authFormSchema = z.object({
    email: z.string().email(),
    rememberMe: z.boolean().optional(),
});

export { authFormSchema };
