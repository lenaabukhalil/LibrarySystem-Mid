const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

// إضافة كتاب جديد
router.post("/", async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).send(book);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// all the book
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.send(books);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// get bookid
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findOne({ bookid: req.params.id });
    if (!book) return res.status(404).send("Book not found");
    res.send(book);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// update
router.put("/:id", async (req, res) => {
  try {
    const book = await Book.findOneAndUpdate(
      { bookid: req.params.id },
      req.body,
      { new: true }
    );
    if (!book) return res.status(404).send("Book not found");
    res.send(book);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// delete
router.delete("/:id", async (req, res) => {
  try {
    const result = await Book.deleteOne({ bookid: req.params.id });
    if (result.deletedCount === 0)
      return res.status(404).send("Book not found");
    res.send({ message: "Book has been deleted" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
