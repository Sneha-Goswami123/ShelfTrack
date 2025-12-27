const Book = require("../models/Book");

// POST /api/books
const addBook = async (req, res) => {
  try {
    // bulk insert
    if (Array.isArray(req.body)) {
      const books = await Book.insertMany(req.body);
      return res.status(201).json(books);
    }

    // single insert
    const { title, author, price } = req.body;

    if (!title || !author || !price) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const book = await Book.create({ title, author, price });
    res.status(201).json(book);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// GET /api/books
const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching books",
      error: error.message
    });
  }
};

// DELETE /api/books/:id
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PATCH /api/books/:id
const updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  addBook,
  getBooks,
  deleteBook,
  updateBook
};
