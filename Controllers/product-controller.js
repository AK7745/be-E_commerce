import { Product } from "../models/product.js";
import { NUMBER, Op } from "sequelize";

export const createProduct = async (req, res) => {
  try {
    const { name, price, ...rest } = req?.body;
    const image = req?.file?.path;
    if (!name || !price) {
      return res.status(400).json({
        success: false,
        message: "the required feild are not denfined",
      });
    }
    const product = await Product.create({
      name,
      price,
      image,
      ...rest,
    });
    res.status(201).json({
      success: true,
      message: "the product was successfully created",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req?.body;
    const image = req?.file?.path;
    data.image = image;
    const [rowsAffected] = await Product.update(data, {
      where: {
        id,
        deleted: false,
      },
    });

    if (rowsAffected === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const updatedProduct = await Product.findOne({
      where: {
        id,
        deleted: false,
      },
    });

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const [rowsAffected] = await Product.update(
      { deleted: true },
      {
        where: {
          id,
          deleted: false,
        },
      }
    );

    if (rowsAffected === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const check = await Product.findOne({
      where: {
        id,
        deleted: false,
      },
    });
    if (!check) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: check,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const offset = (page - 1) * limit;

    const products = await Product.findAndCountAll({
      where: {
        deleted: false,
      },
      limit,
      offset,
    });

    res.status(200).json({
      success: true,
      message: "All Products fetched successfully",
      data: {
        products: products.rows,
        count: products.count,
        totalPages: Math.ceil(products.count / limit),
        currentPage: page,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
