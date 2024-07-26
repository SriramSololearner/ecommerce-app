const userData = require("../Model/userData");

const getAllUsers = async (req, res) => {
  try {
    const db = await userData.find({ _id: { $ne: req.user.id } });

    // const db = await userData.find();
    if (db) {
      res.status(200).json({
        statusCode: 200,
        status: true,
        message: "success",
        data: db,
      });
    } else {
      res.status(404).json({
        statusCode: 404,
        status: true,
        message: "success",
        data: null,
      });
    }
  } catch (err) {
    res.status(500).json({
      statusCode: 404,
      status: false,
      message: err.message,
      data: null,
    });
  }
};

const createNewUser = async (req, res) => {
  const data = await userData.find();
  const user = await userData.create({
    _id: data.length + 1,
    name: req.body.name,
    email: req.body.email,
    mobile: req.body.mobile,
    password: req.body.password,
  });
  if (user) {
    // res.send({ status: true, statusCode: 200, user: user });
    res.send({
      statusCode: 200,
      status: true,
      message: "user created successfully",
      data: user,
    });
  } else {
    // res.status(400).json({ message: "user not added" });
    res.send({
      statusCode: 404,
      status: true,
      message: "user not added",
      data: null,
    });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const data = await userData.findById({ _id: id });
  try {
    if (data) {
      res.send({ status: true, statusCode: 200, user: data });
    } else {
      res.send({
        status: false,
        statusCode: 404,
        user: {},
        message: "data not found",
      });
    }
  } catch (error) {
    res.send({
      status: false,
      statusCode: 500,
      user: null,
      message: error.message,
    });
  }
};

const deleteUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await userData.findByIdAndDelete(id);

    if (data) {
      res.status(200).json({
        statusCode: 200,
        status: true,
        message: "User deleted successfully",
      });
    } else {
      res
        .status(404)
        .json({ statusCode: 404, status: false, message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      status: false,
      message: "Internal server error" + error.message,
    });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await userData.findByIdAndUpdate({ _id: id }, req.body);

    if (data) {
      res.status(200).json({
        statusCode: 200,
        status: true,
        message: "User updated successfully",
      });
    } else {
      res
        .status(404)
        .json({ statusCode: 404, status: false, message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      status: false,
      message: "Internal server error" + error.message,
    });
  }
};

module.exports = {
  getAllUsers,
  createNewUser,
  getUserById,
  deleteUserById,
  updateUser,
};
