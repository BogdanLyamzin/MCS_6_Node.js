import jwt from "jsonwebtoken";

const {JWT_SECRET} = process.env;

export const createTokens = payload => {
    const accessToken = jwt.sign(payload, JWT_SECRET, {expiresIn: "15m"});
    const refreshToken = jwt.sign(payload, JWT_SECRET, {expiresIn: "7d"});
    return {
        accessToken,
        refreshToken,
    }
};

export const verifyToken = token => {
    try {
        const payload = jwt.verify(token, JWT_SECRET);
        return {payload}
    }
    catch(error) {
        return {error}
    }
}