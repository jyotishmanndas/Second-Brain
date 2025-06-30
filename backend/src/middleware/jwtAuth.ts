import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

export function JwtAuth(req: Request, res: Response, next: NextFunction) {

    const token = req.headers.authorization || "";
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };

        if (decoded.userId) {
            req.userId = decoded.userId;
            next();
        }
    } catch (error) {
        res.status(401).json({ msg: "Permission denied" })
    }
}