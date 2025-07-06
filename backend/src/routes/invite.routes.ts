import express from "express";
import { JwtAuth } from "../middleware/jwtAuth";
import { InviteLink, InvitePage } from "../controllers/invite.controllers";

const router = express.Router();

router.get("/link", JwtAuth, InviteLink);
router.get("/:id", InvitePage)


export default router;