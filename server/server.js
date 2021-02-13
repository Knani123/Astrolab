const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

////connect to database
const connectDB = require("./helpers/connectDB");
connectDB();
//body parser Middleware
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(__dirname + "/uploads"));
//register
app.use("/register", require("./routes/register"));
//login
app.use("/login", require("./routes/login"));
//wish
app.use("/wish", require("./routes/wish"));
//product
app.use("/product", require("./routes/product"));
//images
app.use("/img", require("./routes/upload"));

const Port = process.env.PORT || 8000;
app.listen(Port, (err) => {
  if (err) {
    throw err.message;
  } else {
    console.log(`Server is running on port ${Port}`);
  }
});
