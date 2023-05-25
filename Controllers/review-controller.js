import { Reviews } from "../models/reviews.js";

export const createReview = async (req, res) => {
 try{
    const { description , productId} = req.body;
    if (!description) {
      return res.status(400).json({
        success: false,
        message: "the required feild are not denfined",
      });
    }
  const review=await Reviews.create({
      description,
      productId
  })
  
  res.status(201).json({
      success: true,
      message: "the category was successfully created",
      data: review,
    });
 }
 catch (error) {
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
}
};

export const updateReview = (req, res) => {};

export const deleteReview = (req, res) => {};

export const getSingleReview = (req, res) => {};

export const getAllReview = (req, res) => {};
