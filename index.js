require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const { PositionsModel } = require("./models/PositionModel");
const { HoldingsModel } = require("./models/HoldingsModel");
const OrdersModel = require("./models/OrdersModel");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/AuthRoute");

const PORT = process.env.PORT || 3002;
const url = process.env.MONGO_URL;
const app = express();

app.use(cors({
  origin:[
    "https://stock-verse-dashboard-o27amn266-ganesh-patil005s-projects.vercel.app/",
    "http://localhost:5174"
  ],  // Your React app’s URL
  credentials: true,                 // Allow cookies to be sent
}));

app.use(bodyParser.json());
app.use(cookieParser());

// app.get("/addPositions", async (req, res) => {
//   let tempPositions = [
//     {
//       product: "CNC",
//       name: "EVEREADY",
//       qty: 2,
//       avg: 316.27,
//       price: 312.35,
//       net: "+0.58%",
//       day: "-1.24%",
//       isLoss: true,
//     },
//     {
//       product: "CNC",
//       name: "JUBLFOOD",
//       qty: 1,
//       avg: 3124.75,
//       price: 3082.65,
//       net: "+10.04%",
//       day: "-1.35%",
//       isLoss: true,
//     },
//   ];
//   const hey = [];
//   tempPositions.forEach(async(item) => {
//     let newPosition = new PositionsModel({
//       product: item.product,
//       name: item.name,
//       qty: item.qty,
//       avg: item.avg,
//       price: item.price,
//       net: item.net,
//       day: item.day,
//       isLoss: item.isLoss,
//     });

//    let data = await newPosition.save();
//    hey.push(data);
//   });
//   console.log(hey);
//   res.send("Done!");
// });

app.use("/", authRoute);

app.get("/allHoldings", async (req, res) => {
  let allHoldings = await HoldingsModel.find({});
  res.json(allHoldings);
});

app.get("/allPositions", async (req, res) => {
  let allPostions = await PositionsModel.find({});
  res.json(allPostions);
});

app.post("/newOrder", async (req, res) => {
 
  let newOrder = new OrdersModel({
    name: req.body.name,
    qty: req.body.qty,
    price: req.body.price,
    mode: req.body.mode,
  });

  await newOrder.save();
 
  res.send("Order saved!");
});

app.listen(PORT, () => {
  console.log("app started");
  mongoose.connect(url);
  console.log("DB Connected");
});
