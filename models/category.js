import { DataTypes } from "sequelize";
import { sequelize } from "../database.js";

export const Category=sequelize.define('Category',{
    name:{
        allowNull: false,
        type:DataTypes.STRING
    },
    deleted:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    }
})