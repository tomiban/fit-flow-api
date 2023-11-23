import User from "../models/users.js";

const userService = {
  getAllUsers: async () => {
    try {
      return await User.find();
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getUserById: async (userId) => {
    try {
      return await User.findById(userId);
    } catch (error) {
      throw new Error(error.message);
    }
  },

  createUser: async (userData) => {
    try {
      const newUser = new User(userData);
      return await newUser.save();
    } catch (error) {
      throw new Error(error.message);
    }
  },

  updateUser: async (userId, updatedData) => {
    try {
      return await User.findByIdAndUpdate(userId, updatedData, { new: true });
    } catch (error) {
      throw new Error(error.message);
    }
  },

  deleteUser: async (userId) => {
    try {
      return await User.findByIdAndDelete(userId);
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

export default userService;
