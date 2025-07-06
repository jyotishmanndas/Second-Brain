import express from "express";
import { JwtAuth } from "../middleware/jwtAuth";
import { AllContent, ContentPost, DeleteContent, UpdateContent } from "../controllers/content.controllers";

const router = express.Router();

router.post("/", JwtAuth, ContentPost);
router.get("/allContent", JwtAuth, AllContent);
router.put("/updateContent/:id", JwtAuth, UpdateContent);
router.delete("/deleteContent/:id", JwtAuth, DeleteContent);


export default router;