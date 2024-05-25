const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connection } = require("./database");
const { UserRouter } = require("./Routes/user.routes");
const { SellerRouter } = require("./Routes/seller.routes");
const { BuyerRouter } = require("./Routes/buyers.routes");
dotenv.config();

const server = express();

server.use(express.json());
server.use(cors());

server.use("/user", UserRouter);
server.use("/seller", SellerRouter);
server.use("/buyer", BuyerRouter);

server.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("server connected");
  } catch (error) {
    console.error(error);
  }
});
