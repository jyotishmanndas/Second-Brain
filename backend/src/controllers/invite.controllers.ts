import { Request, Response } from "express";
import { prisma } from "../lib/db";

export const InviteLink = async (req: Request, res: Response) => {
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
        };
        res.status(200).json({ msg: "Link retrieved successfully", link: user.inviteCode });
        return;

    } catch (error) {
        console.error("Error fetching user link:", error);
        res.status(500).json({ msg: "Internal server error" });
        return;
    }
};

export const InvitePage = async (req: Request, res: Response) => {
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
    res.status(200).json({ content });
    return;
};
