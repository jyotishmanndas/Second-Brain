"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentSchema = exports.signInschema = exports.signUpSchema = void 0;
const zod_1 = require("zod");
exports.signUpSchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: "Invalid email format" }),
    name: zod_1.z.string().min(2, { message: "Name must be at least 2 characters long" }),
    password: zod_1.z.string()
        .min(8, { message: 'Password must be at least 8 characters long' })
        .max(20, { message: "Password must be at most 20 characters long" })
        .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
        .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
        .regex(/[0-9]/, { message: 'Password must contain at least one number' })
        .regex(/[@$!%*?&]/, { message: 'Password must contain at least one special character' }),
});
exports.signInschema = zod_1.z.object({
    email: zod_1.z.string().email({ message: "Invalid email format" }),
    password: zod_1.z.string()
        .min(6, { message: 'Password must be at least 6 characters long' })
        .max(20, { message: "Password must be at most 20 characters long" })
        .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
        .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
        .regex(/[0-9]/, { message: 'Password must contain at least one number' })
        .regex(/[@$!%*?&]/, { message: 'Password must contain at least one special character' }),
});
exports.contentSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, { message: "Title is required" }),
    link: zod_1.z.string().url().min(1, { message: "Invalid url" }),
    tags: zod_1.z.array(zod_1.z.string()).min(1, { message: "Atleat one tag is required" })
});
