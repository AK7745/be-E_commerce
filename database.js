import Sequelize from'sequelize';
export const sequelize = new Sequelize('ecommerce', "root", "root", {
  host: "localhost",
  dialect:  "mysql", 
  
  
});

export const connectDB = async ()=>{
  try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}}

// sequelize.sync({alter:true})
//   .then(() => {
//     console.log('Tables synced successfully');
//   })
//   .catch((error) => {
//     console.error('Error syncing tables: ', error);
//   });

