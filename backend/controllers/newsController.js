const News = require("../models/newsModel");

// GET /api/news — all news (public)
const getAllNews = async (req, res) => {
  try {
    const news = await News.find()
      .populate("author", "name avatar")
      .sort({ createdAt: -1 });
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/news/:id — single news (public)
const getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id).populate("author", "name avatar");
    if (!news) return res.status(404).json({ message: "News not found" });
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/news — create (auth required)
const createNews = async (req, res) => {
  try {
    const { title, content, image, category } = req.body;
    const news = await News.create({
      title, content, image, category,
      author: req.user._id,
    });
    const populated = await news.populate("author", "name avatar");
    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/news/:id — update own news (auth required)
const updateNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ message: "News not found" });
    if (news.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }
    const { title, content, image, category } = req.body;
    news.title = title ?? news.title;
    news.content = content ?? news.content;
    news.image = image ?? news.image;
    news.category = category ?? news.category;
    await news.save();
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/news/:id — delete own news (auth required)
const deleteNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ message: "News not found" });
    if (news.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }
    await news.deleteOne();
    res.json({ message: "News deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/news/my — get news by logged in user
const getMyNews = async (req, res) => {
  try {
    const news = await News.find({ author: req.user._id }).sort({ createdAt: -1 });
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllNews, getNewsById, createNews, updateNews, deleteNews, getMyNews };
