import { Category } from "./category.js"
import { Product } from "./product.js"
import { Reviews } from "./reviews.js"

export const relations=()=>{
    Category.hasMany(Product,{foreignKey: "categoryId"})
    Product.belongsTo(Category,{foreignKey: "categoryId"})

    Product.hasMany(Reviews,{foreignKey:"productId"})
    Reviews.belongsTo(Product,{foreignKey:"productId"})


}