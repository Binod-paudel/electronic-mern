import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/user.model.js";
import Product from "./models/product.model.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import colors from "colors";

dotenv.config();
connectDB();

async function importData() {
  try {
    await User.deleteMany();
    await Product.deleteMany();

    let newusers = await User.insertMany(users);
    await Product.insertMany(
      products.map((products) => {
        return {
          ...products,
          user: newusers[0]._id,
        };
      })
    );
    console.log("Data loaded!".green.inverse);
    process.exit();
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
}

async function destroyData() {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    console.log("Data.cleared".red.inverse);
    process.exit();
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
}

if(process.argv[2]=="-d"){
  destroyData()
}else{
  importData();
}
