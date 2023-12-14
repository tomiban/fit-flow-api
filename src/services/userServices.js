import User from "../models/users.js";
const userServices = {
    getAll: async () => {
        try {
            return await User.find();
        } catch (error) {
            throw new Error(error.message);
        }
    },

    getById: async itemId => {
        try {
            return await User.findById(itemId);
        } catch (error) {
            if (error.name === "CastError") {
                return null;
            }

            throw new Error(error.message);
        }
    },

    getByUsername: async username => {
        try {
            return await User.findOne(username).select("+password");
        } catch (error) {
            if (error.name === "CastError") {
                return null;
            }

            throw new Error(error.message);
        }
    },

    create: async itemData => {
        try {
            const newItem = new User(itemData);
            return await newItem.save();
        } catch (error) {
            throw new Error(error.message);
        }
    },

    update: async (itemId, updatedData) => {
        try {
            return await User.findByIdAndUpdate(itemId, updatedData, {
                new: true,
                runValidators: true,
            });
        } catch (error) {
            if (error.name === "CastError") {
                return null;
            }
            throw new Error(error.message);
        }
    },

    remove: async itemId => {
        try {
            return await User.delete({_id: itemId});
        } catch (error) {
            if (error.name === "CastError") {
                return null;
            }
            throw new Error(error.message);
        }
    },
};

export default userServices;
