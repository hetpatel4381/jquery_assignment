const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const config = require("../../config/database");

const register = async (req, res) => {
  const { email, password, type } = req.body;

  // Check if the type is valid ("manager" or "visitor")
  if (!["manager", "visitor"].includes(type)) {
    return res.json({ success: false, msg: "Invalid user type." });
  }

  try {
    const newUser = new User({
      email,
      password,
      type,
    });

    //encrypting the password before storing it into DB.
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newUser.password, salt); 
    newUser.password = hash;

    const user = await newUser.save();

    res.json({ success: true, msg: "User registered successfully." });
  } catch (err) {
    console.error(err);
    res.json({ success: false, msg: "User registration failed." });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    //finding if the entered email is present in DB.
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ success: false, msg: "User not found." });
    }

    //comparing the entered password and decrypted password from DB.
    const isMatch = await bcrypt.compare(password, user.password); 

    if (isMatch) {
      const token = jwt.sign(user.toJSON(), config.secret, {
        expiresIn: 604800, 
      });

      res.json({
        success: true,
        token: "Bearer " + token,
        user: {
          id: user._id,
          email: user.email,
          type: user.type, 
        },
      });
    } else {
      return res.json({ success: false, msg: "Wrong password." });
    }
  } catch (err) {
    console.log(err);
    res.json({ success: false, msg: "Login failed." });
  }
};

module.exports = {
  register,
  login,
};
