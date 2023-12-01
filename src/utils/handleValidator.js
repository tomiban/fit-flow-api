import {validationResult} from "express-validator";

export const validateResults = (req, res, next) => {
    try {
        validationResult(req).throw();
        next();
    } catch (error) {
        res.status(403);
        res.send({errors: error.array()});
    }
};

export const isFieldAlreadyInUse = async (fieldName, value, userId, model) => {
    const existingRecord = await model.findOne({[fieldName]: value});
    return existingRecord && existingRecord._id.toString() !== userId;
};
