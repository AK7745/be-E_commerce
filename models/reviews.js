import { DataTypes } from "sequelize";
import { sequelize } from "../database";

export const Reviews=sequelize.define('Reviews',{
    description:{
        type:DataTypes.TEXT("medium")
    },
    productId:{
        type:DataTypes.INTEGER,
        allowNull:true
    }
})