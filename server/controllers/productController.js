const product = require("../Model/product");
const cloudinaryConfig = require("../config/cloudinaryConfig");
const upload = require("../middleware/multerConfig");
const path = require("path");
const cloudinary = require("cloudinary").v2;

cloudinary.config(cloudinaryConfig);
// const getAllProducts = async (req, res) => {
//   try {
//     const data = await product.find();
//     if (data) {
//       res.send({
//         statusCode: 200,
//         status: true,
//         message: "Success",
//         products: data,
//       });
//     } else {
//       res.send({
//         statusCode: 404,
//         status: true,
//         message: "Success",
//         error: "Data Not Found",
//         products: null,
//       });
//     }
//   } catch (error) {
//     res.send({
//       statusCode: 500,
//       status: false,
//       message: "Internal server error",
//       error: error.message,
//       products: null,
//     });
//   }
// };
const getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    const totalProducts = await product.countDocuments();
    const totalPages = Math.ceil(totalProducts / pageSize);

    const data = await product
      .find()
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    if (data.length > 0) {
      res.send({
        statusCode: 200,
        status: true,
        message: "Success",
        currentPage: page,
        pageSize: pageSize,
        totalPages: totalPages,
        totalProducts: totalProducts,
        products: data,
      });
    } else {
      res.send({
        statusCode: 404,
        status: false,
        message: "Data Not Found",
        error: "No products found for the given page",
        products: null,
      });
    }
  } catch (error) {
    res.send({
      statusCode: 500,
      status: false,
      message: "Internal server error",
      error: error.message,
      products: null,
    });
  }
};

const createNewProduct = async (req, res) => {
  try {
    const { body, file } = req;
    if (!file) {
      return res.status(400).json({
        statusCode: 400,
        status: false,
        message: "No file uploaded",
      });
    }

    // Upload image to Cloudinary
    const uploadImage = await cloudinary.uploader.upload(file.path, {
      folder: "product-images", // Optional - folder to store the file in Cloudinary
      resource_type: "auto", // Automatically detect the file type (image/video)
    });

    const newProduct = new product({
      ...body,
      imageUrl: uploadImage.secure_url,
    });
    const result = await newProduct.save();
    if (result) {
      res.send({
        statusCode: 200,
        status: true,
        message: "Product created successfully",
        data: result,
      });
    } else {
      res.send({
        statusCode: 404,
        status: true,
        message: "Product not added",
        data: null,
      });
    }
  } catch (error) {
    res.send({
      statusCode: 500,
      status: false,
      message: "Internal server Error",
      error: error.message,
      data: null,
    });
  }
};
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await product.findByIdAndDelete(id);

    if (data) {
      res.send({
        statusCode: 200,
        status: true,
        message: "Product deleted successfully",
      });
    } else {
      res.send({
        statusCode: 404,
        status: false,
        message: "Product not found",
      });
    }
  } catch (error) {
    console.error(error);
    res.send({
      statusCode: 500,
      status: false,
      message: "Internal server error" + error.message,
    });
  }
};
// const updateSingleProduct = async (req, res) => {
//     const { id } = req.params;

//     try {
//       let updateFields = { ...req.body };

//       // Check if there's a file (image) in the request
//       if (req.file) {
//         updateFields.image = req.file.path; // Assuming you store the file path
//       }

//       const updatedProduct = await product.findByIdAndUpdate(id, updateFields, { new: true });

//       if (updatedProduct) {
//         res.status(200).json({
//           statusCode: 200,
//           status: true,
//           message: "Product updated successfully",
//           product: updatedProduct
//         });
//       } else {
//         res.status(404).json({
//           statusCode: 404,
//           status: false,
//           message: "No Product Found",
//         });
//       }
//     } catch (err) {
//       res.status(500).json({
//         statusCode: 500,
//         status: false,
//         message: "Internal Server Error",
//         error: err.message,
//       });
//     }
//   }
const updateSingleProduct = async (req, res) => {
  const { id } = req.params;

  try {
    let updatedProduct = await product.findById({ _id: id });
    if (!updatedProduct) {
      return res.status(404).json({
        statusCode: 404,
        status: false,
        message: "No Product Found",
      });
    }

    updatedProduct.name = req.body.name || updatedProduct.name;
    updatedProduct.description =
      req.body.description || updatedProduct.description;
    updatedProduct.price = req.body.price || updatedProduct.price;

    if (req.file) {
      // Upload image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "product-images",
        resource_type: "auto",
      });

      // Update product's image URL with the new Cloudinary URL
      updatedProduct.imageUrl = result.secure_url;
      console.log("result", result);
    }
    updatedProduct = await updatedProduct.save();

    res.status(200).json({
      statusCode: 200,
      status: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({
      statusCode: 500,
      status: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

module.exports = {
  getAllProducts,
  createNewProduct,
  deleteProduct,
  updateSingleProduct,
};
