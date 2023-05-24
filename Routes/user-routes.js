import express from 'express';
import { emailSigin,signup,phoneNumberSigin } from '../Controllers/user-controller.js';

const userRoutes=express.Router();

userRoutes.post('/signup',signup)
userRoutes.post('/signin-email',emailSigin)
userRoutes.post('/signin-phoneNumber',phoneNumberSigin)
// userRoutes.get('/get-single-category/:id',getSingleCategory)
// userRoutes.get('/get-all-category',getAllCategorys)
// userRoutes.delete('/delete-category/:id',deleteCategory)


export default userRoutes