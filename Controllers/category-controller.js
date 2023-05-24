import { Category } from "../models/category.js";

export const createCatogory = async (req, res) => {
  try {
    const { name } = req?.body;
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "the required feild are not denfined",
      });
    }
    const category = await Category.create({
      name,
    });
    res.status(201).json({
      success: true,
      message: "the category was successfully created",
      data: category,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "something went wrong",
    });
  }
};

export const updateCategory= async (req, res) => {
  try {
    const { id } = req.params;
    const data = req?.body;
    const [rowsAffected] = await Category.update(data, {
      where: {
        id,
        deleted: false,
      },
    });

    if (rowsAffected === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    const updatedCategory = await Category.findOne({
      where: {
        id,
        deleted: false,
      },
    });

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: updatedCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const [rowsAffected] = await Category.update(
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
        .json({ success: false, message: "Category not found" });
    }

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getSingleCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const check = await Category.findOne({
      where: {
        id,
        deleted: false,
      },
    });
    if (!check) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
    res.status(200).json({
      success: true,
      message: "Category fetched successfully",
      data: check,
    });
  } catch (error) {}
};

export const getAllCategorys = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const offset = (page - 1) * limit;

  const categorys = await Category.findAndCountAll({
    where: {
      deleted: false,
    },
    limit,
    offset,
  });

  res.status(200).json({
    success: true,
    message: "All Categorys fetched successfully",
    data: {
        Categorys: categorys.rows,
      count: categorys.count,
      totalPages: Math.ceil(categorys.count / limit),
      currentPage: page,
    },
  });
};
