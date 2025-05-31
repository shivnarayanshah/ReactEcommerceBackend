import express from "express";
import { not_allowed } from "../utils/notAllowed.js";
import { userCheck } from "../middleware/userCheck.js";
import {
  createOrder,
  getOrderDetail,
  getOrders,
} from "../controllers/orderController.js";

const router = express.Router();

router
  .route("/")
  .get(userCheck, getOrders)
  .post(userCheck, createOrder)
  .all(not_allowed);
router.route("/:id").get(userCheck, getOrderDetail).all(not_allowed);

export default router;
