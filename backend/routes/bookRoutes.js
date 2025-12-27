const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const {
  addBook,
  getBooks,
  deleteBook,
  updateBook
} = require("../controllers/bookController");

//  PUBLIC
router.get("/books", getBooks);

//  PROTECTED
router.post("/books", auth, addBook);
router.patch("/books/:id", auth, updateBook);
router.delete("/books/:id", auth, deleteBook);

module.exports = router;
