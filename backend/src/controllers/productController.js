import Product from "../models/product.js";
import httpStatus from "http-status";
import { productValidationSchema } from "../validation/productValidation.js";

const addProduct = async (req, res) => {
  try {
    // Validate request body
    const { error } = productValidationSchema.validate(req.body);
    if (error) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ error: error.details[0].message });
    }

    // Check if files were uploaded
    if (!req.files || req.files.length === 0) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ error: "At least one image is required." });
    }

    // Extract file paths
    const imagePaths = req.files.map((file) => file.path);

    // Create a new product
    const product = new Product({
      images: imagePaths,
      price: req.body.price,
      productName: req.body.productName,
      description: req.body.description,
      category: req.body.category,
      stockStatus: req.body.stockStatus,
    });

    // Save to database
    const savedProduct = await product.save();

    res
      .status(httpStatus.CREATED)
      .json({ message: "Product added successfully!", product: savedProduct });
  } catch (err) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error", details: err.message });
  }
};

// controller to fetch all products
const fetchProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    console.log("Fetched Products:", products); // Debug log
    res.status(httpStatus.OK).json({
      status: "success",
      message: "Successfully fetched all products",
      data: products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "Failed to fetch products",
    });
  }
};

// controller to fetch a single product
const fetchProduct = async (req, res) => {
  const id = req.params.id;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: httpStatus.NOT_FOUND,
        message: "Product with this id not found",
      });
    }

    return res.status(httpStatus.OK).json({
      status: "success",
      data: product,
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: error.message || "Server error",
    });
  }
};
export { addProduct, fetchProducts, fetchProduct };
