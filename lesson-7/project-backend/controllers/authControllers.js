import * as authServices from "../services/authServices.js";

const registerController = async(req, res)=> {
    const {email, username} = await authServices.registerUser(req.body);

    res.status(201).json({
        email,
        username,
    });
}

const loginController = async(req, res)=> {
    const token = await authServices.loginUser(req.body);

    res.json({
        token,
    })
}

export default {
    registerController,
    loginController,
}