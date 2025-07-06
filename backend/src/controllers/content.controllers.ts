import { Request, Response } from "express";
import { prisma } from "../lib/db";
import { contentSchema } from "../zod";

export const ContentPost = async (req: Request, res: Response) => {
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
};

export const AllContent = async (req: Request, res: Response) => {
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
};

export const UpdateContent = async (req: Request, res: Response) => {
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
};

export const DeleteContent = async (req: Request, res: Response) => {
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
};