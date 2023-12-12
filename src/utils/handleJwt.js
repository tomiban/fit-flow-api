import jwt from "jsonwebtoken";
const {JWT_SECRET} = process.env;

//firmar token
const tokenSign = async user => {
    try {
        const sign = jwt.sign(
            {
                _id: user._id, //payload
            },
            JWT_SECRET, //llave para firmar el contenido
            {
                expiresIn: "2h",
            }
        );
        return sign;
    } catch (error) {
        console.log(error.message);
    }
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
