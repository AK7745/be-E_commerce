import { DataTypes } from "sequelize";
import { sequelize } from "../database.js";

export const Reviews=sequelize.define('Reviews',{
    description:{
        type:DataTypes.TEXT("medium"),
        allowNull:false
    },
    productId:{
        type:DataTypes.INTEGER,
        allowNull:true
    }
})