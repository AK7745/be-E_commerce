import express from 'express';
import { signup } from '../Controllers/user-controller.js';

const userRoutes=express.Router();

userRoutes.post('/signup',signup)
// userRoutes.put('/update-category/:id',updateCategory)
// userRoutes.get('/get-single-category/:id',getSingleCategory)
// userRoutes.get('/get-all-category',getAllCategorys)
// userRoutes.delete('/delete-category/:id',deleteCategory)


export default userRoutes