import { Request, Response } from "express";
import { signInschema, signUpSchema } from "../zod";
import { prisma } from "../lib/db";
import { nanoid } from "nanoid";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const userSignup = async (req: Request, res: Response) => {
    const result = signUpSchema.safeParse(req.body);
    if (!result.success) {
        res.status(400).json({ msg: "Invalid input" });
        return;
    };

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email: result.data?.email }
        });

        if (existingUser) {
            res.status(400).json({
                msg: "User already exists with this email"
            });
            return;
        };

        const hashedpassword = await bcrypt.hash(result.data?.password, 12)
        const user = await prisma.user.create({
            data: {
                email: result.data?.email,
                password: hashedpassword,
                name: result.data?.name,
                inviteCode: nanoid(10),
                emailVerified: new Date()
            }
        });

        const userId = user.id;
        const token = jwt.sign({ userId }, process.env.JWT_SECRET as string)
        res.json({
            token
        });
        return;

    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ msg: "Internal server error" });
        return;
    };
};

export const userSignin = async (req: Request, res: Response) => {
    const result = signInschema.safeParse(req.body);
    if (!result.success) {
        res.status(400).json({ msg: "Invalid input" });
        return;
    };

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email: result.data?.email }
        });

        const userId = existingUser?.id;

        if (existingUser) {
            const isPasswordValid = await bcrypt.compare(result.data?.password, existingUser.password);

            if (!isPasswordValid) {
                res.status(400).json({ msg: "Invalid password" });
                return;
            } else {
                const token = jwt.sign({ userId }, process.env.JWT_SECRET as string);
                res.json({
                    token
                });
                return;
            };
        }
        else {
            res.status(400).json({ msg: "User does not exist with this email" });
            return;
        }
    } catch (error) {
        console.error("Error signing in user:", error);
        res.status(500).json({ msg: "Internal server error" });
        return;
    };
};

export const userValidate = async (req: Request, res: Response) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.userId }
        });

        if (!user) {
            res.status(401).json({ valid: false, msg: "Invalid token" });
            return
        } else {
            res.status(200).json({ valid: true });
            return
        }
    } catch (error) {
        console.error("Error during auth validation:", error);
        res.status(500).json({ msg: "Internal server error" });
        return;
    }
};