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

export const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req?.body;
    const [rowsAffected] = await Reviews.update(data, {
      where: {
        id,
        deleted: false,
      },
    });

    if (rowsAffected === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Review not found" });
    }

    const updatedReview = await Reviews.findOne({
      where: {
        id,
        deleted: false,
      },
    });

    res.status(200).json({
      success: true,
      message: "Review updated successfully",
      data: updatedReview,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const [rowsAffected] = await Reviews.update({deleted:true}, {
      where: {
        id,
        deleted: false,
      },
    });

    if (rowsAffected === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Review not found" });
    }

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
      
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getSingleReview = async(req, res) => {
  const {id}=req?.params
  if(!id){
    return res.status(404).json({
      success:false,
      message: "required feilds are not provided"
    })
  }
const review=await Reviews.findOne({
  where:{
    id,
    deleted:false,
  }
})
res.status(200).json({
  success:true,
  message:"Review fetched successfully",
  data:review
})
};

export const getAllReview = (req, res) => {};
