const jwt = require("jsonwebtoken");
const User = require("../models/User");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1d" });
};

//login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    // Create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token, user_id: user.user_id });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

//signup a user
const signupUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.signup(username, email, password);
    // Create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token, user_id: user.user_id });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = { signupUser, loginUser };
