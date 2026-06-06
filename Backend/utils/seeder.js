
const Fooditem = require("../models/foodItem");
const dotenv = require("dotenv");
const connectDatabase = require("../config/database");

const fooditems = require("../data/foodItem.json");
const { connect } = require("mongoose");
dotenv.config({ path: "backend/config/config.env" });

connectDatabase();

const seedFooditems = async () => {
  try {
    await Fooditem.deleteMany(); 
    console.log("FoodItems are deleted");
    await Fooditem.insertMany(fooditems);
    console.log("All FoodItems are added.");
    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

seedFooditems();
