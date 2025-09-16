import bcrypt from "bcrypt";
import { nanoid } from "nanoid";

import User from "../db/User.js";

import HttpError from "../helpers/HttpError.js";
import { createToken } from "../helpers/jwt.js";
import sendEmail from "../helpers/sendEmail.js";

const {BASE_URL} = process.env;

const createVerifyEmail = ({verificationCode, email})=> ({
    to: email,
    subject: "Verify email",
    html: `<a href="${BASE_URL}/api/auth/verify/${verificationCode}" target="_blank">Click verify email</a>`
});

export const findUser = query => User.findOne({
    where: query
})

export const registerUser = async payload => {
    const hashPassword = await bcrypt.hash(payload.password, 10);
    const verificationCode = nanoid();
    const newUser = await User.create({...payload, password: hashPassword, verificationCode});

    const verifyEmail = createVerifyEmail({verificationCode, email: payload.email});

    await sendEmail(verifyEmail);
    return newUser;
}

export const resendVerifyUser = async ({email})=> {
    const user = await findUser({email});
    if(!user || user.verify) throw HttpError(401, "User not found or already verified");

    const verifyEmail = createVerifyEmail({verificationCode: user.verificationCode, email});
    await sendEmail(verifyEmail);
}

export const verifyUser = async verificationCode => {
    const user = await findUser({verificationCode});
    if(!user) throw HttpError(401, "User not found or already verifed");

    await user.update({verify: true, verificationCode: null});
}

export const loginUser = async payload => {
    const {email, password} = payload;
    const user = await findUser({email});

    if(!user) {
        throw HttpError(401, "Email or password invalid");
    }

    if(!user.verify) {
        throw HttpError(401, "Email not verified");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare) {
        throw HttpError(401, "Email or password invalid");
    }

    const tokenPayload = {
        id: user.id,
    }

    const token = createToken(tokenPayload);
    await user.update({token});

    return token;
}

export const logoutUser = async user => {
    await user.update({token: null});
    return user;
}