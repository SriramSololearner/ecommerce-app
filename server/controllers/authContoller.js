const { sign, verify } = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userData = require("../Model/userData");
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userData.findOne({ email });
    if (!user) {
      return res.status(401).send({
        status: false,
        statusCode: 401,
        message: "User not registered!",
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).send({
        status: false,
        statusCode: 401,
        message: "Invalid credentials!",
      });
    }

    const token = sign(
      { email: user.email, role: user.role, id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "12h",
      }
    );
    res.status(200).send({
      status: true,
      statusCode: 200,
      message: "Login successful",
      token,
    });
  } catch (err) {
    res.status(500).send({
      statusCode: 500,
      status: false,
      message: "Internal Server Error" + err.message,
    });
  }
};

const signup = async (req, res) => {
  const { name, email, password, mobile, role } = req.body;
  const data = await userData.find();

  try {
    const existingUser = await userData.findOne({ email });
    if (existingUser) {
      return res.status(409).send({
        status: false,
        statusCode: 409,
        message: "User already exists",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new userData({
      _id: data.length + 1,
      email,
      name,
      password: hashPassword,
      mobile,
      role,
    });

    await newUser.save();
    res.status(201).send({
      statusCode: 201,
      status: true,
      message: "User registered successfully",
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      status: false,
      message: error.message,
    });
  }
};

module.exports = { login, signup };
