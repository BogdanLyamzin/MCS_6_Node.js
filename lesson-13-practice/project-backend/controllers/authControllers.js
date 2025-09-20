import * as authServices from "../services/authServices.js";

const registerController = async(req, res)=> {
    const {email, username} = await authServices.registerUser(req.body);

    res.status(201).json({
        email,
        username,
    });
}

const resendVerifyController = async(req, res)=> {
    await authServices.resendVerifyUser(req.body);

    res.json({
        message: "Verify email resend successfully"
    })
}

const verifyController = async(req, res)=> {
    const {verificationCode} = req.params;
    await authServices.verifyUser(verificationCode);

    res.json({
        message: "User successfully verified"
    });
}

const loginController = async(req, res)=> {
    const {accessToken, refreshToken} = await authServices.loginUser(req.body);

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
    });

    res.json({
        message: "Successfully login"
    })
}

const refreshController = async(req, res)=> {
    const {accessToken, refreshToken} = await authServices.refreshUser(req.cookies);

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
    });

    res.json({
        message: "Successfully refresh"
    })
}

const getCurrentController = async(req, res)=> {
    const {email, username} = req.user;

    res.json({
        email,
        username,
    })
}

const logoutController = async(req, res)=> {
    await authServices.logoutUser(req.user);

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    res.json({
        message: "Logout successfully"
    })
}

export default {
    registerController,
    resendVerifyController,
    verifyController,
    loginController,
    refreshController,
    getCurrentController,
    logoutController,
}