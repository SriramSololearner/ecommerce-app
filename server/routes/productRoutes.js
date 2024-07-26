const express = require("express");
const Auththentication = require("../middleware/auth");
const Authorization = require("../middleware/authrized");
const {
  getAllProducts,
  createNewProduct,
  deleteProduct,
  updateSingleProduct,
} = require("../controllers/productController");
const upload = require("../middleware/multerConfig");
const productRoutes = express.Router();

productRoutes.get("/getProducts", Auththentication, getAllProducts);
productRoutes.post("/createNewProduct", Auththentication, createNewProduct);
productRoutes.delete("/deleteProduct/:id", Auththentication, deleteProduct);
productRoutes.put(
  "/updateProduct/:id",
  Auththentication,
  upload,
  updateSingleProduct
);

module.exports = productRoutes;
