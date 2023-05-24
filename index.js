import express from "express";
import { connectDB } from "./database.js";
import productRoutes from "./Routes/product-routes.js";
import cors from 'cors'
import categoryRoutes from "./Routes/category-routes.js";
const app=express();

connectDB()
app.use(express.json())
app.use(cors({ origin: true, credentials: true }));
app.use('/uploads', express.static('uploads'))

//Routes
app.use('/product',productRoutes)
app.use('/category',categoryRoutes)





app.listen(3000,()=>{
   console.log(`app is listening on port 3000`); 
})
