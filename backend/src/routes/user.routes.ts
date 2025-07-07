import express from "express";
import { userSignin, userSignup, userValidate, getUserProfile, updateUserProfile } from "../controllers/user.controllers";
import { JwtAuth } from "../middleware/jwtAuth";

const router = express.Router();

router.post("/signup", userSignup);
router.post("/signin", userSignin);
router.get("/auth/validate", JwtAuth, userValidate);
router.get("/getprofile", JwtAuth, getUserProfile);
router.patch("/updateprofile", JwtAuth, updateUserProfile);

export default router;