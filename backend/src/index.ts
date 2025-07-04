import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { contentSchema, signInschema, signUpSchema } from "./zod";
import { prisma } from "./lib/db";
import { JwtAuth } from "./middleware/jwtAuth";
import cors from "cors";
import { nanoid } from 'nanoid'

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/signup", async (req: Request, res: Response) => {

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
});

app.post("/signin", async (req: Request, res: Response) => {

    const result = signInschema.safeParse(req.body);

    if (!result.success) {
        res.status(400).json({
            msg: "Invalid input"
        });
        return;
    };

    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                email: result.data?.email
            }
        });

        const userId = existingUser?.id;

        if (existingUser) {
            const isPasswordValid = await bcrypt.compare(result.data?.password, existingUser.password);

            if (!isPasswordValid) {
                res.status(400).json({
                    msg: "Invalid password"
                });
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
            res.status(400).json({
                msg: "User does not exist with this email"
            });
            return;
        }
    } catch (error) {
        console.error("Error signing in user:", error);
        res.status(500).json({
            msg: "Internal server error"
        });
        return;
    };
});

app.get("/auth/validate", JwtAuth, async (req: Request, res: Response) => {

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

        res.status(200).json({ msg: "Post created successfully", content });
        return;
    } catch (error) {
        console.error("Error creating room:", error);
        res.status(500).json({ msg: "Internal server error" });
        return;
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
});

app.put("/updateContent/:id", JwtAuth, async (req: Request, res: Response) => {
    const user = await prisma.user.findUnique({
        where: { id: req.userId }
    });

    if (!user) {
        res.status(400).json({ msg: "User not found" });
        return;
    };

    const content = await prisma.content.findUnique({
        where: {
            id: req.params.id,
            userId: req.userId
        }
    });

    if (!content) {
        res.status(400).json({ msg: "No such content availaible with this id" })
        return;
    };

    const result = contentSchema.safeParse(req.body);

    if (!result.success) {
        res.status(400).json({ msg: "Invalid input" });
        return;
    };

    try {
        await prisma.content.update({
            where: {
                id: req.params.id,
                userId: req.userId
            },
            data: {
                title: result.data?.title,
                link: result.data?.link,
                tags: result.data?.tags,
            }
        })
        res.status(200).json({ msg: "Content updated successsfully" })
        return;
    } catch (error) {
        console.error("Error updating content:", error);
        res.status(500).json({ msg: "Internal server error" });
        return;
    }
});

app.delete("/deleteContent/:id", JwtAuth, async (req: Request, res: Response) => {

    const user = await prisma.user.findUnique({
        where: { id: req.userId }
    });

    if (!user) {
        res.status(400).json({ msg: "User not found" });
        return;
    };

    try {
        const content = await prisma.content.findUnique({
            where: {
                id: req.params.id,
                userId: req.userId
            }
        });

        if (!content) {
            res.status(400).json({ msg: "No such content availaible with this id" })
            return;
        };

        await prisma.content.delete({
            where: {
                id: req.params.id,
                userId: req.userId
            }
        });
        res.status(200).json({ msg: "Content delete successsfully" })
        return;
    } catch (error) {
        console.error("Error deleting content:", error);
        res.status(500).json({ msg: "Internal server error" });
        return;
    }
});

app.get("/link", JwtAuth, async (req: Request, res: Response) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.userId },
            select: {
                inviteCode: true
            }
        });

        if (!user) {
            res.status(404).json({ msg: "User not found" });
            return;
        }

        res.status(200).json({ msg: "Link retrieved successfully", link: user.inviteCode });
        return;

    } catch (error) {
        console.error("Error fetching user link:", error);
        res.status(500).json({ msg: "Internal server error" });
        return;
    }
});

app.get("/invite/:id", async (req: Request, res: Response) => {

    const link = await prisma.user.findUnique({
        where: {
            inviteCode: req.params.id
        }
    });

    if (!link) {
        res.status(400).json({ msg: "Invalid invite code" })
        return;
    };

    const content = await prisma.content.findMany({
        where: {
            userId: link.id
        },
        include: {
            user: {
                select: {
                    email: true
                }
            }
        }
    });

    res.status(200).json({ content })
});


app.listen(3000, () => {
    console.log('Server is listening on the port 3000');
});