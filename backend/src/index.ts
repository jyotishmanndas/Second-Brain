import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { contentSchema, signInschema, signUpSchema } from "./zod";
import { prisma } from "./lib/db";
import { JwtAuth } from "./middleware/jwtAuth";
import cors from "cors"

const app = express();

app.use(cors());
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

        const token = jwt.sign({ userId }, process.env.JWT_SECRET as string)
        res.json({
            token
        });

    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({
            msg: "Internal server error"
        });
    };
});

app.post("/signin", async (req: Request, res: Response) => {

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
                const token = jwt.sign({ userId }, process.env.JWT_SECRET as string);
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

app.post("/content", JwtAuth, async (req: Request, res: Response) => {

    const user = await prisma.user.findUnique({
        where: { id: req.userId }
    });

    if (!user) {
        res.status(400).json({ msg: "User not found" });
        return;
    };

    const result = contentSchema.safeParse(req.body);

    if (!result.success) {
        res.status(400).json({ msg: "Invalid input" });
        return;
    };

    try {
        const content = await prisma.content.create({
            data: {
                title: result.data?.title,
                link: result.data?.link,
                tags: result.data?.tags,
                userId: req.userId || ""
            }
        })

        res.status(200).json({ msg: "Post created successfully", content })
    } catch (error) {
        console.error("Error creating room:", error);
        res.status(500).json({ msg: "Internal server error" });
    }
});

app.get("/allContent", JwtAuth, async (req: Request, res: Response) => {

    const user = await prisma.user.findUnique({
        where: { id: req.userId }
    });

    if (!user) {
        res.status(400).json({ msg: "User not found" });
        return;
    };

    const allContents = await prisma.content.findMany({
        where: {
            userId: req.userId
        },
        include: {
            user: {
                select: {
                    name: true
                }
            }
        }
    });

    res.status(200).json({ msg: "All contents", allContents });
    return;
})


app.listen(3000, () => {
    console.log('Server is listening on the port 3000');
});