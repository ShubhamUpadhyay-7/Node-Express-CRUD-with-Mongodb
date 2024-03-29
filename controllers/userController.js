const { ObjectId } = require("mongodb");
const user = require("../models/user");

async function getAllUsers(req, res) {
  try {
    const users = await user.findAll();
    console.log(users);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getUserById(req, res) {
  try {
    const id = req.params.id;
    const user1 = await user.findById(id);
    if (!user1) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json(user1);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function createUser(req, res) {
  try {
    const newUser = req.body;
    newUser._id = new ObjectId();
    await user.create(newUser);
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateUser(req, res) {
  try {
    const id = req.params.id;
    const updatedFields = req.body;
    await user.update(id, updatedFields);
    res.json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteUser(req, res) {
  try {
    const id = req.params.id;
    await user.del(id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
