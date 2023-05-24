import express from 'express';
import { createProduct, deleteProduct, getAllProducts, getSingleProduct, updateProduct } from '../Controllers/product-controller.js';
import { upload } from '../Middlewares/multer.js';

const productRoutes=express.Router();

productRoutes.post('/create-product',upload.single('image'),createProduct)
productRoutes.put('/update-product/:id',upload.single('image'),updateProduct)
productRoutes.get('/get-single-product/:id',getSingleProduct)
productRoutes.get('/get-all-product',getAllProducts)
productRoutes.delete('/delete-product/:id',deleteProduct)


export default productRoutes