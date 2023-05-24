import {DataTypes } from 'sequelize';
import { sequelize } from '../database.js';


const Product = sequelize.define('Product', {
  name: {
    type:DataTypes.STRING,
    allowNull:false
  },
  image: {
    type:DataTypes.STRING,
    allowNull:true
  },
  price: {
    type:DataTypes.STRING,
    allowNull:false
  },
  description:{
    type:DataTypes.TEXT('medium'),
    allowNull:true
  },
  categoryId:{
    type:DataTypes.INTEGER,
    allowNull:true
  },
  deleted:{
    type:DataTypes.BOOLEAN,
    defaultValue:false
  }
   
});

export {Product}
