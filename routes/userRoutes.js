import express from "express";
import {
  getUserProfile,
  loginUser,
  registerUser,
  updateUserProfile,
} from "../controllers/userController.js";
import { not_allowed } from "../utils/notAllowed.js";
import {
  joiValidator,
  loginSchema,
  registerSchema,
} from "../utils/validators.js";
import { userCheck } from "../middleware/userCheck.js";

const router = express.Router();

router
  .route("/login")
  .post(joiValidator.body(loginSchema), loginUser)
  .all(not_allowed);
router
  .route("/register")
  .post(joiValidator.body(registerSchema), registerUser)
  .all(not_allowed);

router
  .route("/profile")
  .get(userCheck, getUserProfile)
  .patch(userCheck, updateUserProfile)
  .all(not_allowed);

export default router;
