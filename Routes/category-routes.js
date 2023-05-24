import express from 'express';
import { createCatogory, deleteCategory, getAllCategorys, getSingleCategory, updateCategory } from '../Controllers/category-controller.js';

const categoryRoutes=express.Router();

categoryRoutes.post('/create-category',createCatogory)
categoryRoutes.put('/update-category/:id',updateCategory)
categoryRoutes.get('/get-single-category/:id',getSingleCategory)
categoryRoutes.get('/get-all-category',getAllCategorys)
categoryRoutes.delete('/delete-category/:id',deleteCategory)


export default categoryRoutes