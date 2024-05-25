const express = require("express");
const { Auth } = require("../Middleware/Auth");
const { SellerModel } = require("../Models/seller.model");

const BuyerRouter = express.Router();

BuyerRouter.get("/", Auth, async (req, res) => {
  const { bedroom, bathroom } = req.query;

  try {
    if (bathroom && bedroom) {
      const data = await SellerModel.find({ bedroom, bathroom });
      res.status(200).send({ data });
    } else if (bedroom) {
      const data = await SellerModel.find({ bedroom });
      res.status(200).send({ data });
    } else if (bathroom) {
      const data = await SellerModel.find({ bathroom });
      res.status(200).send({ data });
    } else {
      const data = await SellerModel.find();
      res.status(200).send({ data });
    }
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

module.exports = { BuyerRouter };
