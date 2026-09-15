const User = require("../models/userModel");

// GET /api/user/profile — get logged-in user profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/user/profile — update profile
const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { name, avatar, bio } = req.body;
    user.name = name ?? user.name;
    user.avatar = avatar ?? user.avatar;
    user.bio = bio ?? user.bio;

    // Update password if provided
    if (req.body.password) {
      user.password = req.body.password; // will be hashed by pre-save hook
    }

    await user.save();
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      bio: user.bio,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getProfile, updateProfile };
