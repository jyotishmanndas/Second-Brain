import { z } from "zod"

export const signUpSchema = z.object({
    email: z.string().email({ message: "Invalid email format" }),
    name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
    password: z.string()
        .min(8, { message: 'Password must be at least 8 characters long' })
        .max(20, { message: "Password must be at most 20 characters long" })
        .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
        .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
        .regex(/[0-9]/, { message: 'Password must contain at least one number' })
        .regex(/[@$!%*?&]/, { message: 'Password must contain at least one special character' }),
});

export const signInschema = z.object({
    email: z.string().email({ message: "Invalid email format" }),
    password: z.string()
        .min(6, { message: 'Password must be at least 6 characters long' })
        .max(20, { message: "Password must be at most 20 characters long" })
        .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
        .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
        .regex(/[0-9]/, { message: 'Password must contain at least one number' })
        .regex(/[@$!%*?&]/, { message: 'Password must contain at least one special character' }),
});

export const contentSchema = z.object({
    title: z.string().min(1).max(20, { message: "Title is required" }),
    link: z.string().url().min(1, { message: "Invalid url" }),
    tags: z.array(z.string()).min(1, { message: "Atleat one tag is required" })
});

export const profileUpdateSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
    newPassword: z.string()
        .min(6, { message: 'Password must be at least 6 characters long' })
        .max(20, { message: "Password must be at most 20 characters long" })
        .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
        .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
        .regex(/[0-9]/, { message: 'Password must contain at least one number' })
        .regex(/[@$!%*?&]/, { message: 'Password must contain at least one special character' }),
    confirmPassword: z.string()
        .min(6, { message: 'Password must be at least 6 characters long' })
        .max(20, { message: "Password must be at most 20 characters long" })
        .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
        .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
        .regex(/[0-9]/, { message: 'Password must contain at least one number' })
        .regex(/[@$!%*?&]/, { message: 'Password must contain at least one special character' })
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Confirm password must match new password",
    path: ["confirmPassword"]
});