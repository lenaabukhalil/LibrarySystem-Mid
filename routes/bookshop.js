const express = require("express");
const router = express.Router();

const BookShop = require("../models/BookShop");

// إضافة مكتبة جديدة
router.post("/", async (req, res) => {
  try {
    const bookShop = new BookShop(req.body);
    await bookShop.save();
    res.status(201).send(bookShop);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// all the bookshop
router.get("/", async (req, res) => {
  try {
    const bookShops = await BookShop.find();
    res.send(bookShops);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// shopID
router.get("/:id", async (req, res) => {
  try {
    const shop = await BookShop.findOne({ shopID: req.params.id });
    if (!shop) return res.status(404).send("BookShop not found");
    res.send(shop);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

//  update
router.put("/:id", async (req, res) => {
  try {
    const shop = await BookShop.findOneAndUpdate(
      { shopID: req.params.id },
      req.body,
      { new: true }
    );
    if (!shop) return res.status(404).send("BookShop not found");
    res.send(shop);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// delete 
router.delete("/:id", async (req, res) => {
  try {
    const result = await BookShop.deleteOne({ shopID: req.params.id });
    if (result.deletedCount === 0)
      return res.status(404).send("BookShop not found");
    res.send({ message: "BookShop has been deleted" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
