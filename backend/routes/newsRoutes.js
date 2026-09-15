const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  getAllNews, getNewsById, createNews, updateNews, deleteNews, getMyNews
} = require("../controllers/newsController");

router.get("/", getAllNews);
router.get("/my", protect, getMyNews);
router.get("/:id", getNewsById);
router.post("/", protect, createNews);
router.put("/:id", protect, updateNews);
router.delete("/:id", protect, deleteNews);

module.exports = router;
