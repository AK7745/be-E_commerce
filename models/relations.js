import { Category } from "./category.js"
import { Product } from "./product.js"

export const relations=()=>{
    Category.hasMany(Product,{foreignKey: "categoryId"})
    Product.belongsTo(Category,{foreignKey: "categoryId"})
}