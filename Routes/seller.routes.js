const express = require("express");
const { SellerModel } = require("../Models/seller.model");
const { Auth } = require("../Middleware/Auth");

const SellerRouter = express.Router();

SellerRouter.get("/:id", Auth, async (req, res) => {
  const { id } = req.params;

  try {
    const data = await SellerModel.find({ userId: id });
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

SellerRouter.post("/add", Auth, async (req, res) => {
  try {
    const data = SellerModel(req.body);
    await data.save();
    res.status(200).send({ message: "Data Posted" });
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

SellerRouter.patch("/update/:id", Auth, async (req, res) => {
  const { id } = req.params;
  try {
    await SellerModel.findByIdAndUpdate({ _id: id }, req.body);
    res.status(200).send({ message: "Details updated" });
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err });
  }
});

SellerRouter.delete("/delete/:id", Auth, async (req, res) => {
  const { id } = req.params;
  try {
    await SellerModel.findByIdAndDelete({ _id: id });
    res.status(200).send({ message: `data deleted` });
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

module.exports = { SellerRouter };
