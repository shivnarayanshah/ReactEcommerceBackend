import express from "express";
import {
  addProduct,
  deleteProduct,
  getAllproducts,
  getSingleProduct,
  updateProduct,
} from "../controllers/productController.js";
import { not_allowed } from "../utils/notAllowed.js";
import { adminCheck, userCheck } from "../middleware/userCheck.js";
import { file_check, update_file_check } from "../middleware/fileCheck.js";

const router = express.Router();

router
  .route("/products")
  .get(getAllproducts)
  .post(userCheck, adminCheck, file_check, addProduct)
  .all(not_allowed);

router
  .route("/product/:id")
  .get(getSingleProduct)
  .patch(userCheck, adminCheck, update_file_check, updateProduct)
  .delete(userCheck, adminCheck, deleteProduct)
  .all(not_allowed);

export default router;
