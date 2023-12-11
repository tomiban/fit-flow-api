import jwt from "jsonwebtoken";
const {JWT_SECRET} = process.env;

//firmar token
const tokenSign = async user => {
    const sign = jwt.sign(
        {
            _id: user._id,
        },
        JWT_SECRET,
        {
            expiresIn: "2h",
        }
    );
    return sign;
};

//verificar si el token firmado es correcto
const verifyToken = async tokenJwt => {
    try {
        return jwt.verify(tokenJwt, JWT_SECRET);
    } catch (error) {
        return null;
    }
};

export {tokenSign, verifyToken};
