const genericServices = (model) => {
	return {
		getAll: async () => {
			try {
				return await model.find();
			} catch (error) {
				throw new Error(error.message);
			}
		},

		getById: async (itemId) => {
			try {
				return await model.findById(itemId);
			} catch (error) {
				if (error.name === "CastError") {
					return null;
				}

				throw new Error(error.message);
			}
		},

		create: async (itemData) => {
			try {
				const newItem = new model(itemData);
				return await newItem.save();
			} catch (error) {
				throw new Error(error.message);
			}
		},

		update: async (itemId, updatedData) => {
			try {
				return await model.findByIdAndUpdate(itemId, updatedData, {
					new: true,
				});
			} catch (error) {
				if (error.name === "CastError") {
					return null;
				}
				throw new Error(error.message);
			}
		},

		remove: async (itemId) => {
			try {
				return await model.findByIdAndDelete(itemId);
			} catch (error) {
				if (error.name === "CastError") {
					return null;
				}
				throw new Error(error.message);
			}
		},
	};
};

export default genericServices;
