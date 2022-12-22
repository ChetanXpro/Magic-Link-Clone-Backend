const User = require("../Models/user");

const countUser = async (req, res) => {
  try {
    const user = await User.length;

    if (!user) res.status(400).json({ message: "No user found" });

    res.status(200).json({
      success: true,
      userCount: user,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = countUser;
