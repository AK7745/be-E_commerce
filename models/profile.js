import { DataTypes } from "sequelize";
import { sequelize } from "../database";

export const Profile= sequelize.define('Profile',{
    name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    deleted:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
      }
    
}) 