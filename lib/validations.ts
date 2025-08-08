import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const signUpSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters").optional(),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const userProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  email: z.string().email("Invalid email address"),
});
export const workflowSchema = z.object({
  name: z
    .string()
    .min(1, "Workflow name is required")
    .max(100, "Name too long"),
  description: z.string().max(500, "Description too long").optional(),
});

export const nodeDataSchema = z.object({
  label: z.string().min(1, "Label is required"),
  config: z.record(z.string(), z.any()).optional(),
});

export type SignInData = z.infer<typeof signInSchema>;
export type SignUpData = z.infer<typeof signUpSchema>;
export type WorkflowData = z.infer<typeof workflowSchema>;
export type NodeData = z.infer<typeof nodeDataSchema>;
export type UserProfileData = z.infer<typeof userProfileSchema>;
