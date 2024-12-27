import { z } from "zod";

export const IFormLogin = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export type TFormLoginSchema = z.infer<typeof IFormLogin>;
