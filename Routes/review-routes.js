import express from 'express';
import { createReview, deleteReview, getAllReview, getSingleReview, updateReview } from '../Controllers/review-controller.js';

const reviewRoutes=express.Router();

reviewRoutes.post('/create-review',createReview)
reviewRoutes.put('/update-review/:id',updateReview)
reviewRoutes.get('/get-single-review/:id',getSingleReview)
reviewRoutes.get('/get-all-reviews',getAllReview)
reviewRoutes.delete('/delete-review/:id',deleteReview)


export default reviewRoutes