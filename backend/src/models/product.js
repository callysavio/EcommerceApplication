// models/Product.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    images: {
      type: [String], 
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
        },
     productName: {
      type: String,
      required: true,
      minlength: 10,
    },
    description: {
      type: String,
      required: true,
      minlength: 10,
    },
    stockStatus: {
      type: Number, // Stores the number of available products
      required: true,
      min: 0, // Prevent negative stock
    },

    category: {
      type: String,
      enum: [
        "Electronics",
        "Fashion",
        "Beauty and Personal Care",
        "Home and Kitchen",
        "Health and Fitness",
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", productSchema);
