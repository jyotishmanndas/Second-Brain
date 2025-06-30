import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { signInschema, signUpSchema } from "./zod";
import { prisma } from "./lib/db";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/signup", async (req: Request, res: Response) => {

    const result = signUpSchema.safeParse(req.body);

    if (!result.success) {
        res.status(400).json({
            msg: "Invalid input"
        })
    };

    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                email: result.data?.email
            }
        });

        if (existingUser) {
            res.status(400).json({
                msg: "User already exists with this email"
            });
        };

        const hashedpassword = await bcrypt.hash(result.data?.password || "", 12)

        const user = await prisma.user.create({
            data: {
                email: result.data?.email || "",
                password: hashedpassword,
                name: result.data?.name || "",
                emailVerified: new Date()
            }
        });

        const userId = user.id;

        const token = jwt.sign({ userId }, process.env.JWT_SECRET!)
        res.json({
            token
        })

    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({
            msg: "Internal server error"
        });
    };
});

app.post("/signin", async (req, res) => {

    const result = signInschema.safeParse(req.body);

    if (!result.success) {
        res.status(400).json({
            msg: "Invalid input"
        });
    };

    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                email: result.data?.email
            }
        });

        const userId = existingUser?.id;

        if (existingUser) {
            const isPasswordValid = await bcrypt.compare(result.data?.password || "", existingUser.password);

            if (!isPasswordValid) {
                res.status(400).json({
                    msg: "Invalid password"
                });
            } else {
                const token = jwt.sign({ userId }, process.env.JWT_SECRET!);
                res.json({
                    token
                });
            };
        }
        else {
            res.status(400).json({
                msg: "User does not exist with this email"
            });
        }
    } catch (error) {
        console.error("Error signing in user:", error);
        res.status(500).json({
            msg: "Internal server error"
        });
    };
});

app.listen(3000, () => {
    console.log('Server is listening on the port 3000');
});